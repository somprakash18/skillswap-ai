package com.skillswap.ai.service;

import com.skillswap.ai.dto.AIInterviewRequest;
import com.skillswap.ai.dto.AIMatchRequest;
import com.skillswap.ai.dto.AIRoadmapRequest;
import com.skillswap.ai.entity.Skill;
import com.skillswap.ai.entity.User;
import com.skillswap.ai.repository.SkillRepository;
import com.skillswap.ai.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIService {

    private static final Logger logger = LoggerFactory.getLogger(AIService.class);

    @Value("${app.openai.apiKey}")
    private String openAiApiKey;

    @Value("${app.openai.model:gpt-3.5-turbo}")
    private String openAiModel;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> generateRoadmap(AIRoadmapRequest request) {
        String skill = request.getSkillTitle() != null ? request.getSkillTitle() : "Software Development";
        String goal = request.getTargetGoal() != null ? request.getTargetGoal() : "Build production-grade projects";
        String level = request.getExperienceLevel() != null ? request.getExperienceLevel() : "Intermediate";

        if (openAiApiKey != null && !openAiApiKey.contains("demo-mock")) {
            try {
                String prompt = String.format("Create a 4-week structured learning roadmap for learning '%s'. Goal: '%s'. Level: '%s'. Return JSON with 'title', 'estimatedWeeks', and 'modules' array with 'week', 'topic', 'objectives', 'project'.", skill, goal, level);
                String openAiResponse = callOpenAiApi(prompt);
                if (openAiResponse != null) {
                    Map<String, Object> res = new HashMap<>();
                    res.put("skillTitle", skill);
                    res.put("aiGenerated", true);
                    res.put("roadmap", openAiResponse);
                    return res;
                }
            } catch (Exception e) {
                logger.warn("OpenAI API call failed, falling back to local AI engine: {}", e.getMessage());
            }
        }

        // Smart Local AI Engine Fallback
        Map<String, Object> roadmap = new HashMap<>();
        roadmap.put("skillTitle", skill);
        roadmap.put("targetGoal", goal);
        roadmap.put("experienceLevel", level);
        roadmap.put("estimatedTime", "4 Weeks (3-5 hrs/week)");
        roadmap.put("aiGenerated", true);

        List<Map<String, Object>> modules = new ArrayList<>();

        Map<String, Object> m1 = new HashMap<>();
        m1.put("week", 1);
        m1.put("title", "Core Foundations & Mental Models of " + skill);
        m1.put("topics", List.of("Syntax & Fundamentals", "Environment Setup & CLI Tools", "Architectural Best Practices"));
        m1.put("milestone", "Build a baseline starter application");
        modules.add(m1);

        Map<String, Object> m2 = new HashMap<>();
        m2.put("week", 2);
        m2.put("title", "Intermediate Concepts & Integration");
        m2.put("topics", List.of("Async operations & State", "API Interoperability", "Error Handling & Validation"));
        m2.put("milestone", "Implement full CRUD functionality with DB persistence");
        modules.add(m2);

        Map<String, Object> m3 = new HashMap<>();
        m3.put("week", 3);
        m3.put("title", "Advanced Optimization & Security");
        m3.put("topics", List.of("Security & Authentication Flow", "Performance Tuning & Caching", "Automated Testing"));
        m3.put("milestone", "Write comprehensive unit & integration test suites");
        modules.add(m3);

        Map<String, Object> m4 = new HashMap<>();
        m4.put("week", 4);
        m4.put("title", "Production Deployment & Portfolio Showcase");
        m4.put("topics", List.of("CI/CD Pipeline Setup", "Containerization & Cloud Hosting", "Performance Auditing & SEO"));
        m4.put("milestone", "Deploy live production app to cloud provider");
        modules.add(m4);

        roadmap.put("modules", modules);
        return roadmap;
    }

    public List<Map<String, Object>> matchMentors(AIMatchRequest request) {
        String query = request.getWantedSkill() != null ? request.getWantedSkill() : "";
        List<Skill> matchingSkills = skillRepository.searchSkills(query);

        if (matchingSkills.isEmpty()) {
            matchingSkills = skillRepository.findByStatus("APPROVED");
        }

        List<Map<String, Object>> matches = new ArrayList<>();
        for (Skill s : matchingSkills) {
            User mentor = s.getUser();
            Map<String, Object> m = new HashMap<>();
            m.put("mentorId", mentor.getId());
            m.put("mentorName", mentor.getFullName());
            m.put("college", mentor.getCollege());
            m.put("avatarUrl", mentor.getAvatarUrl());
            m.put("rating", mentor.getRating());
            m.put("skillId", s.getId());
            m.put("skillTitle", s.getTitle());
            m.put("creditCost", s.getCreditCost());
            m.put("matchScore", Math.min(99, (int)(85 + (mentor.getRating() * 2.5))));
            m.put("aiReason", "High compatibility match for '" + query + "' based on mentor rating (" + mentor.getRating() + "/5) and experience level.");
            matches.add(m);

            if (matches.size() >= 5) break;
        }

        return matches;
    }

    public Map<String, Object> generateInterviewQuestions(AIInterviewRequest request) {
        String skill = request.getSkillTitle() != null ? request.getSkillTitle() : "Full Stack Web Development";
        String level = request.getExperienceLevel() != null ? request.getExperienceLevel() : "Intermediate";

        Map<String, Object> response = new HashMap<>();
        response.put("skillTitle", skill);
        response.put("experienceLevel", level);

        List<Map<String, String>> questions = new ArrayList<>();

        Map<String, String> q1 = new HashMap<>();
        q1.put("id", "Q1");
        q1.put("question", "What are the key architectural trade-offs when designing APIs for " + skill + "?");
        q1.put("hint", "Discuss REST vs GraphQL, statelessness, caching strategies, and payload optimization.");
        q1.put("difficulty", "Hard");
        questions.add(q1);

        Map<String, String> q2 = new HashMap<>();
        q2.put("id", "Q2");
        q2.put("question", "How do you handle error boundaries and transaction rollbacks in production " + skill + "?");
        q2.put("hint", "Focus on transactional isolation, global exception handlers, and idempotent retries.");
        q2.put("difficulty", "Medium");
        questions.add(q2);

        Map<String, String> q3 = new HashMap<>();
        q3.put("id", "Q3");
        q3.put("question", "Explain the lifecycle and security mechanisms used when authenticating requests in " + skill + ".");
        q3.put("hint", "Cover JWT signing algorithms, token expiration, refresh tokens, and CORS protection.");
        q3.put("difficulty", "Medium");
        questions.add(q3);

        response.put("questions", questions);
        return response;
    }

    private String callOpenAiApi(String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(openAiApiKey);

            Map<String, Object> body = new HashMap<>();
            body.put("model", openAiModel);
            body.put("messages", List.of(
                    Map.of("role", "system", "content", "You are an expert technical mentor AI."),
                    Map.of("role", "user", "content", prompt)
            ));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity("https://api.openai.com/v1/chat/completions", entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                List choices = (List) response.getBody().get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map choice = (Map) choices.get(0);
                    Map message = (Map) choice.get("message");
                    return (String) message.get("content");
                }
            }
        } catch (Exception e) {
            logger.error("Error executing OpenAI API: {}", e.getMessage());
        }
        return null;
    }
}
