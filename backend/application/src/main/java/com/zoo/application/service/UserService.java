package com.zoo.application.service;

import com.zoo.application.exception.DuplicateResourceException;
import com.zoo.application.exception.ResourceNotFoundException;
import com.zoo.application.model.LoginRequest;
import com.zoo.application.model.LoginResponse;
import com.zoo.application.model.User;
import com.zoo.application.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Email already exists");
        }

        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }

        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

        if (optionalUser.isEmpty()) {
            return new LoginResponse(
                    "FAILED",
                    null,
                    null,
                    loginRequest.getEmail(),
                    null,
                    "User not found"
            );
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return new LoginResponse(
                    "FAILED",
                    null,
                    null,
                    loginRequest.getEmail(),
                    null,
                    "Invalid password"
            );
        }

        return new LoginResponse(
                "SUCCESS",
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                "Login successful"
        );
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}