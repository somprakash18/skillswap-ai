package com.skillswap.ai.controller;

import com.skillswap.ai.dto.ApiResponse;
import com.skillswap.ai.dto.JwtResponse;
import com.skillswap.ai.dto.LoginRequest;
import com.skillswap.ai.dto.RegisterRequest;
import com.skillswap.ai.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        JwtResponse response = authService.register(registerRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Registration successful!", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Login successful!", response));
    }
}
