package com.zoo.application.controller;

import com.zoo.application.model.Staff;
import com.zoo.application.service.StaffService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/staff")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    @PostMapping
    public Staff addStaff(@Valid @RequestBody Staff staff) {
        return staffService.addStaff(staff);
    }

    @GetMapping("/{id}")
    public Optional<Staff> getStaffById(@PathVariable Long id) {
        return staffService.getStaffById(id);
    }

    @PutMapping("/{id}")
    public Staff updateStaff(@PathVariable Long id, @Valid @RequestBody Staff staff) {
        return staffService.updateStaff(id, staff);
    }

    @DeleteMapping("/{id}")
    public String deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
        return "Staff deleted successfully";
    }
}