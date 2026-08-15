package com.skillswap.ai.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class RazorpayOrderRequest {

    @NotNull(message = "Credits count is required")
    @Min(value = 10, message = "Minimum purchase is 10 credits")
    private Integer credits;

    @NotNull(message = "Amount in INR is required")
    private Double amountInInr;

    public RazorpayOrderRequest() {}

    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }

    public Double getAmountInInr() { return amountInInr; }
    public void setAmountInInr(Double amountInInr) { this.amountInInr = amountInInr; }
}
