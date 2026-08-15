package com.skillswap.ai.service;

import com.skillswap.ai.entity.User;
import com.skillswap.ai.exception.ResourceNotFoundException;
import com.skillswap.ai.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    public User updateProfile(Long userId, User updateData) {
        User existingUser = getUserById(userId);
        if (updateData.getFullName() != null) existingUser.setFullName(updateData.getFullName());
        if (updateData.getCollege() != null) existingUser.setCollege(updateData.getCollege());
        if (updateData.getBio() != null) existingUser.setBio(updateData.getBio());
        if (updateData.getAvatarUrl() != null) existingUser.setAvatarUrl(updateData.getAvatarUrl());
        if (updateData.getExperienceLevel() != null) existingUser.setExperienceLevel(updateData.getExperienceLevel());

        return userRepository.save(existingUser);
    }

    public List<User> getLeaderboard() {
        return userRepository.findTop10ByOrderByRatingDescStreakDaysDesc();
    }
}
