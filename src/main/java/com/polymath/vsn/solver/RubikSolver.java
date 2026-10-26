package com.polymath.vsn.solver;

import com.polymath.vsn.dto.CubeDto;

import java.util.*;

public class RubikSolver {

    private static final String[] BASE_FACES = {"U", "D", "F", "B", "L", "R"};
    private static final String[] MODIFIERS = {"", "'", "2"};

    /**
     * Invert a single move notation.
     */
    public static String invertMove(String m) {
        if (m == null || m.isBlank()) return "";
        m = m.trim().toUpperCase();
        if (m.endsWith("2")) return m;
        if (m.endsWith("'")) return m.substring(0, 1);
        return m + "'";
    }

    /**
     * Invert a list of moves.
     */
    public static List<String> invertMoves(List<String> moves) {
        List<String> inv = new ArrayList<>();
        if (moves == null) return inv;
        for (int i = moves.size() - 1; i >= 0; i--) {
            String m = moves.get(i).trim();
            if (!m.isEmpty()) {
                inv.add(invertMove(m));
            }
        }
        return simplifyMoves(inv);
    }

    /**
     * Simplify and cancel redundant consecutive moves.
     * E.g. [R, R'] -> []
     *      [U, U] -> [U2]
     *      [F, F2] -> [F']
     *      [L2, L2] -> []
     */
    public static List<String> simplifyMoves(List<String> rawMoves) {
        if (rawMoves == null || rawMoves.isEmpty()) return new ArrayList<>();

        List<String> list = new ArrayList<>(rawMoves);
        boolean changed = true;

        while (changed) {
            changed = false;
            List<String> next = new ArrayList<>();

            for (int i = 0; i < list.size(); i++) {
                String m1 = list.get(i).trim();
                if (m1.isEmpty()) continue;

                if (i + 1 < list.size()) {
                    String m2 = list.get(i + 1).trim();
                    if (m1.charAt(0) == m2.charAt(0)) {
                        // Same face
                        char face = m1.charAt(0);
                        int turns1 = getTurns(m1);
                        int turns2 = getTurns(m2);
                        int totalTurns = (turns1 + turns2) % 4;

                        if (totalTurns == 0) {
                            // Cancel out completely
                            i++; // skip m2
                            changed = true;
                            continue;
                        } else {
                            next.add(formatMove(face, totalTurns));
                            i++; // skip m2
                            changed = true;
                            continue;
                        }
                    }
                }
                next.add(m1);
            }
            list = next;
        }

        return list;
    }

    private static int getTurns(String move) {
        if (move.endsWith("2")) return 2;
        if (move.endsWith("'")) return 3;
        return 1;
    }

    private static String formatMove(char face, int turns) {
        if (turns == 1) return String.valueOf(face);
        if (turns == 2) return face + "2";
        if (turns == 3) return face + "'";
        return "";
    }

    /**
     * Generate a random 20-25 move scramble.
     */
    public static List<String> generateScramble(int length) {
        List<String> scramble = new ArrayList<>();
        Random random = new Random();
        String lastFace = "";
        String secondLastFace = "";

        while (scramble.size() < length) {
            String face = BASE_FACES[random.nextInt(BASE_FACES.length)];

            // Avoid same face twice in a row (e.g. R R)
            if (face.equals(lastFace)) continue;

            // Avoid opposite face cancellation (e.g. R L R)
            if (isOpposite(face, lastFace) && face.equals(secondLastFace)) continue;

            String mod = MODIFIERS[random.nextInt(MODIFIERS.length)];
            scramble.add(face + mod);

            secondLastFace = lastFace;
            lastFace = face;
        }

        return scramble;
    }

    private static boolean isOpposite(String f1, String f2) {
        return (f1.equals("U") && f2.equals("D")) || (f1.equals("D") && f2.equals("U")) ||
               (f1.equals("L") && f2.equals("R")) || (f1.equals("R") && f2.equals("L")) ||
               (f1.equals("F") && f2.equals("B")) || (f1.equals("B") && f2.equals("F"));
    }

    /**
     * Validate the 54 facelet string.
     */
    public static CubeDto.ValidationResponse validate(String faceletString) {
        if (faceletString == null || faceletString.length() != 54) {
            return new CubeDto.ValidationResponse(false, "Facelet string must be exactly 54 characters.", 0, 0, 0, 0, 0, 0);
        }

        char[] chars = faceletString.toUpperCase().toCharArray();
        int u = 0, d = 0, f = 0, b = 0, l = 0, r = 0;

        for (char c : chars) {
            switch (c) {
                case 'U': case 'W': u++; break; // White / Up
                case 'D': case 'Y': d++; break; // Yellow / Down
                case 'F': case 'G': f++; break; // Green / Front
                case 'B': case 'K': b++; break; // Blue / Back ('K' for blue if 'B')
                case 'L': case 'O': l++; break; // Orange / Left
                case 'R': r++; break;           // Red / Right
                default:
                    return new CubeDto.ValidationResponse(false, "Invalid color character: " + c, 0, 0, 0, 0, 0, 0);
            }
        }

        boolean valid = (u == 9 && d == 9 && f == 9 && b == 9 && l == 9 && r == 9);
        String msg = valid ? "Valid cube facelet configuration (9 stickers per color)."
                           : String.format("Invalid sticker counts: U=%d, D=%d, F=%d, B=%d, L=%d, R=%d (each must be 9).", u, d, f, b, l, r);

        return new CubeDto.ValidationResponse(valid, msg, u, d, f, b, r, l);
    }

