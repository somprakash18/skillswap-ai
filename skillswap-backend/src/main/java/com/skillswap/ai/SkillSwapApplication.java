package com.skillswap.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SkillSwapApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillSwapApplication.class, args);
        System.out.println("\n=======================================================");
        System.out.println("🚀 SkillSwap AI Backend Service is Running!");
        System.out.println("🌐 REST API URL: http://localhost:8080/api");
        System.out.println("📚 Swagger Docs: http://localhost:8080/api/swagger-ui.html");
        System.out.println("=======================================================\n");
    }
}
