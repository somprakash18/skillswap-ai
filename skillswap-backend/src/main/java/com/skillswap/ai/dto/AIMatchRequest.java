package com.skillswap.ai.dto;

public class AIMatchRequest {

    private String wantedSkill;
    private String userBio;

    public AIMatchRequest() {}

    public String getWantedSkill() { return wantedSkill; }
    public void setWantedSkill(String wantedSkill) { this.wantedSkill = wantedSkill; }

    public String getUserBio() { return userBio; }
    public void setUserBio(String userBio) { this.userBio = userBio; }
}
