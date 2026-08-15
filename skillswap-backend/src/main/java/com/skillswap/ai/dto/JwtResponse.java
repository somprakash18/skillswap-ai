package com.skillswap.ai.dto;

public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String fullName;
    private String college;
    private String role;
    private String avatarUrl;

    public JwtResponse(String token, Long id, String email, String fullName, String college, String role, String avatarUrl) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.college = college;
        this.role = role;
        this.avatarUrl = avatarUrl;
    }

    public String getToken() { return token; }
    public String getType() { return type; }
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public String getCollege() { return college; }
    public String getRole() { return role; }
    public String getAvatarUrl() { return avatarUrl; }
}
