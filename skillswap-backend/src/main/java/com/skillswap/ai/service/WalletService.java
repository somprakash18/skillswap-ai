package com.skillswap.ai.service;

import com.skillswap.ai.dto.RazorpayOrderRequest;
import com.skillswap.ai.dto.RazorpayVerifyRequest;
import com.skillswap.ai.entity.Transaction;
import com.skillswap.ai.entity.Wallet;
import com.skillswap.ai.entity.enums.TransactionType;
import com.skillswap.ai.exception.BadRequestException;
import com.skillswap.ai.exception.ResourceNotFoundException;
import com.skillswap.ai.repository.TransactionRepository;
import com.skillswap.ai.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Value("${app.razorpay.keyId}")
    private String razorpayKeyId;

    public Wallet getWalletByUserId(Long userId) {
        return walletRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found for user: " + userId));
    }

    public List<Transaction> getTransactionHistory(Long userId) {
        Wallet wallet = getWalletByUserId(userId);
        return transactionRepository.findByWalletIdOrderByCreatedAtDesc(wallet.getId());
    }

    public Map<String, Object> createRazorpayOrder(Long userId, RazorpayOrderRequest request) {
        Wallet wallet = getWalletByUserId(userId);

        String orderId = "order_rzp_" + UUID.randomUUID().toString().replaceAll("-", "").substring(0, 14);

        Map<String, Object> orderDetails = new HashMap<>();
        orderDetails.put("orderId", orderId);
        orderDetails.put("currency", "INR");
        orderDetails.put("amount", (int)(request.getAmountInInr() * 100)); // amount in paise
        orderDetails.put("credits", request.getCredits());
        orderDetails.put("keyId", razorpayKeyId);

        return orderDetails;
    }

    @Transactional
    public Wallet verifyRazorpayPayment(Long userId, RazorpayVerifyRequest request) {
        Wallet wallet = getWalletByUserId(userId);

        // Verification signature check simulation (Production Razorpay Signature matching)
        if (request.getRazorpayPaymentId() == null || request.getRazorpayPaymentId().isBlank()) {
            throw new BadRequestException("Invalid payment ID");
        }

        int creditsToAdd = request.getCredits() != null ? request.getCredits() : 50;
        wallet.setBalance(wallet.getBalance() + creditsToAdd);
        wallet.setTotalEarned(wallet.getTotalEarned() + creditsToAdd);
        Wallet updatedWallet = walletRepository.save(wallet);

        Transaction transaction = new Transaction(
                wallet,
                creditsToAdd,
                TransactionType.PURCHASED,
                "Purchased " + creditsToAdd + " Premium Credits via Razorpay"
        );
        transaction.setRazorpayPaymentId(request.getRazorpayPaymentId());
        transaction.setRazorpayOrderId(request.getRazorpayOrderId());
        transactionRepository.save(transaction);

        return updatedWallet;
    }
}