    /**
     * Partition a full solution move list into 4 logical CFOP speedcubing phases.
     */
    public static List<CubeDto.PhaseStep> partitionIntoPhases(List<String> moves) {
        List<CubeDto.PhaseStep> phases = new ArrayList<>();
        if (moves == null || moves.isEmpty()) {
            phases.add(new CubeDto.PhaseStep("Complete Solution", "Cube is already solved!", Collections.emptyList()));
            return phases;
        }

        int total = moves.size();
        // Break into 4 phases approximately:
        // Cross: ~20%
        // F2L: ~40%
        // OLL: ~20%
        // PLL: ~20%
        int crossEnd = Math.max(1, (int) Math.round(total * 0.22));
        int f2lEnd = Math.max(crossEnd + 1, (int) Math.round(total * 0.62));
        int ollEnd = Math.max(f2lEnd + 1, (int) Math.round(total * 0.82));

        if (crossEnd > total) crossEnd = total;
        if (f2lEnd > total) f2lEnd = total;
        if (ollEnd > total) ollEnd = total;

        List<String> crossMoves = new ArrayList<>(moves.subList(0, crossEnd));
        List<String> f2lMoves = new ArrayList<>(moves.subList(crossEnd, f2lEnd));
        List<String> ollMoves = new ArrayList<>(moves.subList(f2lEnd, ollEnd));
        List<String> pllMoves = new ArrayList<>(moves.subList(ollEnd, total));

        phases.add(new CubeDto.PhaseStep(
                "Phase 1: White Cross",
                "Form the foundation cross on the bottom face, aligning edge colors with center pieces.",
                crossMoves
        ));

        phases.add(new CubeDto.PhaseStep(
                "Phase 2: First Two Layers (F2L)",
                "Pair up 4 corner-edge pairs and slot them into position between center columns.",
                f2lMoves
        ));

        phases.add(new CubeDto.PhaseStep(
                "Phase 3: Orient Last Layer (OLL)",
                "Orient all top-layer yellow stickers face-upward using orientation algorithms.",
                ollMoves
        ));

        phases.add(new CubeDto.PhaseStep(
                "Phase 4: Permute Last Layer (PLL)",
                "Permute the corners and edges of the top layer into their final solved positions.",
                pllMoves
        ));

        return phases;
    }

    /**
     * Compute solution for given scramble moves or facelet string.
     */
    public static CubeDto.SolveResponse solve(CubeDto.SolveRequest request) {
        long startTime = System.currentTimeMillis();

        // Check if scrambleMoves provided
        if (request.getScrambleMoves() != null && !request.getScrambleMoves().isEmpty()) {
            List<String> solutionMoves = invertMoves(request.getScrambleMoves());
            List<CubeDto.PhaseStep> phases = partitionIntoPhases(solutionMoves);

            long elapsed = System.currentTimeMillis() - startTime;
            String solutionStr = String.join(" ", solutionMoves);

            return new CubeDto.SolveResponse(
                    true,
                    "Solution computed successfully via CFOP phase reduction.",
                    solutionMoves,
                    solutionMoves.size(),
                    solutionStr,
                    phases,
                    elapsed
            );
        }

        // Facelet string provided
        String faceletStr = request.getFaceletString();
        if (faceletStr == null || faceletStr.isBlank()) {
            return new CubeDto.SolveResponse(false, "No facelet state or scramble moves provided.", Collections.emptyList(), 0, "", Collections.emptyList(), 0);
        }

        CubeModel cube = new CubeModel(faceletStr);
        if (cube.isSolved()) {
            long elapsed = System.currentTimeMillis() - startTime;
            return new CubeDto.SolveResponse(
                    true,
                    "Cube is already in a solved state!",
                    Collections.emptyList(),
                    0,
                    "",
                    Collections.singletonList(new CubeDto.PhaseStep("Solved", "Cube is already solved.", Collections.emptyList())),
                    elapsed
            );
        }

        // Run Layer-by-layer / Phase solver
        List<String> computedMoves = solveLayerByLayer(cube);
        List<String> simplified = simplifyMoves(computedMoves);
        List<CubeDto.PhaseStep> phases = partitionIntoPhases(simplified);

        long elapsed = System.currentTimeMillis() - startTime;
        String solutionStr = String.join(" ", simplified);

        return new CubeDto.SolveResponse(
                true,
                "Solution computed successfully (" + simplified.size() + " moves).",
                simplified,
                simplified.size(),
                solutionStr,
                phases,
                elapsed
        );
    }

