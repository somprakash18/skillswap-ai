package com.skillswap.ai.service;

import com.skillswap.ai.dto.JwtResponse;
import com.skillswap.ai.dto.LoginRequest;
import com.skillswap.ai.dto.RegisterRequest;
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

import java.util.UUID;

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

    @Transactional
    public JwtResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered!");
        }

        // Create new user
        User user = new User(
                request.getEmail(),
                encoder.encode(request.getPassword()),
                request.getFullName(),
                request.getCollege()
        );
        user.setBio(request.getBio() != null ? request.getBio() : "Passionate about learning and sharing skills!");
        user.setRole(Role.ROLE_USER);
        user.setReferralCode("SKILL-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase());
        user.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150");

        User savedUser = userRepository.save(user);

        // Initialize wallet with 50 sign-up bonus credits
        Wallet wallet = new Wallet(savedUser, 50);
        walletRepository.save(wallet);

        // Process referral code if provided
        if (request.getReferralCode() != null && !request.getReferralCode().isBlank()) {
            userRepository.findByReferralCode(request.getReferralCode()).ifPresent(referrer -> {
                // Reward referrer with 25 bonus credits
                Wallet referrerWallet = walletRepository.findByUserId(referrer.getId()).orElse(null);
                if (referrerWallet != null) {
                    referrerWallet.setBalance(referrerWallet.getBalance() + 25);
                    referrerWallet.setTotalEarned(referrerWallet.getTotalEarned() + 25);
                    walletRepository.save(referrerWallet);
                }
                referralRepository.save(new Referral(referrer, savedUser, request.getReferralCode(), 25));
            });
        }

        // Authenticate new user & generate JWT
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

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
