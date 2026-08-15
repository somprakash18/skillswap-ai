package com.skillswap.ai.repository;

import com.skillswap.ai.entity.Booking;
import com.skillswap.ai.entity.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByLearnerIdOrderByScheduledAtDesc(Long learnerId);
    List<Booking> findByMentorIdOrderByScheduledAtDesc(Long mentorId);
    List<Booking> findByLearnerIdOrMentorIdOrderByScheduledAtDesc(Long learnerId, Long mentorId);
    List<Booking> findByStatus(BookingStatus status);
}
