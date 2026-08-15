package com.skillswap.ai.controller;

import com.skillswap.ai.dto.ApiResponse;
import com.skillswap.ai.entity.Message;
import com.skillswap.ai.security.UserDetailsImpl;
import com.skillswap.ai.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/send")
    public ResponseEntity<ApiResponse> sendMessage(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                    @RequestParam Long receiverId,
                                                    @RequestParam(required = false) Long bookingId,
                                                    @RequestBody String content) {
        Message msg = chatService.sendMessage(userDetails.getId(), receiverId, bookingId, content);
        return ResponseEntity.ok(new ApiResponse(true, "Message sent successfully!", msg));
    }

    @GetMapping("/conversation/{otherUserId}")
    public ResponseEntity<ApiResponse> getConversation(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                        @PathVariable Long otherUserId) {
        List<Message> messages = chatService.getConversation(userDetails.getId(), otherUserId);
        return ResponseEntity.ok(new ApiResponse(true, "Conversation messages", messages));
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<ApiResponse> getBookingMessages(@PathVariable Long bookingId) {
        List<Message> messages = chatService.getBookingMessages(bookingId);
        return ResponseEntity.ok(new ApiResponse(true, "Booking session chat messages", messages));
    }
}
