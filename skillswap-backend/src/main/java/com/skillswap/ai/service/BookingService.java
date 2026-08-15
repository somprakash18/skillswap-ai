package com.skillswap.ai.service;

import com.skillswap.ai.dto.BookingRequest;
import com.skillswap.ai.entity.*;
import com.skillswap.ai.entity.enums.BookingStatus;
import com.skillswap.ai.entity.enums.TransactionType;
import com.skillswap.ai.exception.BadRequestException;
import com.skillswap.ai.exception.ResourceNotFoundException;
import com.skillswap.ai.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private CertificateService certificateService;

    @Transactional
    public Booking createBooking(Long learnerId, BookingRequest request) {
        User learner = userRepository.findById(learnerId).orElseThrow(() -> new ResourceNotFoundException("Learner not found"));
        Skill skill = skillRepository.findById(request.getSkillId()).orElseThrow(() -> new ResourceNotFoundException("Skill not found"));
        User mentor = skill.getUser();

        if (learner.getId().equals(mentor.getId())) {
            throw new BadRequestException("You cannot book your own skill session!");
        }

        Wallet learnerWallet = walletRepository.findByUserId(learnerId)
                .orElseThrow(() -> new ResourceNotFoundException("Learner wallet not found"));

        if (learnerWallet.getBalance() < skill.getCreditCost()) {
            throw new BadRequestException("Insufficient credit balance! You have " + learnerWallet.getBalance() + " credits, but session costs " + skill.getCreditCost());
        }

        // Reserve credit from learner (escrow)
        learnerWallet.setBalance(learnerWallet.getBalance() - skill.getCreditCost());
        learnerWallet.setTotalSpent(learnerWallet.getTotalSpent() + skill.getCreditCost());
        walletRepository.save(learnerWallet);

        transactionRepository.save(new Transaction(learnerWallet, -skill.getCreditCost(), TransactionType.SPENT,
                "Escrow reservation for session: " + skill.getTitle()));

        // Create Booking
        Booking booking = new Booking();
        booking.setLearner(learner);
        booking.setMentor(mentor);
        booking.setSkill(skill);
        booking.setScheduledAt(request.getScheduledAt());
        booking.setDurationMinutes(request.getDurationMinutes());
        booking.setCreditAmount(skill.getCreditCost());
        booking.setNotes(request.getNotes());
        booking.setStatus(BookingStatus.PENDING);
        booking.setMeetingLink("https://meet.jit.si/skillswap-session-" + UUID.randomUUID().toString().substring(0, 8));

        Booking savedBooking = bookingRepository.save(booking);

        // Notify mentor
        notificationRepository.save(new Notification(mentor, "New Booking Request!",
                learner.getFullName() + " requested a session for skill: " + skill.getTitle(), "BOOKING"));

        return savedBooking;
    }

    @Transactional
    public Booking updateBookingStatus(Long userId, Long bookingId, BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (!booking.getMentor().getId().equals(userId) && !booking.getLearner().getId().equals(userId)) {
            throw new BadRequestException("Not authorized to update this booking");
        }

        BookingStatus oldStatus = booking.getStatus();
        booking.setStatus(status);

        if (status == BookingStatus.COMPLETED && oldStatus != BookingStatus.COMPLETED) {
            // Transfer credit to mentor
            Wallet mentorWallet = walletRepository.findByUserId(booking.getMentor().getId()).orElseThrow();
            mentorWallet.setBalance(mentorWallet.getBalance() + booking.getCreditAmount());
            mentorWallet.setTotalEarned(mentorWallet.getTotalEarned() + booking.getCreditAmount());
            walletRepository.save(mentorWallet);

            transactionRepository.save(new Transaction(mentorWallet, booking.getCreditAmount(), TransactionType.EARNED,
                    "Earned from teaching session: " + booking.getSkill().getTitle()));

            // Update mentor stats
            User mentor = booking.getMentor();
            mentor.setStreakDays(mentor.getStreakDays() + 1);
            userRepository.save(mentor);

            // Generate verified completion certificate for learner
            certificateService.generateCertificate(booking);

            notificationRepository.save(new Notification(booking.getLearner(), "Session Completed!",
                    "You completed your session for " + booking.getSkill().getTitle() + ". Verified Certificate issued!", "SYSTEM"));
        } else if (status == BookingStatus.REJECTED || status == BookingStatus.CANCELLED) {
            // Refund credits to learner
            Wallet learnerWallet = walletRepository.findByUserId(booking.getLearner().getId()).orElseThrow();
            learnerWallet.setBalance(learnerWallet.getBalance() + booking.getCreditAmount());
            learnerWallet.setTotalSpent(Math.max(0, learnerWallet.getTotalSpent() - booking.getCreditAmount()));
            walletRepository.save(learnerWallet);

            transactionRepository.save(new Transaction(learnerWallet, booking.getCreditAmount(), TransactionType.SIGNUP_BONUS,
                    "Refund for cancelled/rejected session: " + booking.getSkill().getTitle()));
        }

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByLearnerIdOrMentorIdOrderByScheduledAtDesc(userId, userId);
    }
}
