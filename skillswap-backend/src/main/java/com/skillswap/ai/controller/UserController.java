package com.skillswap.ai.controller;

import com.skillswap.ai.dto.ApiResponse;
import com.skillswap.ai.entity.User;
import com.skillswap.ai.security.UserDetailsImpl;
import com.skillswap.ai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userService.getUserById(userDetails.getId());
        return ResponseEntity.ok(new ApiResponse(true, "Fetched user profile", user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Fetched user details", user));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse> updateProfile(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                      @RequestBody User updateData) {
        User updated = userService.updateProfile(userDetails.getId(), updateData);
        return ResponseEntity.ok(new ApiResponse(true, "Profile updated successfully!", updated));
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<ApiResponse> getLeaderboard() {
        return ResponseEntity.ok(new ApiResponse(true, "Fetched leaderboard", userService.getLeaderboard()));
    }
}
