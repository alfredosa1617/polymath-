package com.polymath.vsn.service;

import com.polymath.vsn.dto.CubeDto;
import com.polymath.vsn.solver.RubikSolver;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RubikCubeSolverService {

    public CubeDto.SolveResponse solveCube(CubeDto.SolveRequest request) {
        if (request == null) {
            return new CubeDto.SolveResponse(false, "Invalid request.", List.of(), 0, "", List.of(), 0);
        }
        return RubikSolver.solve(request);
    }

    public CubeDto.ScrambleResponse generateScramble(int length) {
        if (length <= 0 || length > 40) {
            length = 20;
        }
        List<String> moves = RubikSolver.generateScramble(length);
        String scrambleStr = String.join(" ", moves);
        return new CubeDto.ScrambleResponse(moves, scrambleStr, moves.size());
    }

    public CubeDto.ValidationResponse validateFacelets(String facelets) {
        return RubikSolver.validate(facelets);
    }
}
