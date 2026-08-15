package com.skillswap.ai.controller;

import com.skillswap.ai.dto.ApiResponse;
import com.skillswap.ai.dto.BookingRequest;
import com.skillswap.ai.entity.Booking;
import com.skillswap.ai.entity.enums.BookingStatus;
import com.skillswap.ai.security.UserDetailsImpl;
import com.skillswap.ai.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse> createBooking(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                       @Valid @RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(userDetails.getId(), request);
        return ResponseEntity.ok(new ApiResponse(true, "Booking request created successfully!", booking));
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<ApiResponse> getMyBookings(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(new ApiResponse(true, "Fetched bookings", bookingService.getUserBookings(userDetails.getId())));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse> updateStatus(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                     @PathVariable Long id,
                                                     @RequestParam BookingStatus status) {
        Booking updated = bookingService.updateBookingStatus(userDetails.getId(), id, status);
        return ResponseEntity.ok(new ApiResponse(true, "Booking status updated to " + status, updated));
    }
}
