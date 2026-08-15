package com.skillswap.ai.repository;

import com.skillswap.ai.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    List<Certificate> findByLearnerIdOrderByIssuedAtDesc(Long learnerId);
    Optional<Certificate> findByCertificateCode(String certificateCode);
    Optional<Certificate> findByBookingId(Long bookingId);
}
