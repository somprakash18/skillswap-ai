package com.skillswap.ai.entity.enums;

public enum SkillCategory {
    BACKEND("Backend Development"),
    FRONTEND("Frontend Development"),
    AI_ML("Artificial Intelligence"),
    DEVOPS("DevOps & Cloud"),
    DESIGN("Design & UX"),
    MOBILE("Mobile App Development"),
    DATA_SCIENCE("Data Science & Analytics"),
    OTHER("Other Skills");

    private final String displayName;

    SkillCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
