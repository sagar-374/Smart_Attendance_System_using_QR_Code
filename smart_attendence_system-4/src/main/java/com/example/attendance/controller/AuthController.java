package com.example.attendance.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.attendance.security.JwtUtil;
import com.example.demo.dto.LoginRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4050")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // ✅ WRITE YOUR LOGIN METHOD HERE
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        if ("admin".equals(request.getUsername())
                && "admin123".equals(request.getPassword())) {

            String role = "ADMIN";

            String token = jwtUtil.generateToken(
                    request.getUsername(),
                    role
            );

            return ResponseEntity.ok(
                Map.of(
                    "token", token,
                    "role", role
                )
            );
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Invalid credentials");
    }
}
