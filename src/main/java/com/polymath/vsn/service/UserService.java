package com.polymath.vsn.service;

import com.polymath.vsn.dto.AuthDto;
import com.polymath.vsn.model.Role;
import com.polymath.vsn.model.User;
import com.polymath.vsn.repository.UserRepository;
import com.polymath.vsn.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public AuthDto.AuthResponse signup(AuthDto.SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        String username = request.getUsername();
        if (username == null || username.isBlank()) {
            username = request.getEmail().split("@")[0];
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_USER);
        user.setSkillMasteryRate(126.6);
        user.setCubeSolvesCompleted(1);
        user.setBestSolveTimeSeconds(24.50);
        user.setCurrentStreakDays(1);
        user.setBio("Polymath VSN Explorer");

        User saved = userRepository.save(user);

        String token = tokenProvider.generateTokenFromUsername(saved.getEmail());

        return new AuthDto.AuthResponse(
                token,
                saved.getId(),
                saved.getEmail(),
                saved.getUsername(),
                saved.getSkillMasteryRate()
        );
    }

    public AuthDto.AuthResponse signin(AuthDto.LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .or(() -> userRepository.findByUsername(request.getEmail()))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new AuthDto.AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getSkillMasteryRate()
        );
    }

    public AuthDto.UserProfileResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .or(() -> userRepository.findByUsername(email))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new AuthDto.UserProfileResponse(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getSkillMasteryRate(),
                user.getCubeSolvesCompleted(),
                user.getBestSolveTimeSeconds(),
                user.getCurrentStreakDays(),
                user.getBio()
        );
    }

    public AuthDto.UserProfileResponse recordSolve(String email, double timeSeconds) {
        User user = userRepository.findByEmail(email)
                .or(() -> userRepository.findByUsername(email))
                .orElse(null);

        if (user != null) {
            user.setCubeSolvesCompleted(user.getCubeSolvesCompleted() + 1);
            if (user.getBestSolveTimeSeconds() == 0 || timeSeconds < user.getBestSolveTimeSeconds()) {
                user.setBestSolveTimeSeconds(timeSeconds);
            }
            user.setSkillMasteryRate(Math.min(200.0, user.getSkillMasteryRate() + 1.2));
            userRepository.save(user);
            return getProfile(email);
        }
        return null;
    }
}
