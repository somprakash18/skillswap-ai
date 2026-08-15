package com.skillswap.ai.service;

import com.skillswap.ai.entity.Booking;
import com.skillswap.ai.entity.Certificate;
import com.skillswap.ai.entity.User;
import com.skillswap.ai.exception.ResourceNotFoundException;
import com.skillswap.ai.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    public Certificate generateCertificate(Booking booking) {
        return certificateRepository.findByBookingId(booking.getId()).orElseGet(() -> {
            String certCode = "CERT-SKILLSWAP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            Certificate cert = new Certificate(
                    booking,
                    booking.getLearner(),
                    booking.getSkill().getTitle(),
                    booking.getMentor().getFullName(),
                    certCode
            );
            return certificateRepository.save(cert);
        });
    }

    public List<Certificate> getUserCertificates(Long learnerId) {
        return certificateRepository.findByLearnerIdOrderByIssuedAtDesc(learnerId);
    }

    public Certificate verifyCertificate(String code) {
        return certificateRepository.findByCertificateCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or non-existent certificate verification code: " + code));
    }
}
