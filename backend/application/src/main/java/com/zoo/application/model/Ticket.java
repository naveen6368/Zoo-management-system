package com.zoo.application.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Visitor name is required")
    private String visitorName;

    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotNull(message = "Visit date is required")
    private LocalDate visitDate;

    @NotNull(message = "Adults count is required")
    @Min(value = 1, message = "At least 1 adult is required")
    private Integer adults;

    @NotNull(message = "Children count is required")
    @Min(value = 0, message = "Children cannot be negative")
    private Integer children;

    private Double totalAmount;

    private String status;

    public Ticket() {
    }

    public Ticket(Long id, String visitorName, String email, String phone,
                  LocalDate visitDate, Integer adults, Integer children,
                  Double totalAmount, String status) {
        this.id = id;
        this.visitorName = visitorName;
        this.email = email;
        this.phone = phone;
        this.visitDate = visitDate;
        this.adults = adults;
        this.children = children;
        this.totalAmount = totalAmount;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getVisitorName() {
        return visitorName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public Integer getAdults() {
        return adults;
    }

    public Integer getChildren() {
        return children;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setVisitorName(String visitorName) {
        this.visitorName = visitorName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public void setAdults(Integer adults) {
        this.adults = adults;
    }

    public void setChildren(Integer children) {
        this.children = children;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}