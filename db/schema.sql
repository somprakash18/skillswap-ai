-- =========================================================
-- SkillSwap AI - Complete 22-Table EdTech MySQL Database Schema
-- =========================================================

CREATE DATABASE IF NOT EXISTS skillswap_db;
USE skillswap_db;

-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS achievements;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS chats;
DROP TABLE IF EXISTS live_classes;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS wallets;
DROP TABLE IF EXISTS referrals;
DROP TABLE IF EXISTS certificates;
DROP TABLE IF EXISTS downloads;
DROP TABLE IF EXISTS pdf_library;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS phone_verifications;
DROP TABLE IF EXISTS otp_verifications;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS users;

-- 1. Base Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    mobile_number VARCHAR(25),
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_STUDENT', -- 'ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_OWNER'
    avatar_url VARCHAR(500),
    cover_url VARCHAR(500),
    college VARCHAR(150),
    school VARCHAR(150),
    branch VARCHAR(100),
    grad_year INT,
    bio TEXT,
    skills TEXT,
    interests TEXT,
    followers_count INT DEFAULT 0,
    following_count INT DEFAULT 0,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_mobile_verified BOOLEAN DEFAULT FALSE,
    is_blocked BOOLEAN DEFAULT FALSE,
    google_id VARCHAR(150),
    referral_code VARCHAR(30) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Teachers Profile Table
CREATE TABLE teachers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    qualification VARCHAR(150),
    experience_years INT DEFAULT 3,
    expertise_category VARCHAR(50) NOT NULL, -- 'JEE', 'NEET', 'CODING', 'UPSC', 'CAT', 'GATE'
    air_rank VARCHAR(50),
    is_verified BOOLEAN DEFAULT TRUE,
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    rating DOUBLE DEFAULT 5.0,
    review_count INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Students Profile Table
CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    target_exam VARCHAR(50) DEFAULT 'JEE Advanced',
    streak_days INT DEFAULT 7,
    completed_quizzes INT DEFAULT 12,
    certificates_earned INT DEFAULT 3,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Admins / Owner Profile Table
CREATE TABLE admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    admin_level VARCHAR(30) DEFAULT 'SUPER_ADMIN',
    permissions TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Email OTP Verifications Table
CREATE TABLE otp_verifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    otp_type VARCHAR(30) DEFAULT 'REGISTRATION',
    expires_at TIMESTAMP NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_otp_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Phone SMS Verifications Table
CREATE TABLE phone_verifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(25) NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone_num (phone_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Courses Table
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    teacher_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'JEE', 'NEET', 'CODING', 'UPSC', 'CAT', 'GATE', 'DESIGN', 'LANGUAGES'
    subject VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    cover_image_url VARCHAR(500),
    credit_cost INT DEFAULT 15,
    duration_hours INT DEFAULT 20,
    rating DOUBLE DEFAULT 5.0,
    enrolled_count INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'PUBLISHED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_course_cat (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Lessons Table
CREATE TABLE lessons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    video_url VARCHAR(500),
    duration_minutes INT DEFAULT 45,
    order_index INT NOT NULL DEFAULT 1,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Quizzes Table
CREATE TABLE quizzes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'JEE', 'NEET', 'CODING', 'UPSC'
    duration_minutes INT DEFAULT 30,
    total_marks INT DEFAULT 100,
    negative_marking DOUBLE DEFAULT 1.0,
    pass_percentage DOUBLE DEFAULT 60.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Questions Table
CREATE TABLE questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(30) DEFAULT 'MCQ', -- 'MCQ', 'MULTI_SELECT', 'NUMERICAL', 'CODING'
    marks INT DEFAULT 4,
    explanation TEXT,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Answers Options Table
CREATE TABLE answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. PDF Resource Library Table
CREATE TABLE pdf_library (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'JEE', 'NEET', 'CODING', 'UPSC', 'CAT', 'GATE'
    subject VARCHAR(100) NOT NULL,
    doc_type VARCHAR(50) DEFAULT 'Formula Sheet', -- 'Notes', 'Formula Sheet', 'PYQ Bank', 'Cheat Sheet'
    pdf_url VARCHAR(500) NOT NULL,
    file_size_mb DOUBLE DEFAULT 4.5,
    download_count INT DEFAULT 120,
    credit_cost INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_pdf_cat (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Downloads History Table
CREATE TABLE downloads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    pdf_id BIGINT NOT NULL,
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pdf_id) REFERENCES pdf_library(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Certificates Table
CREATE TABLE certificates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_title VARCHAR(200) NOT NULL,
    mentor_name VARCHAR(100) NOT NULL,
    certificate_code VARCHAR(100) NOT NULL UNIQUE,
    qr_code_url VARCHAR(500),
    pdf_url VARCHAR(500),
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. Referrals Table
CREATE TABLE referrals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    referrer_id BIGINT NOT NULL,
    referee_id BIGINT,
    referral_code VARCHAR(30) NOT NULL,
    bonus_credits INT DEFAULT 50,
    status VARCHAR(20) DEFAULT 'COMPLETED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (referrer_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. Wallets Table
CREATE TABLE wallets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    balance INT DEFAULT 120,
    total_earned INT DEFAULT 0,
    total_spent INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. Wallet Transactions Table
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    wallet_id BIGINT NOT NULL,
    amount INT NOT NULL,
    type VARCHAR(30) NOT NULL, -- 'EARNED', 'SPENT', 'PURCHASED', 'REFERRAL_BONUS'
    description VARCHAR(255) NOT NULL,
    razorpay_payment_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. Bookings Table
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    teacher_id BIGINT NOT NULL,
    course_id BIGINT,
    scheduled_at DATETIME NOT NULL,
    meeting_link VARCHAR(500),
    status VARCHAR(30) DEFAULT 'CONFIRMED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 19. Live Classes Table
CREATE TABLE live_classes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    teacher_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    scheduled_time DATETIME NOT NULL,
    google_meet_url VARCHAR(500) NOT NULL,
    attendees_count INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'SCHEDULED', -- 'SCHEDULED', 'LIVE', 'COMPLETED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 20. Real-time Chats Table
CREATE TABLE chats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    attachment_url VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 21. Notifications Table
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'GENERAL',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 22. Achievements Table
CREATE TABLE achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    badge_title VARCHAR(100) NOT NULL,
    badge_icon VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
