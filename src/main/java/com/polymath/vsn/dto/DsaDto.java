package com.polymath.vsn.dto;

import java.util.List;

public class DsaDto {

    public static class CodeRunRequest {
        private String language; // "cpp", "java", "python"
        private String code;
        private String problemId;
        private String customInput;

        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getProblemId() { return problemId; }
        public void setProblemId(String problemId) { this.problemId = problemId; }

        public String getCustomInput() { return customInput; }
        public void setCustomInput(String customInput) { this.customInput = customInput; }
    }

    public static class CodeSubmitRequest {
        private String language;
        private String code;
        private String problemId;

        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getProblemId() { return problemId; }
        public void setProblemId(String problemId) { this.problemId = problemId; }
    }

    public static class TestCaseResult {
        private String input;
        private String expectedOutput;
        private String actualOutput;
        private boolean passed;
        private String stdout;

        public TestCaseResult() {}

        public TestCaseResult(String input, String expectedOutput, String actualOutput, boolean passed, String stdout) {
            this.input = input;
            this.expectedOutput = expectedOutput;
            this.actualOutput = actualOutput;
            this.passed = passed;
            this.stdout = stdout;
        }

        public String getInput() { return input; }
        public void setInput(String input) { this.input = input; }

        public String getExpectedOutput() { return expectedOutput; }
        public void setExpectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; }

        public String getActualOutput() { return actualOutput; }
        public void setActualOutput(String actualOutput) { this.actualOutput = actualOutput; }

        public boolean isPassed() { return passed; }
        public void setPassed(boolean passed) { this.passed = passed; }

        public String getStdout() { return stdout; }
        public void setStdout(String stdout) { this.stdout = stdout; }
    }

    public static class CodeExecutionResponse {
        private String status; // "Accepted", "Wrong Answer", "Compile Error", "Time Limit Exceeded", "Runtime Error"
        private int passedCount;
        private int totalCount;
        private long runtimeMs;
        private String memory;
        private String compilerError;
        private List<TestCaseResult> testCaseResults;
        private String problemId;

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public int getPassedCount() { return passedCount; }
        public void setPassedCount(int passedCount) { this.passedCount = passedCount; }

        public int getTotalCount() { return totalCount; }
        public void setTotalCount(int totalCount) { this.totalCount = totalCount; }

        public long getRuntimeMs() { return runtimeMs; }
        public void setRuntimeMs(long runtimeMs) { this.runtimeMs = runtimeMs; }

        public String getMemory() { return memory; }
        public void setMemory(String memory) { this.memory = memory; }

        public String getCompilerError() { return compilerError; }
        public void setCompilerError(String compilerError) { this.compilerError = compilerError; }

        public List<TestCaseResult> getTestCaseResults() { return testCaseResults; }
        public void setTestCaseResults(List<TestCaseResult> testCaseResults) { this.testCaseResults = testCaseResults; }

        public String getProblemId() { return problemId; }
        public void setProblemId(String problemId) { this.problemId = problemId; }
    }
}
