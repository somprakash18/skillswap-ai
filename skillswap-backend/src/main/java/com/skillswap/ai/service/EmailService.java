package com.skillswap.ai.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public void sendBookingConfirmationEmail(String toEmail, String learnerName, String skillTitle, String meetingLink, String scheduledTime) {
        logger.info("📧 Sending Booking Confirmation Email to {}", toEmail);
        logger.info("Subject: SkillSwap AI Session Confirmed - {}", skillTitle);
        logger.info("Body: Hello {}, your session for '{}' is scheduled for {}. Join call link: {}", learnerName, skillTitle, scheduledTime, meetingLink);
    }

    public void sendCertificateIssuedEmail(String toEmail, String learnerName, String skillTitle, String certificateCode) {
        logger.info("🎓 Sending Certificate Email to {}", toEmail);
        logger.info("Subject: Verified Certificate Issued - {}", skillTitle);
        logger.info("Body: Congratulations {}! Your verified certificate for '{}' code: {}", learnerName, skillTitle, certificateCode);
    }
}
