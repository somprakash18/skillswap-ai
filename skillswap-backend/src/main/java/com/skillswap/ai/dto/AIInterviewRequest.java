package com.skillswap.ai.dto;

public class AIInterviewRequest {

    private String skillTitle;
    private String experienceLevel;

    public AIInterviewRequest() {}

    public String getSkillTitle() { return skillTitle; }
    public void setSkillTitle(String skillTitle) { this.skillTitle = skillTitle; }

    public String getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }
}
