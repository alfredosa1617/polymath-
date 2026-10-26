package com.polymath.vsn.controller;

import com.polymath.vsn.dto.DsaDto.*;
import com.polymath.vsn.service.DsaExecutionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dsa")
@CrossOrigin(origins = "*")
public class DsaController {

    private final DsaExecutionService dsaExecutionService;

    public DsaController(DsaExecutionService dsaExecutionService) {
        this.dsaExecutionService = dsaExecutionService;
    }

    @PostMapping("/run")
    public ResponseEntity<CodeExecutionResponse> runCode(@RequestBody CodeRunRequest request) {
        CodeExecutionResponse response = dsaExecutionService.runOrSubmit(
            request.getLanguage(),
            request.getCode(),
            request.getProblemId(),
            false,
            request.getCustomInput()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/submit")
    public ResponseEntity<CodeExecutionResponse> submitCode(@RequestBody CodeSubmitRequest request) {
        CodeExecutionResponse response = dsaExecutionService.runOrSubmit(
            request.getLanguage(),
            request.getCode(),
            request.getProblemId(),
            true,
            null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status")
    public ResponseEntity<String> status() {
        return ResponseEntity.ok("DSA Execution Engine Online (C++20, Java 21, Python 3).");
    }
}
