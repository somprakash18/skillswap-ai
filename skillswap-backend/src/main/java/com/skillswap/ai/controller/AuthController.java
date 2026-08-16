package com.skillswap.ai.controller;

import com.skillswap.ai.dto.*;
import com.skillswap.ai.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponse> sendOtp(@Valid @RequestBody SendOtpRequest sendOtpRequest) {
        String otp = authService.sendOtp(sendOtpRequest);
        return ResponseEntity.ok(new ApiResponse(true, "OTP sent successfully to " + sendOtpRequest.getMobileNumber(), Map.of("otp", otp)));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse> verifyOtp(@Valid @RequestBody VerifyOtpRequest verifyOtpRequest) {
        JwtResponse response = authService.verifyOtp(verifyOtpRequest);
        return ResponseEntity.ok(new ApiResponse(true, "OTP verified successfully! Welcome to SkillSwap AI.", response));
    }

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
