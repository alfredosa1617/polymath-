package com.polymath.vsn.controller;

import com.polymath.vsn.dto.AuthDto;
import com.polymath.vsn.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        try {
            AuthDto.UserProfileResponse profile = userService.getProfile(authentication.getName());
            return ResponseEntity.ok(profile);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @PostMapping("/solve-stat")
    public ResponseEntity<?> recordSolve(Authentication authentication, @RequestBody Map<String, Double> payload) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        Double timeSeconds = payload.getOrDefault("timeSeconds", 0.0);
        AuthDto.UserProfileResponse updated = userService.recordSolve(authentication.getName(), timeSeconds);
        return ResponseEntity.ok(updated);
    }
}
