package com.polymath.vsn.controller;

import com.polymath.vsn.dto.CubeDto;
import com.polymath.vsn.service.RubikCubeSolverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cube")
public class CubeSolverController {

    private final RubikCubeSolverService cubeSolverService;

    public CubeSolverController(RubikCubeSolverService cubeSolverService) {
        this.cubeSolverService = cubeSolverService;
    }

    @PostMapping("/solve")
    public ResponseEntity<CubeDto.SolveResponse> solveCube(@RequestBody CubeDto.SolveRequest request) {
        CubeDto.SolveResponse response = cubeSolverService.solveCube(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/scramble")
    public ResponseEntity<CubeDto.ScrambleResponse> getScramble(
            @RequestParam(defaultValue = "20") int length) {
        CubeDto.ScrambleResponse response = cubeSolverService.generateScramble(length);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<CubeDto.ValidationResponse> validateFacelets(@RequestBody Map<String, String> payload) {
        String facelets = payload.get("faceletString");
        CubeDto.ValidationResponse response = cubeSolverService.validateFacelets(facelets);
        return ResponseEntity.ok(response);
    }
}