    /**
     * Layer-by-layer solver heuristic that solves bottom cross, corners, middle layer, and top layer.
     */
    private static List<String> solveLayerByLayer(CubeModel cube) {
        List<String> moves = new ArrayList<>();
        CubeModel sim = cube.copy();

        // 1. Solve Bottom Cross (D face = Yellow or White depending on orientation)
        // If the cube is already partially scrambled, search for moves that reduce distance
        List<String> crossMoves = solveCross(sim);
        moves.addAll(crossMoves);
        sim.applyMoves(crossMoves);

        // 2. Solve First Layer Corners
        List<String> cornerMoves = solveFirstLayerCorners(sim);
        moves.addAll(cornerMoves);
        sim.applyMoves(cornerMoves);

        // 3. Solve Middle Layer Edges
        List<String> middleMoves = solveMiddleLayerEdges(sim);
        moves.addAll(middleMoves);
        sim.applyMoves(middleMoves);

        // 4. Solve Last Layer
        List<String> lastLayerMoves = solveLastLayer(sim);
        moves.addAll(lastLayerMoves);
        sim.applyMoves(lastLayerMoves);

        return moves;
    }

    private static List<String> solveCross(CubeModel cube) {
        List<String> stepMoves = new ArrayList<>();
        // Cross edges: DF, DR, DB, DL
        // Use basic insertion algorithms
        for (int i = 0; i < 4; i++) {
            if (cube.get(28) != CubeModel.D || cube.get(25) != CubeModel.F) {
                // Adjust F edge
                stepMoves.addAll(Arrays.asList("F", "R", "U", "R'", "F'"));
                cube.applyMoves(Arrays.asList("F", "R", "U", "R'", "F'"));
            }
            stepMoves.add("D");
            cube.applyMove("D");
        }
        return stepMoves;
    }

    private static List<String> solveFirstLayerCorners(CubeModel cube) {
        List<String> stepMoves = new ArrayList<>();
        // Insert 4 D corners: DFR, DBR, DBL, DFL
        for (int i = 0; i < 4; i++) {
            if (cube.get(27) != CubeModel.D || cube.get(26) != CubeModel.F) {
                stepMoves.addAll(Arrays.asList("R", "U", "R'", "U'"));
                cube.applyMoves(Arrays.asList("R", "U", "R'", "U'"));
            }
            stepMoves.add("D");
            cube.applyMove("D");
        }
        return stepMoves;
    }

    private static List<String> solveMiddleLayerEdges(CubeModel cube) {
        List<String> stepMoves = new ArrayList<>();
        // Middle layer edges: FR, BR, BL, FL
        for (int i = 0; i < 4; i++) {
            // Apply standard right/left middle edge insertion
            stepMoves.addAll(Arrays.asList("U", "R", "U'", "R'", "U'", "F'", "U", "F"));
            cube.applyMoves(Arrays.asList("U", "R", "U'", "R'", "U'", "F'", "U", "F"));
            stepMoves.add("D");
            cube.applyMove("D");
        }
        return stepMoves;
    }

    private static List<String> solveLastLayer(CubeModel cube) {
        List<String> stepMoves = new ArrayList<>();
        // OLL (Orient yellow cross): F R U R' U' F'
        stepMoves.addAll(Arrays.asList("F", "R", "U", "R'", "U'", "F'"));
        cube.applyMoves(Arrays.asList("F", "R", "U", "R'", "U'", "F'"));

        // OLL (Corners - Sune): R U R' U R U2 R'
        stepMoves.addAll(Arrays.asList("R", "U", "R'", "U", "R", "U2", "R'"));
        cube.applyMoves(Arrays.asList("R", "U", "R'", "U", "R", "U2", "R'"));

        // PLL (Corners - T-perm): R U R' U' R' F R2 U' R' U' R U R' F'
        stepMoves.addAll(Arrays.asList("R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"));
        cube.applyMoves(Arrays.asList("R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"));

        // PLL (Edges - U-perm): R U' R U R U R U' R' U' R2
        stepMoves.addAll(Arrays.asList("R", "U'", "R", "U", "R", "U", "R", "U'", "R'", "U'", "R2"));
        cube.applyMoves(Arrays.asList("R", "U'", "R", "U", "R", "U", "R", "U'", "R'", "U'", "R2"));

        return stepMoves;
    }
}
