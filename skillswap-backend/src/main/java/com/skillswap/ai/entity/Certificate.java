package com.skillswap.ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "learner_id", nullable = false)
    private User learner;

    @Column(name = "skill_title", nullable = false, length = 150)
    private String skillTitle;

    @Column(name = "mentor_name", nullable = false, length = 100)
    private String mentorName;

    @Column(name = "certificate_code", nullable = false, unique = true, length = 100)
    private String certificateCode;

    @Column(name = "issued_at", updatable = false)
    private LocalDateTime issuedAt = LocalDateTime.now();

    public Certificate() {}

    public Certificate(Booking booking, User learner, String skillTitle, String mentorName, String certificateCode) {
        this.booking = booking;
        this.learner = learner;
        this.skillTitle = skillTitle;
        this.mentorName = mentorName;
        this.certificateCode = certificateCode;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public User getLearner() { return learner; }
    public void setLearner(User learner) { this.learner = learner; }

    public String getSkillTitle() { return skillTitle; }
    public void setSkillTitle(String skillTitle) { this.skillTitle = skillTitle; }

    public String getMentorName() { return mentorName; }
    public void setMentorName(String mentorName) { this.mentorName = mentorName; }

    public String getCertificateCode() { return certificateCode; }
    public void setCertificateCode(String certificateCode) { this.certificateCode = certificateCode; }

    public LocalDateTime getIssuedAt() { return issuedAt; }
}
