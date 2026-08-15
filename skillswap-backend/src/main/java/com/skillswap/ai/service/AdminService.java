package com.skillswap.ai.service;

import com.skillswap.ai.dto.AdminStatsDTO;
import com.skillswap.ai.entity.Skill;
import com.skillswap.ai.entity.User;
import com.skillswap.ai.entity.enums.BookingStatus;
import com.skillswap.ai.exception.ResourceNotFoundException;
import com.skillswap.ai.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private CertificateRepository certificateRepository;

    public AdminStatsDTO getPlatformStats() {
        long users = userRepository.count();
        long skills = skillRepository.count();
        long bookings = bookingRepository.count();
        long completed = bookingRepository.findByStatus(BookingStatus.COMPLETED).size();
        long totalCredits = walletRepository.findAll().stream().mapToLong(w -> w.getBalance()).sum();
        long certs = certificateRepository.count();

        return new AdminStatsDTO(users, skills, bookings, completed, totalCredits, certs);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User toggleBlockUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        user.setIsBlocked(!Boolean.TRUE.equals(user.getIsBlocked()));
        return userRepository.save(user);
    }

    public List<Skill> getPendingSkills() {
        return skillRepository.findByStatus("PENDING");
    }

    public Skill updateSkillStatus(Long skillId, String status) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + skillId));
        skill.setStatus(status);
        return skillRepository.save(skill);
    }
}
