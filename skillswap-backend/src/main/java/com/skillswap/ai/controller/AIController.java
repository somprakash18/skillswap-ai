package com.skillswap.ai.controller;

import com.skillswap.ai.dto.AIInterviewRequest;
import com.skillswap.ai.dto.AIMatchRequest;
import com.skillswap.ai.dto.AIRoadmapRequest;
import com.skillswap.ai.dto.ApiResponse;
import com.skillswap.ai.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/roadmap")
    public ResponseEntity<ApiResponse> generateRoadmap(@RequestBody AIRoadmapRequest request) {
        return ResponseEntity.ok(new ApiResponse(true, "AI Learning Roadmap Generated", aiService.generateRoadmap(request)));
    }

    @PostMapping("/match-mentors")
    public ResponseEntity<ApiResponse> matchMentors(@RequestBody AIMatchRequest request) {
        return ResponseEntity.ok(new ApiResponse(true, "AI Mentor Matches Found", aiService.matchMentors(request)));
    }

    @PostMapping("/interview-questions")
    public ResponseEntity<ApiResponse> generateInterviewQuestions(@RequestBody AIInterviewRequest request) {
        return ResponseEntity.ok(new ApiResponse(true, "AI Mock Interview Questions Generated", aiService.generateInterviewQuestions(request)));
    }
}
