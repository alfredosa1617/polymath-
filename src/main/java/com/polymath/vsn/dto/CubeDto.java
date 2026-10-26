package com.polymath.vsn.dto;

import java.util.List;

public class CubeDto {

    public static class SolveRequest {
        // 54-char string representing the facelets: U1-U9, R1-R9, F1-F9, D1-D9, L1-L9, B1-B9
        // Or scramble notation / move list
        private String faceletString;
        private List<String> scrambleMoves;

        public String getFaceletString() { return faceletString; }
        public void setFaceletString(String faceletString) { this.faceletString = faceletString; }

        public List<String> getScrambleMoves() { return scrambleMoves; }
        public void setScrambleMoves(List<String> scrambleMoves) { this.scrambleMoves = scrambleMoves; }
    }

    public static class PhaseStep {
        private String name;
        private String description;
        private List<String> moves;

        public PhaseStep(String name, String description, List<String> moves) {
            this.name = name;
            this.description = description;
            this.moves = moves;
        }

        public String getName() { return name; }
        public String getDescription() { return description; }
        public List<String> getMoves() { return moves; }
    }

    public static class SolveResponse {
        private boolean solved;
        private String message;
        private List<String> moves;
        private int moveCount;
        private String solutionString;
        private List<PhaseStep> phases;
        private long executionTimeMs;

        public SolveResponse() {}

        public SolveResponse(boolean solved, String message, List<String> moves, int moveCount,
                             String solutionString, List<PhaseStep> phases, long executionTimeMs) {
            this.solved = solved;
            this.message = message;
            this.moves = moves;
            this.moveCount = moveCount;
            this.solutionString = solutionString;
            this.phases = phases;
            this.executionTimeMs = executionTimeMs;
        }

        public boolean isSolved() { return solved; }
        public void setSolved(boolean solved) { this.solved = solved; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public List<String> getMoves() { return moves; }
        public void setMoves(List<String> moves) { this.moves = moves; }

        public int getMoveCount() { return moveCount; }
        public void setMoveCount(int moveCount) { this.moveCount = moveCount; }

        public String getSolutionString() { return solutionString; }
        public void setSolutionString(String solutionString) { this.solutionString = solutionString; }

        public List<PhaseStep> getPhases() { return phases; }
        public void setPhases(List<PhaseStep> phases) { this.phases = phases; }

        public long getExecutionTimeMs() { return executionTimeMs; }
        public void setExecutionTimeMs(long executionTimeMs) { this.executionTimeMs = executionTimeMs; }
    }

    public static class ScrambleResponse {
        private List<String> moves;
        private String scrambleString;
        private int moveCount;

        public ScrambleResponse(List<String> moves, String scrambleString, int moveCount) {
            this.moves = moves;
            this.scrambleString = scrambleString;
            this.moveCount = moveCount;
        }

        public List<String> getMoves() { return moves; }
        public String getScrambleString() { return scrambleString; }
        public int getMoveCount() { return moveCount; }
    }

    public static class ValidationResponse {
        private boolean valid;
        private String message;
        private int whiteCount;
        private int yellowCount;
        private int greenCount;
        private int blueCount;
        private int redCount;
        private int orangeCount;

        public ValidationResponse(boolean valid, String message, int whiteCount, int yellowCount,
                                  int greenCount, int blueCount, int redCount, int orangeCount) {
            this.valid = valid;
            this.message = message;
            this.whiteCount = whiteCount;
            this.yellowCount = yellowCount;
            this.greenCount = greenCount;
            this.blueCount = blueCount;
            this.redCount = redCount;
            this.orangeCount = orangeCount;
        }

        public boolean isValid() { return valid; }
        public String getMessage() { return message; }
        public int getWhiteCount() { return whiteCount; }
        public int getYellowCount() { return yellowCount; }
        public int getGreenCount() { return greenCount; }
        public int getBlueCount() { return blueCount; }
        public int getRedCount() { return redCount; }
        public int getOrangeCount() { return orangeCount; }
    }
}
