package com.polymath.vsn.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.ROLE_USER;

    private Double skillMasteryRate = 126.6;

    private Integer cubeSolvesCompleted = 0;

    private Double bestSolveTimeSeconds = 0.0;

    private Integer currentStreakDays = 1;

    private String bio;

    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    public User(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = Role.ROLE_USER;
        this.skillMasteryRate = 126.6;
        this.cubeSolvesCompleted = 0;
        this.currentStreakDays = 1;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Double getSkillMasteryRate() { return skillMasteryRate; }
    public void setSkillMasteryRate(Double skillMasteryRate) { this.skillMasteryRate = skillMasteryRate; }

    public Integer getCubeSolvesCompleted() { return cubeSolvesCompleted; }
    public void setCubeSolvesCompleted(Integer cubeSolvesCompleted) { this.cubeSolvesCompleted = cubeSolvesCompleted; }

    public Double getBestSolveTimeSeconds() { return bestSolveTimeSeconds; }
    public void setBestSolveTimeSeconds(Double bestSolveTimeSeconds) { this.bestSolveTimeSeconds = bestSolveTimeSeconds; }

    public Integer getCurrentStreakDays() { return currentStreakDays; }
    public void setCurrentStreakDays(Integer currentStreakDays) { this.currentStreakDays = currentStreakDays; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
