package com.zoo.application.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Disease is required")
    private String disease;

    @NotBlank(message = "Treatment is required")
    private String treatment;

    @NotBlank(message = "Doctor name is required")
    private String doctorName;

    @NotNull(message = "Checkup date is required")
    private LocalDate checkupDate;

    @NotBlank(message = "Health status is required")
    private String healthStatus;

    @ManyToOne
    @JoinColumn(name = "animal_id")
    @JsonIgnoreProperties({"enclosure"})
    private Animal animal;

    public MedicalRecord() {
    }

    public MedicalRecord(Long id, String disease, String treatment,
                         String doctorName, LocalDate checkupDate,
                         String healthStatus, Animal animal) {
        this.id = id;
        this.disease = disease;
        this.treatment = treatment;
        this.doctorName = doctorName;
        this.checkupDate = checkupDate;
        this.healthStatus = healthStatus;
        this.animal = animal;
    }

    public Long getId() {
        return id;
    }

    public String getDisease() {
        return disease;
    }

    public String getTreatment() {
        return treatment;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public LocalDate getCheckupDate() {
        return checkupDate;
    }

    public String getHealthStatus() {
        return healthStatus;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public void setCheckupDate(LocalDate checkupDate) {
        this.checkupDate = checkupDate;
    }

    public void setHealthStatus(String healthStatus) {
        this.healthStatus = healthStatus;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
}