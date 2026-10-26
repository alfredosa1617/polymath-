package com.polymath.vsn.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDto {

    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class SignupRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        private String username;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class AuthResponse {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String email;
        private String username;
        private Double skillMasteryRate;

        public AuthResponse(String token, Long id, String email, String username, Double skillMasteryRate) {
            this.token = token;
            this.id = id;
            this.email = email;
            this.username = username;
            this.skillMasteryRate = skillMasteryRate;
        }

        public String getToken() { return token; }
        public String getType() { return type; }
        public Long getId() { return id; }
        public String getEmail() { return email; }
        public String getUsername() { return username; }
        public Double getSkillMasteryRate() { return skillMasteryRate; }
    }

    public static class UserProfileResponse {
        private Long id;
        private String email;
        private String username;
        private Double skillMasteryRate;
        private Integer cubeSolvesCompleted;
        private Double bestSolveTimeSeconds;
        private Integer currentStreakDays;
        private String bio;

        public UserProfileResponse(Long id, String email, String username, Double skillMasteryRate,
                                   Integer cubeSolvesCompleted, Double bestSolveTimeSeconds,
                                   Integer currentStreakDays, String bio) {
            this.id = id;
            this.email = email;
            this.username = username;
            this.skillMasteryRate = skillMasteryRate;
            this.cubeSolvesCompleted = cubeSolvesCompleted;
            this.bestSolveTimeSeconds = bestSolveTimeSeconds;
            this.currentStreakDays = currentStreakDays;
            this.bio = bio;
        }

        public Long getId() { return id; }
        public String getEmail() { return email; }
        public String getUsername() { return username; }
        public Double getSkillMasteryRate() { return skillMasteryRate; }
        public Integer getCubeSolvesCompleted() { return cubeSolvesCompleted; }
        public Double getBestSolveTimeSeconds() { return bestSolveTimeSeconds; }
        public Integer getCurrentStreakDays() { return currentStreakDays; }
        public String getBio() { return bio; }
    }
}
