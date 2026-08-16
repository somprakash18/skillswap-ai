-- =========================================================
-- SkillSwap AI - Complete Seed Data Script (22 Tables)
-- =========================================================

USE skillswap_db;

-- 1. Base Users (Som Prakash Founder, AIR rankers, AIIMS toppers, Students)
INSERT INTO users (id, email, password_hash, full_name, mobile_number, role, avatar_url, cover_url, college, school, branch, grad_year, bio, skills, interests, followers_count, following_count, is_email_verified, is_mobile_verified, referral_code) VALUES
(1, 'prakashsom316@gmail.com', '$2a$10$e8T.1iW536G9fV3sQ43K4.bWJ3k4m4u5Q3h4n4o4p4q4r4s4t4u4v', 'Som Prakash', '+91 9876543210', 'ROLE_OWNER', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=1200', 'SkillSwap AI Founder Office', 'DPS RK Puram', 'Computer Science & AI', 2026, 'Founder & Lead Architect of SkillSwap AI EdTech Platform.', 'System Architecture, React, Spring Boot, MySQL', 'EdTech, AI, SaaS Scaling', 1240, 48, TRUE, TRUE, 'SOM2026'),
(2, 'rohan.verma@iitb.ac.in', '$2a$10$e8T.1iW536G9fV3sQ43K4.bWJ3k4m4u5Q3h4n4o4p4q4r4s4t4u4v', 'Rohan Verma', '+91 9876543211', 'ROLE_TEACHER', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200', 'IIT Bombay', 'Allen Kota', 'Computer Science', 2026, 'IIT Bombay AIR 142. Mentoring JEE Advanced Physics & Calculus problem solving.', 'JEE Physics, Rotational Mechanics, Calculus', 'Physics Research, Competitive Programming', 890, 32, TRUE, TRUE, 'ROHAN142'),
(3, 'ananya.d@aiims.edu', '$2a$10$e8T.1iW536G9fV3sQ43K4.bWJ3k4m4u5Q3h4n4o4p4q4r4s4t4u4v', 'Ananya Deshmukh', '+91 9876543212', 'ROLE_TEACHER', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200', 'AIIMS New Delhi', 'Aakash Delhi', 'MBBS Medical', 2027, 'AIIMS New Delhi AIR 89. NCERT Biology 360/360 line-by-line master trainer.', 'NEET Biology, NCERT Diagrams, Genetics', 'Human Physiology, Medical Research', 1120, 54, TRUE, TRUE, 'ANANYA89'),
(4, 'alex.chen@stanford.edu', '$2a$10$e8T.1iW536G9fV3sQ43K4.bWJ3k4m4u5Q3h4n4o4p4q4r4s4t4u4v', 'Alex Chen', '+91 9876543213', 'ROLE_TEACHER', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200', 'Stanford University', 'Gunn High', 'Computer Science', 2025, 'Java Spring Boot 3 & Data Structures Specialist. Fullstack Engineering Mentor.', 'Java, Spring Boot, Microservices, LeetCode', 'Open Source, Web3', 640, 20, TRUE, TRUE, 'ALEXSTAN'),
(5, 'student.demo@gmail.com', '$2a$10$e8T.1iW536G9fV3sQ43K4.bWJ3k4m4u5Q3h4n4o4p4q4r4s4t4u4v', 'Priya Sharma', '+91 9876543214', 'ROLE_STUDENT', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200', 'BITS Pilani', 'DAV Public', 'Electrical Engineering', 2026, 'Preparing for JEE Advanced & Fullstack Software Engineering Roles.', 'React, Physics, Python', 'Robotics, Design Systems', 320, 45, TRUE, TRUE, 'PRIYA2026');

-- 2. Insert Teachers
INSERT INTO teachers (id, user_id, qualification, experience_years, expertise_category, air_rank, is_verified, total_earnings, rating, review_count) VALUES
(1, 2, 'B.Tech CSE - IIT Bombay', 4, 'JEE', 'AIR 142', TRUE, 48500.00, 5.0, 92),
(2, 3, 'MBBS - AIIMS New Delhi', 3, 'NEET', 'AIR 89', TRUE, 42200.00, 5.0, 104),
(3, 4, 'MS Computer Science - Stanford', 5, 'CODING', 'Top 1% LeetCode', TRUE, 28800.00, 4.9, 58);

-- 3. Insert Students
INSERT INTO students (id, user_id, target_exam, streak_days, completed_quizzes, certificates_earned) VALUES
(1, 5, 'JEE Advanced & Fullstack Dev', 7, 14, 3);

-- 4. Insert Admins
INSERT INTO admins (id, user_id, admin_level, permissions) VALUES
(1, 1, 'OWNER', 'FULL_ACCESS');

-- 5. Insert Wallets
INSERT INTO wallets (user_id, balance, total_earned, total_spent) VALUES
(1, 9999, 5000, 0),
(2, 450, 850, 400),
(3, 520, 920, 400),
(4, 320, 600, 280),
(5, 120, 200, 80);

-- 6. Insert Courses
INSERT INTO courses (id, teacher_id, title, category, subject, description, cover_image_url, credit_cost, duration_hours, rating, enrolled_count) VALUES
(1, 2, 'JEE Physics Mechanics & Rotational Dynamics Masterclass', 'JEE', 'Physics', 'Deep dive into Newtonian Mechanics, Rotational Motion, and Calculus-based JEE Advanced problem-solving techniques.', 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600', 15, 24, 5.0, 310),
(2, 3, 'NEET Biology NCERT 360/360 Memory Maps & Diagram Mastery', 'NEET', 'Biology', 'Complete line-by-line NCERT Biology revision, genetics memory shortcuts, and high-yield diagram practice.', 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600', 15, 20, 5.0, 420),
(3, 4, 'Java Spring Boot 3 & Enterprise Microservices Architecture', 'CODING', 'Java Backend', 'Master REST API design, JPA Hibernate, Spring Security JWT, Docker containerization, and Kafka messaging.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600', 20, 28, 4.9, 280);

-- 7. Insert PDF Library Records
INSERT INTO pdf_library (id, title, category, subject, doc_type, pdf_url, file_size_mb, download_count) VALUES
(1, 'JEE Advanced Physics Mechanics & Calculus Formula Bank', 'JEE', 'Physics', 'Formula Sheet', 'https://raw.githubusercontent.com/somprakash18/skillswap-ai/main/pdfs/JEE_Advanced_Physics_QA_Mastery_Bank.pdf', 4.2, 850),
(2, 'NEET Biology NCERT Line-by-Line 360 Memory Mind Maps', 'NEET', 'Biology', 'Notes', 'https://raw.githubusercontent.com/somprakash18/skillswap-ai/main/pdfs/NEET_Biology_NCERT_360_QA_Bank.pdf', 5.8, 1240),
(3, 'Java Core & Spring Boot 3 Microservices Cheat Sheet', 'CODING', 'Java Backend', 'Cheat Sheet', 'https://raw.githubusercontent.com/somprakash18/skillswap-ai/main/pdfs/Java_SpringBoot3_Microservices_QA_Bank.pdf', 3.4, 620);

-- 8. Insert Quizzes
INSERT INTO quizzes (id, course_id, title, category, duration_minutes, total_marks, negative_marking, pass_percentage) VALUES
(1, 1, 'JEE Physics: Rotational Motion & Calculus Test', 'JEE', 30, 40, 1.0, 60.0),
(2, 2, 'NEET Biology: Human Physiology & NCERT Quiz', 'NEET', 25, 40, 1.0, 60.0),
(3, 3, 'Java Spring Boot 3 REST API & JPA Test', 'CODING', 20, 30, 0.0, 70.0);

-- 9. Insert Sample Questions
INSERT INTO questions (id, quiz_id, question_text, question_type, marks, explanation) VALUES
(1, 1, 'A solid sphere of mass M and radius R rolls without slipping down an inclined plane of inclination θ. What is its acceleration down the incline?', 'MCQ', 4, 'Using a = (g sin θ) / (1 + I/MR²), for a solid sphere I = (2/5)MR², so a = (5/7) g sin θ.'),
(2, 2, 'Which hormone triggers the release of pancreatic juice rich in bicarbonate ions into the duodenum during digestion?', 'MCQ', 4, 'Secretin hormone released from duodenum mucosa stimulates duct cells of pancreas to secrete bicarbonate-rich fluid.'),
(3, 3, 'In Spring Boot 3, which annotation is used to inject configuration properties from application.yml directly into a Java bean class?', 'MCQ', 4, '@ConfigurationProperties(prefix = "app") binds structured YAML config directly to Java POJOs.');

-- 10. Insert Answers Options
INSERT INTO answers (question_id, option_text, is_correct) VALUES
(1, '(5/7) g sin θ', TRUE),
(1, '(3/5) g sin θ', FALSE),
(1, '(2/3) g sin θ', FALSE),
(1, '(1/2) g sin θ', FALSE),
(2, 'Secretin', TRUE),
(2, 'Cholecystokinin (CCK)', FALSE),
(2, 'Gastrin', FALSE),
(2, 'Insulin', FALSE),
(3, '@ConfigurationProperties', TRUE),
(3, '@Value', FALSE),
(3, '@Autowired', FALSE),
(3, '@Component', FALSE);

-- 11. Insert Certificates
INSERT INTO certificates (id, user_id, course_title, mentor_name, certificate_code, pdf_url) VALUES
(1, 5, 'JEE Advanced Physics Rotational Dynamics', 'Rohan Verma (IIT Bombay AIR 142)', 'SKILLSWAP-JEE-2026-8841', 'https://raw.githubusercontent.com/somprakash18/skillswap-ai/main/certificates/SKILLSWAP-JEE-2026-8841.pdf');
