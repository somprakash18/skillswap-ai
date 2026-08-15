package com.skillswap.ai.dto;

public class AIRoadmapRequest {

    private String skillTitle;
    private String targetGoal;
    private String experienceLevel;

    public AIRoadmapRequest() {}

    public String getSkillTitle() { return skillTitle; }
    public void setSkillTitle(String skillTitle) { this.skillTitle = skillTitle; }

    public String getTargetGoal() { return targetGoal; }
    public void setTargetGoal(String targetGoal) { this.targetGoal = targetGoal; }

    public String getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }
}
