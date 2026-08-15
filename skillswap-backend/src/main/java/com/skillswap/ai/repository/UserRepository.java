package com.skillswap.ai.repository;

import com.skillswap.ai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    Optional<User> findByReferralCode(String referralCode);
    List<User> findTop10ByOrderByRatingDescStreakDaysDesc();
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.isBlocked = false")
    long countActiveUsers();
}
