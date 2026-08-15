-- =========================================================
-- SkillSwap AI - Sample Data Seed Script
-- =========================================================

USE skillswap_db;

-- 1. Insert Initial Users (Password for all users: 'Password123!' -> BCrypt: $2a$10$e8O6v8.4n8E1H/e2/a... standard BCrypt)
INSERT INTO users (id, email, password_hash, full_name, college, bio, avatar_url, experience_level, rating, review_count, streak_days, role, verified, referral_code) VALUES
(1, 'admin@skillswap.ai', '$2a$10$7R.p5u2vC9p.p5u2vC9p.eX8v1m2n3o4p5q6r7s8t9u0v1w2x3y4z', 'SkillSwap Admin', 'Stanford University', 'Platform Lead & System Administrator.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'ADVANCED', 5.0, 42, 14, 'ROLE_ADMIN', TRUE, 'ADMIN100'),
(2, 'alex.chen@stanford.edu', '$2a$10$7R.p5u2vC9p.p5u2vC9p.eX8v1m2n3o4p5q6r7s8t9u0v1w2x3y4z', 'Alex Chen', 'Stanford University', 'Full-stack enthusiast, React + Spring Boot developer, and open-source contributor.', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', 'ADVANCED', 4.9, 28, 7, 'ROLE_USER', TRUE, 'ALEX2026'),
(3, 'priya.sharma@mit.edu', '$2a$10$7R.p5u2vC9p.p5u2vC9p.eX8v1m2n3o4p5q6r7s8t9u0v1w2x3y4z', 'Priya Sharma', 'MIT', 'AI Researcher & Data Scientist specializing in LLMs, PyTorch, and NLP.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'EXPERT', 5.0, 35, 12, 'ROLE_USER', TRUE, 'PRIYA101'),
(4, 'marcus.vance@berkeley.edu', '$2a$10$7R.p5u2vC9p.p5u2vC9p.eX8v1m2n3o4p5q6r7s8t9u0v1w2x3y4z', 'Marcus Vance', 'UC Berkeley', 'UI/UX Designer & Framer Motion wizard. Crafting pixel-perfect web experiences.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'INTERMEDIATE', 4.8, 19, 4, 'ROLE_USER', TRUE, 'MARCUS42'),
(5, 'sarah.jenkins@harvard.edu', '$2a$10$7R.p5u2vC9p.p5u2vC9p.eX8v1m2n3o4p5q6r7s8t9u0v1w2x3y4z', 'Sarah Jenkins', 'Harvard University', 'System Architecture, Docker, Kubernetes & Cloud Native DevOps practitioner.', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 'EXPERT', 4.95, 40, 21, 'ROLE_USER', TRUE, 'SARAH88');

-- 2. Insert Skills (Offered & Wanted)
INSERT INTO skills (id, user_id, title, category, description, skill_type, credit_cost, experience_level, tags, status) VALUES
(1, 2, 'Spring Boot & Microservices Mastery', 'Backend Development', 'Learn clean layered architecture, RESTful API design, Spring Security with JWT, and JPA Hibernate.', 'OFFERED', 15, 'ADVANCED', 'Java,Spring Boot,REST,JWT,MySQL', 'APPROVED'),
(2, 2, 'React.js & Modern State Management', 'Frontend Development', 'Master hooks, Context API, Tailwind CSS layout tricks, and async API integration.', 'OFFERED', 12, 'ADVANCED', 'React,Tailwind,JavaScript,Vite', 'APPROVED'),
(3, 3, 'Fine-Tuning LLMs with PyTorch & HuggingFace', 'Artificial Intelligence', 'Practical guide to LoRA, QLoRA fine-tuning, prompt engineering, and deploying custom models.', 'OFFERED', 25, 'EXPERT', 'Python,AI,PyTorch,LLMs,OpenAI', 'APPROVED'),
(4, 4, 'Startup Product UI/UX & Figma Design', 'Design & UX', 'Learn design systems, glassmorphism, responsive component hierarchy, and auto-layout in Figma.', 'OFFERED', 10, 'INTERMEDIATE', 'Figma,UI/UX,Design,Wireframing', 'APPROVED'),
(5, 5, 'Docker & Kubernetes Cloud Deployment', 'DevOps & Cloud', 'Build containerized applications, setup CI/CD pipelines on GitHub Actions, and deploy to AWS/Render.', 'OFFERED', 20, 'EXPERT', 'Docker,Kubernetes,DevOps,AWS', 'APPROVED'),
(6, 2, 'WANTED: Docker & Kubernetes Mentorship', 'DevOps & Cloud', 'Looking for an experienced mentor to guide me through k8s ingress controllers and Helm charts.', 'WANTED', 20, 'INTERMEDIATE', 'Docker,Kubernetes,Cloud', 'APPROVED'),
(7, 3, 'WANTED: UI/UX Redesign Feedback for AI Tool', 'Design & UX', 'Need a design mentor to review our Figma prototypes and improve user conversion flow.', 'WANTED', 10, 'BEGINNER', 'Figma,UI/UX,Product Design', 'APPROVED');

-- 3. Insert Wallets & Initial Balances
INSERT INTO wallets (id, user_id, balance, total_earned, total_spent) VALUES
(1, 1, 500, 200, 0),
(2, 2, 120, 85, 45),
(3, 3, 190, 150, 10),
(4, 4, 75, 40, 15),
(5, 5, 230, 200, 20);

-- 4. Insert Wallet Transactions
INSERT INTO transactions (wallet_id, amount, type, description, razorpay_payment_id) VALUES
(2, 50, 'SIGNUP_BONUS', 'Welcome to SkillSwap AI Bonus Credits', NULL),
(2, 35, 'EARNED', 'Earned from teaching Spring Boot Session #101', NULL),
(3, 100, 'PURCHASED', 'Purchased Premium Skill Credits via Razorpay', 'pay_Mz192837465'),
(4, 25, 'REFERRAL_BONUS', 'Referred user Sarah Jenkins', NULL);

-- 5. Insert Bookings
INSERT INTO bookings (id, learner_id, mentor_id, skill_id, scheduled_at, duration_minutes, status, meeting_link, credit_amount, notes) VALUES
(1, 3, 2, 1, DATE_ADD(NOW(), INTERVAL 1 DAY), 60, 'CONFIRMED', 'https://meet.jit.si/skillswap-session-spring-101', 15, 'Goal: Understand Spring Security custom JWT filter flow.'),
(2, 4, 3, 3, DATE_ADD(NOW(), INTERVAL 3 DAY), 90, 'PENDING', 'https://meet.jit.si/skillswap-session-ai-303', 25, 'Goal: Fine-tune Llama 3 model on custom JSON dataset.'),
(3, 2, 5, 5, DATE_SUB(NOW(), INTERVAL 2 DAY), 60, 'COMPLETED', 'https://meet.jit.si/skillswap-session-devops-505', 20, 'Session completed successfully! Learned Docker Compose multi-container setup.');

-- 6. Insert Reviews
INSERT INTO reviews (id, booking_id, reviewer_id, reviewee_id, rating, comment) VALUES
(1, 3, 2, 5, 5, 'Sarah is an incredible mentor! Cleared all my doubts on Docker multi-stage builds in 45 minutes.');

-- 7. Insert Certificates
INSERT INTO certificates (id, booking_id, learner_id, skill_title, mentor_name, certificate_code) VALUES
(1, 3, 2, 'Docker & Kubernetes Cloud Deployment', 'Sarah Jenkins', 'CERT-SKILLSWAP-2026-884920');

-- 8. Insert Messages
INSERT INTO messages (id, sender_id, receiver_id, booking_id, content, is_read) VALUES
(1, 3, 2, 1, 'Hi Alex! Looking forward to our Spring Boot session tomorrow.', TRUE),
(2, 2, 3, 1, 'Hey Priya! Absolutely, I have prepared code examples for JWT security setup.', TRUE);

-- 9. Insert Notifications
INSERT INTO notifications (id, user_id, title, message, type, is_read) VALUES
(1, 2, 'Session Confirmed!', 'Priya Sharma confirmed your Spring Boot Mentorship session for tomorrow.', 'BOOKING', FALSE),
(2, 2, 'Certificate Issued!', 'You earned a verified completion certificate for Docker & Kubernetes Deployment.', 'SYSTEM', TRUE);

-- 10. Insert Referrals
INSERT INTO referrals (id, referrer_id, referee_id, code, bonus_credits, status) VALUES
(1, 4, 5, 'MARCUS42', 25, 'COMPLETED');
