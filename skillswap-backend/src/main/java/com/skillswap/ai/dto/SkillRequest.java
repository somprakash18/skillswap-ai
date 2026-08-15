package com.skillswap.ai.dto;

import com.skillswap.ai.entity.enums.ExperienceLevel;
import com.skillswap.ai.entity.enums.SkillCategory;
import com.skillswap.ai.entity.enums.SkillType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SkillRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Category is required")
    private SkillCategory category;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Skill type is required")
    private SkillType skillType; // OFFERED or WANTED

    @Min(value = 1, message = "Credit cost must be at least 1")
    private Integer creditCost = 10;

    private ExperienceLevel experienceLevel = ExperienceLevel.INTERMEDIATE;
    private String tags;

    public SkillRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public SkillCategory getCategory() { return category; }
    public void setCategory(SkillCategory category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public SkillType getSkillType() { return skillType; }
    public void setSkillType(SkillType skillType) { this.skillType = skillType; }

    public Integer getCreditCost() { return creditCost; }
    public void setCreditCost(Integer creditCost) { this.creditCost = creditCost; }

    public ExperienceLevel getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(ExperienceLevel experienceLevel) { this.experienceLevel = experienceLevel; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
}
