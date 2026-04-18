package com.zoo.application.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Staff name is required")
    private String name;

    @NotBlank(message = "Role is required")
    private String role;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Shift is required")
    private String shift;

    @NotBlank(message = "Assigned area is required")
    private String assignedArea;

    public Staff() {
    }

    public Staff(Long id, String name, String role, String phone, String shift, String assignedArea) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.phone = phone;
        this.shift = shift;
        this.assignedArea = assignedArea;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public String getPhone() {
        return phone;
    }

    public String getShift() {
        return shift;
    }

    public String getAssignedArea() {
        return assignedArea;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setShift(String shift) {
        this.shift = shift;
    }

    public void setAssignedArea(String assignedArea) {
        this.assignedArea = assignedArea;
    }
}