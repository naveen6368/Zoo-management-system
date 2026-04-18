package com.zoo.application.service;

import com.zoo.application.exception.ResourceNotFoundException;
import com.zoo.application.model.Staff;
import com.zoo.application.repository.StaffRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff addStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public Optional<Staff> getStaffById(Long id) {
        return staffRepository.findById(id);
    }

    public Staff updateStaff(Long id, Staff updatedStaff) {
        return staffRepository.findById(id).map(staff -> {
            staff.setName(updatedStaff.getName());
            staff.setRole(updatedStaff.getRole());
            staff.setPhone(updatedStaff.getPhone());
            staff.setShift(updatedStaff.getShift());
            staff.setAssignedArea(updatedStaff.getAssignedArea());
            return staffRepository.save(staff);
        }).orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));
    }

    public void deleteStaff(Long id) {
        if (!staffRepository.existsById(id)) {
            throw new ResourceNotFoundException("Staff not found with id: " + id);
        }
        staffRepository.deleteById(id);
    }
}