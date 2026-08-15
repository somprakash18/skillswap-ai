package com.skillswap.ai.controller;

import com.skillswap.ai.dto.ApiResponse;
import com.skillswap.ai.dto.RazorpayOrderRequest;
import com.skillswap.ai.dto.RazorpayVerifyRequest;
import com.skillswap.ai.entity.Wallet;
import com.skillswap.ai.security.UserDetailsImpl;
import com.skillswap.ai.service.WalletService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping
    public ResponseEntity<ApiResponse> getWallet(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Wallet wallet = walletService.getWalletByUserId(userDetails.getId());
        return ResponseEntity.ok(new ApiResponse(true, "Fetched wallet details", wallet));
    }

    @GetMapping("/transactions")
    public ResponseEntity<ApiResponse> getTransactions(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(new ApiResponse(true, "Fetched transaction history", walletService.getTransactionHistory(userDetails.getId())));
    }

    @PostMapping("/razorpay/order")
    public ResponseEntity<ApiResponse> createOrder(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                    @Valid @RequestBody RazorpayOrderRequest request) {
        Map<String, Object> orderData = walletService.createRazorpayOrder(userDetails.getId(), request);
        return ResponseEntity.ok(new ApiResponse(true, "Razorpay order generated", orderData));
    }

    @PostMapping("/razorpay/verify")
    public ResponseEntity<ApiResponse> verifyPayment(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                      @Valid @RequestBody RazorpayVerifyRequest request) {
        Wallet updatedWallet = walletService.verifyRazorpayPayment(userDetails.getId(), request);
        return ResponseEntity.ok(new ApiResponse(true, "Payment verified! Credits added successfully.", updatedWallet));
    }
}
