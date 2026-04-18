package com.zoo.application.service;

import com.zoo.application.exception.ResourceNotFoundException;
import com.zoo.application.model.MedicalRecord;
import com.zoo.application.repository.MedicalRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;

    public MedicalRecordService(MedicalRecordRepository medicalRecordRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
    }

    public List<MedicalRecord> getAllRecords() {
        return medicalRecordRepository.findAll();
    }

    public MedicalRecord addRecord(MedicalRecord medicalRecord) {
        return medicalRecordRepository.save(medicalRecord);
    }

    public Optional<MedicalRecord> getRecordById(Long id) {
        return medicalRecordRepository.findById(id);
    }

    public MedicalRecord updateRecord(Long id, MedicalRecord updatedRecord) {
    return medicalRecordRepository.findById(id).map(record -> {
        record.setDisease(updatedRecord.getDisease());
        record.setTreatment(updatedRecord.getTreatment());
        record.setDoctorName(updatedRecord.getDoctorName());
        record.setCheckupDate(updatedRecord.getCheckupDate());
        record.setHealthStatus(updatedRecord.getHealthStatus());
        record.setAnimal(updatedRecord.getAnimal());
        return medicalRecordRepository.save(record);
    }).orElseThrow(() -> new ResourceNotFoundException("Medical record not found with id: " + id));
}

    public void deleteRecord(Long id) {
        if (!medicalRecordRepository.existsById(id)) {
            throw new ResourceNotFoundException("Medical record not found with id: " + id);
        }
        medicalRecordRepository.deleteById(id);
    }
}