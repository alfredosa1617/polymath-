package com.polymath.vsn.solver;

import java.util.Arrays;

/**
 * Representation of a 3x3 Rubik's Cube with 54 facelets.
 * Faces:
 * U (Up - White, 0..8)
 * R (Right - Red, 9..17)
 * F (Front - Green, 18..26)
 * D (Down - Yellow, 27..35)
 * L (Left - Orange, 36..44)
 * B (Back - Blue, 45..53)
 */
public class CubeModel {

    public static final char U = 'U'; // White
    public static final char R = 'R'; // Red
    public static final char F = 'F'; // Green
    public static final char D = 'D'; // Yellow
    public static final char L = 'L'; // Orange
    public static final char B = 'B'; // Blue

    // 54 facelets array
    private final char[] f = new char[54];

    public CubeModel() {
        reset();
    }

    public CubeModel(String facelets) {
        if (facelets != null && facelets.length() == 54) {
            System.arraycopy(facelets.toUpperCase().toCharArray(), 0, f, 0, 54);
        } else {
            reset();
        }
    }

    public CubeModel copy() {
        CubeModel c = new CubeModel();
        System.arraycopy(this.f, 0, c.f, 0, 54);
        return c;
    }

    public void reset() {
        for (int i = 0; i < 9; i++) f[i] = U;
        for (int i = 9; i < 18; i++) f[i] = R;
        for (int i = 18; i < 27; i++) f[i] = F;
        for (int i = 27; i < 36; i++) f[i] = D;
        for (int i = 36; i < 45; i++) f[i] = L;
        for (int i = 45; i < 54; i++) f[i] = B;
    }

    public char get(int index) {
        return f[index];
    }

    public void set(int index, char color) {
        f[index] = color;
    }

    public String toFaceletString() {
        return new String(f);
    }

    public boolean isSolved() {
        for (int i = 0; i < 9; i++) if (f[i] != U) return false;
        for (int i = 9; i < 18; i++) if (f[i] != R) return false;
        for (int i = 18; i < 27; i++) if (f[i] != F) return false;
        for (int i = 27; i < 36; i++) if (f[i] != D) return false;
        for (int i = 36; i < 45; i++) if (f[i] != L) return false;
        for (int i = 45; i < 54; i++) if (f[i] != B) return false;
        return true;
    }

    // Rotate 9 facelets on one face clockwise
    private void rotateFaceClockwise(int offset) {
        char temp0 = f[offset];
        char temp1 = f[offset + 1];

        // Corners
        f[offset] = f[offset + 6];
        f[offset + 6] = f[offset + 8];
        f[offset + 8] = f[offset + 2];
        f[offset + 2] = temp0;

        // Edges
        f[offset + 1] = f[offset + 3];
        f[offset + 3] = f[offset + 7];
        f[offset + 7] = f[offset + 5];
        f[offset + 5] = temp1;
    }

    // Apply single standard move
    public void applyMove(String move) {
        if (move == null || move.isBlank()) return;
        move = move.trim().toUpperCase();

        switch (move) {
            case "U": turnU(1); break;
            case "U'": turnU(3); break;
            case "U2": turnU(2); break;

            case "D": turnD(1); break;
            case "D'": turnD(3); break;
            case "D2": turnD(2); break;

            case "F": turnF(1); break;
            case "F'": turnF(3); break;
            case "F2": turnF(2); break;

            case "B": turnB(1); break;
            case "B'": turnB(3); break;
            case "B2": turnB(2); break;

            case "L": turnL(1); break;
            case "L'": turnL(3); break;
            case "L2": turnL(2); break;

            case "R": turnR(1); break;
            case "R'": turnR(3); break;
            case "R2": turnR(2); break;
        }
    }

    public void applyMoves(Iterable<String> moves) {
        for (String m : moves) {
            applyMove(m);
        }
    }

    public void applyMoves(String moveSeq) {
        if (moveSeq == null) return;
        String[] parts = moveSeq.trim().split("\\s+");
        for (String p : parts) {
            if (!p.isBlank()) applyMove(p);
        }
    }

