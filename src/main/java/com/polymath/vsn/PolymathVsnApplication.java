package com.polymath.vsn;

import com.polymath.vsn.model.Role;
import com.polymath.vsn.model.User;
import com.polymath.vsn.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class PolymathVsnApplication {

    public static void main(String[] args) {
        SpringApplication.run(PolymathVsnApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("polymath@vsn.com").isEmpty()) {
                User demoUser = new User();
                demoUser.setEmail("polymath@vsn.com");
                demoUser.setUsername("PolymathMaster");
                demoUser.setPassword(passwordEncoder.encode("Password123!"));
                demoUser.setRole(Role.ROLE_USER);
                demoUser.setSkillMasteryRate(126.6);
                demoUser.setCubeSolvesCompleted(48);
                demoUser.setBestSolveTimeSeconds(14.82);
                demoUser.setCurrentStreakDays(18);
                demoUser.setBio("Exploring multidisciplinary arts: Speedcubing, Mental Calculation, & Memory Palace.");
                userRepository.save(demoUser);
                System.out.println(">>> Demo user seeded: polymath@vsn.com / Password123!");
            }
        };
    }
}
