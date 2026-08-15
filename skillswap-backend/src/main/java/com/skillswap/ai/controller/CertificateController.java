package com.skillswap.ai.controller;

import com.skillswap.ai.dto.ApiResponse;
import com.skillswap.ai.security.UserDetailsImpl;
import com.skillswap.ai.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/certificates")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @GetMapping("/my-certificates")
    public ResponseEntity<ApiResponse> getMyCertificates(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(new ApiResponse(true, "User certificates", certificateService.getUserCertificates(userDetails.getId())));
    }

    @GetMapping("/verify/{code}")
    public ResponseEntity<ApiResponse> verifyCertificate(@PathVariable String code) {
        return ResponseEntity.ok(new ApiResponse(true, "Certificate Verified Successfully", certificateService.verifyCertificate(code)));
    }
}