    private void turnU(int times) {
        times = (times % 4 + 4) % 4;
        for (int t = 0; t < times; t++) {
            rotateFaceClockwise(0);
            // Adjacent faces: B -> R -> F -> L (top rows: B[0,1,2], R[9,10,11], F[18,19,20], L[36,37,38])
            char t0 = f[36], t1 = f[37], t2 = f[38];
            f[36] = f[18]; f[37] = f[19]; f[38] = f[20];
            f[18] = f[9];  f[19] = f[10]; f[20] = f[11];
            f[9]  = f[45]; f[10] = f[46]; f[11] = f[47];
            f[45] = t0;    f[46] = t1;    f[47] = t2;
        }
    }

    private void turnD(int times) {
        times = (times % 4 + 4) % 4;
        for (int t = 0; t < times; t++) {
            rotateFaceClockwise(27);
            // Bottom rows: F[24,25,26], R[15,16,17], B[51,52,53], L[42,43,44]
            char t0 = f[18 + 6], t1 = f[18 + 7], t2 = f[18 + 8];
            f[24] = f[42]; f[25] = f[43]; f[26] = f[44];
            f[42] = f[51]; f[43] = f[52]; f[44] = f[53];
            f[51] = f[15]; f[52] = f[16]; f[53] = f[17];
            f[15] = t0;    f[16] = t1;    f[17] = t2;
        }
    }

    private void turnF(int times) {
        times = (times % 4 + 4) % 4;
        for (int t = 0; t < times; t++) {
            rotateFaceClockwise(18);
            // U bottom row (6,7,8), R left col (9,12,15), D top row (27,28,29), L right col (38,41,44)
            char t0 = f[6], t1 = f[7], t2 = f[8];
            f[6] = f[44]; f[7] = f[41]; f[8] = f[38];
            f[38] = f[27]; f[41] = f[28]; f[44] = f[29];
            f[27] = f[15]; f[28] = f[12]; f[29] = f[9];
            f[9]  = t0;    f[12] = t1;    f[15] = t2;
        }
    }

    private void turnB(int times) {
        times = (times % 4 + 4) % 4;
        for (int t = 0; t < times; t++) {
            rotateFaceClockwise(45);
            // U top row (0,1,2), L left col (36,39,42), D bottom row (33,34,35), R right col (11,14,17)
            char t0 = f[0], t1 = f[1], t2 = f[2];
            f[0] = f[11]; f[1] = f[14]; f[2] = f[17];
            f[11] = f[35]; f[14] = f[34]; f[17] = f[33];
            f[35] = f[42]; f[34] = f[39]; f[33] = f[36];
            f[36] = t2;    f[39] = t1;    f[42] = t0;
        }
    }

    private void turnL(int times) {
        times = (times % 4 + 4) % 4;
        for (int t = 0; t < times; t++) {
            rotateFaceClockwise(36);
            // U left col (0,3,6), F left col (18,21,24), D left col (27,30,33), B right col (53,50,47)
            char t0 = f[0], t1 = f[3], t2 = f[6];
            f[0]  = f[53]; f[3]  = f[50]; f[6]  = f[47];
            f[53] = f[33]; f[50] = f[30]; f[47] = f[27];
            f[27] = f[18]; f[30] = f[21]; f[33] = f[24];
            f[18] = t0;    f[21] = t1;    f[24] = t2;
        }
    }

    private void turnR(int times) {
        times = (times % 4 + 4) % 4;
        for (int t = 0; t < times; t++) {
            rotateFaceClockwise(9);
            // U right col (2,5,8), B left col (51,48,45), D right col (29,32,35), F right col (20,23,26)
            char t0 = f[2], t1 = f[5], t2 = f[8];
            f[2]  = f[20]; f[5]  = f[23]; f[8]  = f[26];
            f[20] = f[29]; f[23] = f[32]; f[26] = f[35];
            f[29] = f[51]; f[32] = f[48]; f[35] = f[45];
            f[51] = t0;    f[48] = t1;    f[45] = t2;
        }
    }
}
