package com.skillswap.ai.controller;

import com.skillswap.ai.dto.ApiResponse;
import com.skillswap.ai.dto.ReviewRequest;
import com.skillswap.ai.entity.Booking;
import com.skillswap.ai.entity.Review;
import com.skillswap.ai.entity.User;
import com.skillswap.ai.repository.BookingRepository;
import com.skillswap.ai.repository.ReviewRepository;
import com.skillswap.ai.repository.UserRepository;
import com.skillswap.ai.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ApiResponse> createReview(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                     @Valid @RequestBody ReviewRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId()).orElseThrow();
        User reviewer = userRepository.findById(userDetails.getId()).orElseThrow();
        User reviewee = booking.getMentor().getId().equals(reviewer.getId()) ? booking.getLearner() : booking.getMentor();

        Review review = new Review();
        review.setBooking(booking);
        review.setReviewer(reviewer);
        review.setReviewee(reviewee);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review saved = reviewRepository.save(review);

        // Update reviewee average rating
        double newRating = (reviewee.getRating() * reviewee.getReviewCount() + request.getRating()) / (reviewee.getReviewCount() + 1);
        reviewee.setRating(Math.round(newRating * 100.0) / 100.0);
        reviewee.setReviewCount(reviewee.getReviewCount() + 1);
        userRepository.save(reviewee);

        return ResponseEntity.ok(new ApiResponse(true, "Review submitted successfully!", saved));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getUserReviews(@PathVariable Long userId) {
        return ResponseEntity.ok(new ApiResponse(true, "User reviews", reviewRepository.findByRevieweeIdOrderByCreatedAtDesc(userId)));
    }
}
