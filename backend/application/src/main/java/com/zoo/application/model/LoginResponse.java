package com.zoo.application.model;

public class LoginResponse {

    private String status;
    private Long id;
    private String username;
    private String email;
    private String role;
    private String message;

    public LoginResponse() {
    }

    public LoginResponse(String status, Long id, String username, String email, String role, String message) {
        this.status = status;
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getMessage() {
        return message;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}