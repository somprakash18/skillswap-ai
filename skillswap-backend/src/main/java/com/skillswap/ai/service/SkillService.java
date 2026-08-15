package com.skillswap.ai.service;

import com.skillswap.ai.dto.SkillRequest;
import com.skillswap.ai.entity.Skill;
import com.skillswap.ai.entity.User;
import com.skillswap.ai.entity.enums.SkillCategory;
import com.skillswap.ai.entity.enums.SkillType;
import com.skillswap.ai.exception.ResourceNotFoundException;
import com.skillswap.ai.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserService userService;

    public Skill createSkill(Long userId, SkillRequest request) {
        User user = userService.getUserById(userId);

        Skill skill = new Skill();
        skill.setUser(user);
        skill.setTitle(request.getTitle());
        skill.setCategory(request.getCategory());
        skill.setDescription(request.getDescription());
        skill.setSkillType(request.getSkillType());
        skill.setCreditCost(request.getCreditCost());
        skill.setExperienceLevel(request.getExperienceLevel());
        skill.setTags(request.getTags());
        skill.setStatus("APPROVED");

        return skillRepository.save(skill);
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findByStatus("APPROVED");
    }

    public Skill getSkillById(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
    }

    public List<Skill> getSkillsByCategory(SkillCategory category) {
        return skillRepository.findByCategoryAndStatus(category, "APPROVED");
    }

    public List<Skill> getSkillsByType(SkillType skillType) {
        return skillRepository.findBySkillTypeAndStatus(skillType, "APPROVED");
    }

    public List<Skill> searchSkills(String query) {
        if (query == null || query.isBlank()) return getAllSkills();
        return skillRepository.searchSkills(query);
    }

    public List<Skill> getUserSkills(Long userId) {
        return skillRepository.findByUserId(userId);
    }
}
