package com.skillswap.ai.controller;

import com.skillswap.ai.dto.ApiResponse;
import com.skillswap.ai.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse> getStats() {
        return ResponseEntity.ok(new ApiResponse(true, "Admin Platform Analytics", adminService.getPlatformStats()));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse> getAllUsers() {
        return ResponseEntity.ok(new ApiResponse(true, "All registered users", adminService.getAllUsers()));
    }

    @PatchMapping("/users/{userId}/toggle-block")
    public ResponseEntity<ApiResponse> toggleBlockUser(@PathVariable Long userId) {
        return ResponseEntity.ok(new ApiResponse(true, "User status updated", adminService.toggleBlockUser(userId)));
    }

    @GetMapping("/skills/pending")
    public ResponseEntity<ApiResponse> getPendingSkills() {
        return ResponseEntity.ok(new ApiResponse(true, "Pending skill submissions", adminService.getPendingSkills()));
    }

    @PatchMapping("/skills/{skillId}/approve")
    public ResponseEntity<ApiResponse> approveSkill(@PathVariable Long skillId) {
        return ResponseEntity.ok(new ApiResponse(true, "Skill approved", adminService.updateSkillStatus(skillId, "APPROVED")));
    }

    @PatchMapping("/skills/{skillId}/reject")
    public ResponseEntity<ApiResponse> rejectSkill(@PathVariable Long skillId) {
        return ResponseEntity.ok(new ApiResponse(true, "Skill rejected", adminService.updateSkillStatus(skillId, "REJECTED")));
    }
}
