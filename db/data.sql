-- =========================================================
-- SkillSwap AI - Seed Data Script
-- =========================================================

USE skillswap_db;

-- 1. Insert Founder & Top Mentors
INSERT INTO users (id, email, password_hash, full_name, mobile_number, college, branch, grad_year, bio, avatar_url, role, is_email_verified, is_mobile_verified, credits, rating, review_count) VALUES
(1, 'prakashsom316@gmail.com', '$2a$10$e8T.1iW536G9fV3sQ43K4.bWJ3k4m4u5Q3h4n4o4p4q4r4s4t4u4v', 'Som Prakash', '+91 9876543210', 'SkillSwap AI Founder Office', 'Computer Science & AI', 2026, 'Platform Founder & Lead Architect of SkillSwap AI.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'ROLE_FOUNDER', TRUE, TRUE, 9999, 5.0, 150),
(2, 'rohan.verma@iitb.ac.in', '$2a$10$e8T.1iW536G9fV3sQ43K4.bWJ3k4m4u5Q3h4n4o4p4q4r4s4t4u4v', 'Rohan Verma', '+91 9876543211', 'IIT Bombay', 'Computer Science', 2026, 'IIT Bombay AIR 142. Teaching JEE Advanced Physics Mechanics & Calculus.', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', 'ROLE_TEACHER', TRUE, TRUE, 250, 5.0, 92),
(3, 'ananya.d@aiims.edu', '$2a$10$e8T.1iW536G9fV3sQ43K4.bWJ3k4m4u5Q3h4n4o4p4q4r4s4t4u4v', 'Ananya Deshmukh', '+91 9876543212', 'AIIMS New Delhi', 'MBBS Medical', 2027, 'AIIMS New Delhi AIR 89. NEET UG Biology NCERT Line-by-Line 360/360 mentor.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'ROLE_TEACHER', TRUE, TRUE, 310, 5.0, 104),
(4, 'alex.chen@stanford.edu', '$2a$10$e8T.1iW536G9fV3sQ43K4.bWJ3k4m4u5Q3h4n4o4p4q4r4s4t4u4v', 'Alex Chen', '+91 9876543213', 'Stanford University', 'Computer Science', 2025, 'Java Spring Boot & DSA Specialist. Mentoring fullstack software engineering.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'ROLE_TEACHER', TRUE, TRUE, 180, 4.9, 58);

-- 2. Insert Initial Wallets
INSERT INTO wallets (user_id, balance, total_earned, total_spent) VALUES
(1, 9999, 1500, 0),
(2, 250, 450, 200),
(3, 310, 520, 210),
(4, 180, 320, 140);

-- 3. Insert Featured Skills
INSERT INTO skills (id, user_id, title, category, description, skill_type, credit_cost, tags, status) VALUES
(1, 2, 'JEE Physics: Mechanics & Calculus Problem Solving', 'JEE_PREP', 'Deep dive into Newtonian Dynamics, Rotational Mechanics, and Calculus-based physics tricks.', 'OFFERED', 15, 'JEE,Physics,IIT,Mechanics', 'APPROVED'),
(2, 3, 'NEET Biology: NCERT Line-by-Line 360/360 Mastery', 'NEET_PREP', 'Complete human physiology, genetics memory maps, and high-yield NCERT diagram revision.', 'OFFERED', 15, 'NEET,Biology,NCERT,AIIMS', 'APPROVED'),
(3, 4, 'Java Core & Spring Boot 3 Microservices Architecture', 'CODING', 'Master REST API design, JPA Hibernate, Spring Security JWT, and Docker containerization.', 'OFFERED', 20, 'Java,Spring Boot,Backend,Microservices', 'APPROVED');
