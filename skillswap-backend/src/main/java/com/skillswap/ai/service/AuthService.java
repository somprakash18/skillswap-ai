package com.skillswap.ai.service;

import com.skillswap.ai.dto.*;
import com.skillswap.ai.entity.Referral;
import com.skillswap.ai.entity.User;
import com.skillswap.ai.entity.Wallet;
import com.skillswap.ai.entity.enums.Role;
import com.skillswap.ai.exception.BadRequestException;
import com.skillswap.ai.repository.ReferralRepository;
import com.skillswap.ai.repository.UserRepository;
import com.skillswap.ai.repository.WalletRepository;
import com.skillswap.ai.security.JwtUtils;
import com.skillswap.ai.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private ReferralRepository referralRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    // In-memory thread-safe OTP cache (Mobile Number -> OTP string)
    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    public String sendOtp(SendOtpRequest request) {
        String cleanPhone = request.getMobileNumber().replaceAll("[^0-9]", "");
        // Generate a 6-digit OTP (for testing, default to 123456 or random 6-digit number)
        String generatedOtp = "123456";
        otpStorage.put(cleanPhone, generatedOtp);
        return generatedOtp;
    }

    @Transactional
    public JwtResponse verifyOtp(VerifyOtpRequest request) {
        String cleanPhone = request.getMobileNumber().replaceAll("[^0-9]", "");
        String storedOtp = otpStorage.get(cleanPhone);

        // Allow '123456' as standard OTP or matching stored OTP
        if (storedOtp == null && !"123456".equals(request.getOtp())) {
            throw new BadRequestException("Invalid or expired OTP. Please request a new OTP.");
        }

        if (storedOtp != null && !storedOtp.equals(request.getOtp()) && !"123456".equals(request.getOtp())) {
            throw new BadRequestException("Invalid OTP code entered!");
        }

        // Clean up OTP after use
        otpStorage.remove(cleanPhone);

        // Find or Create user by email or mobile number
        String email = (request.getEmail() != null && !request.getEmail().isBlank()) 
                ? request.getEmail() 
                : "user_" + cleanPhone + "@gmail.com";

        String fullName = (request.getFullName() != null && !request.getFullName().isBlank()) 
                ? request.getFullName() 
                : "Student (" + cleanPhone.substring(Math.max(0, cleanPhone.length() - 4)) + ")";

        String college = (request.getCollege() != null && !request.getCollege().isBlank()) 
                ? request.getCollege() 
                : "Stanford University";

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User(
                    email,
                    encoder.encode("OTP_AUTH_PASS_" + UUID.randomUUID()),
                    fullName,
                    college
            );
            newUser.setBio("Joined via Mobile OTP authentication!");
            newUser.setRole(Role.ROLE_USER);
            newUser.setReferralCode("SKILL-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase());
            newUser.setAvatarUrl("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150");

            User saved = userRepository.save(newUser);

            // Give 50 starter bonus credits in wallet
            Wallet wallet = new Wallet(saved, 50);
            walletRepository.save(wallet);

            return saved;
        });

        if (Boolean.TRUE.equals(user.getIsBlocked())) {
            throw new BadRequestException("Your account has been suspended. Please contact admin.");
        }

        String jwt = jwtUtils.generateTokenFromEmail(user.getEmail());

        return new JwtResponse(jwt, user.getId(), user.getEmail(), user.getFullName(),
                user.getCollege(), user.getRole().name(), user.getAvatarUrl());
    }

    @Transactional
    public JwtResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered!");
        }

        User user = new User(
                request.getEmail(),
                encoder.encode(request.getPassword() != null ? request.getPassword() : "OTP_PASS_" + UUID.randomUUID()),
                request.getFullName(),
                request.getCollege() != null ? request.getCollege() : "Stanford University"
        );
        user.setBio("Passionate about learning and sharing skills!");
        user.setRole(Role.ROLE_USER);
        user.setReferralCode("SKILL-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase());
        user.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150");

        User savedUser = userRepository.save(user);

        Wallet wallet = new Wallet(savedUser, 50);
        walletRepository.save(wallet);

        String jwt = jwtUtils.generateJwtTokenFromUsername(savedUser.getEmail());

        return new JwtResponse(jwt, savedUser.getId(), savedUser.getEmail(), savedUser.getFullName(),
                savedUser.getCollege(), savedUser.getRole().name(), savedUser.getAvatarUrl());
    }

    public JwtResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow();

        if (Boolean.TRUE.equals(user.getIsBlocked())) {
            throw new BadRequestException("Your account has been suspended. Please contact admin.");
        }

        return new JwtResponse(jwt, user.getId(), user.getEmail(), user.getFullName(),
                user.getCollege(), user.getRole().name(), user.getAvatarUrl());
    }
}
