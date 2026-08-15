package com.skillswap.ai.controller;

import com.skillswap.ai.dto.ApiResponse;
import com.skillswap.ai.dto.SkillRequest;
import com.skillswap.ai.entity.Skill;
import com.skillswap.ai.entity.enums.SkillCategory;
import com.skillswap.ai.entity.enums.SkillType;
import com.skillswap.ai.security.UserDetailsImpl;
import com.skillswap.ai.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllSkills(@RequestParam(required = false) String search,
                                                     @RequestParam(required = false) SkillCategory category,
                                                     @RequestParam(required = false) SkillType type) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(new ApiResponse(true, "Search results", skillService.searchSkills(search)));
        }
        if (category != null) {
            return ResponseEntity.ok(new ApiResponse(true, "Skills by category", skillService.getSkillsByCategory(category)));
        }
        if (type != null) {
            return ResponseEntity.ok(new ApiResponse(true, "Skills by type", skillService.getSkillsByType(type)));
        }
        return ResponseEntity.ok(new ApiResponse(true, "All active skills", skillService.getAllSkills()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getSkillById(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse(true, "Skill details", skillService.getSkillById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createSkill(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                    @Valid @RequestBody SkillRequest request) {
        Skill createdSkill = skillService.createSkill(userDetails.getId(), request);
        return ResponseEntity.ok(new ApiResponse(true, "Skill created successfully!", createdSkill));
    }

    @GetMapping("/my-skills")
    public ResponseEntity<ApiResponse> getMySkills(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(new ApiResponse(true, "My listed skills", skillService.getUserSkills(userDetails.getId())));
    }
}
