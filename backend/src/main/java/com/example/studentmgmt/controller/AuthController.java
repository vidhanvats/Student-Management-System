package com.example.studentmgmt.controller;

import org.springframework.http.HttpStatus;
import java.util.Optional;
import com.example.studentmgmt.model.User;
import com.example.studentmgmt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.studentmgmt.dto.LoginRequest;
import com.example.studentmgmt.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("== Login attempt received ==");
        System.out.println("Username: " + loginRequest.getUsername());
        System.out.println("Password: " + loginRequest.getPassword());


        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());

        if (userOpt.isEmpty()) {
            System.out.println("User not found in DB for username: " + loginRequest.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
        }

        User user = userOpt.get();
        System.out.println("DB Password: [" + user.getPassword() + "]");
        System.out.println("Entered Password: [" + loginRequest.getPassword() + "]");
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            System.out.println("Incorrect password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password.");
        }

        return ResponseEntity.ok(new LoginResponse("Login successful", user.getRole()));
    }

}
