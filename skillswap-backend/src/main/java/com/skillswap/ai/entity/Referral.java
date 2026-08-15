package com.skillswap.ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "referrals")
public class Referral {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "referrer_id", nullable = false)
    private User referrer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "referee_id", nullable = false, unique = true)
    private User referee;

    @Column(nullable = false, length = 20)
    private String code;

    @Column(name = "bonus_credits")
    private Integer bonusCredits = 20;

    private String status = "COMPLETED";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Referral() {}

    public Referral(User referrer, User referee, String code, Integer bonusCredits) {
        this.referrer = referrer;
        this.referee = referee;
        this.code = code;
        this.bonusCredits = bonusCredits;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getReferrer() { return referrer; }
    public void setReferrer(User referrer) { this.referrer = referrer; }

    public User getReferee() { return referee; }
    public void setReferee(User referee) { this.referee = referee; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public Integer getBonusCredits() { return bonusCredits; }
    public void setBonusCredits(Integer bonusCredits) { this.bonusCredits = bonusCredits; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
