package com.zoo.application.controller;

import com.zoo.application.model.MedicalRecord;
import com.zoo.application.service.MedicalRecordService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medical-records")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    @GetMapping
    public List<MedicalRecord> getAllRecords() {
        return medicalRecordService.getAllRecords();
    }

    @PostMapping
    public MedicalRecord addRecord(@Valid @RequestBody MedicalRecord medicalRecord) {
        return medicalRecordService.addRecord(medicalRecord);
    }

    @GetMapping("/{id}")
    public Optional<MedicalRecord> getRecordById(@PathVariable Long id) {
        return medicalRecordService.getRecordById(id);
    }

    @PutMapping("/{id}")
    public MedicalRecord updateRecord(@PathVariable Long id, @Valid @RequestBody MedicalRecord medicalRecord) {
        return medicalRecordService.updateRecord(id, medicalRecord);
    }

    @DeleteMapping("/{id}")
    public String deleteRecord(@PathVariable Long id) {
        medicalRecordService.deleteRecord(id);
        return "Medical record deleted successfully";
    }
}