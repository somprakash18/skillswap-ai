package com.skillswap.ai.dto;

public class AdminStatsDTO {

    private long totalUsers;
    private long totalSkills;
    private long totalBookings;
    private long completedSessions;
    private long totalCreditsCirculating;
    private long totalCertificatesIssued;

    public AdminStatsDTO() {}

    public AdminStatsDTO(long totalUsers, long totalSkills, long totalBookings, long completedSessions, long totalCreditsCirculating, long totalCertificatesIssued) {
        this.totalUsers = totalUsers;
        this.totalSkills = totalSkills;
        this.totalBookings = totalBookings;
        this.completedSessions = completedSessions;
        this.totalCreditsCirculating = totalCreditsCirculating;
        this.totalCertificatesIssued = totalCertificatesIssued;
    }

    public long getTotalUsers() { return totalUsers; }
    public long getTotalSkills() { return totalSkills; }
    public long getTotalBookings() { return totalBookings; }
    public long getCompletedSessions() { return completedSessions; }
    public long getTotalCreditsCirculating() { return totalCreditsCirculating; }
    public long getTotalCertificatesIssued() { return totalCertificatesIssued; }
}
