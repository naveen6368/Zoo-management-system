package com.zoo.application.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "animals")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Animal name is required")
    private String name;

    @NotBlank(message = "Species is required")
    private String species;

    @NotNull(message = "Age is required")
    @Min(value = 0, message = "Age cannot be negative")
    private Integer age;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Food type is required")
    private String foodType;

    @NotBlank(message = "Health status is required")
    private String healthStatus;

    @NotNull(message = "Arrival date is required")
    private LocalDate arrivalDate;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "enclosure_id")
    private Enclosure enclosure;

    public Animal() {
    }

    public Animal(Long id, String name, String species, Integer age, String gender,
                  String foodType, String healthStatus, LocalDate arrivalDate,
                  String imageUrl, Enclosure enclosure) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.age = age;
        this.gender = gender;
        this.foodType = foodType;
        this.healthStatus = healthStatus;
        this.arrivalDate = arrivalDate;
        this.imageUrl = imageUrl;
        this.enclosure = enclosure;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSpecies() {
        return species;
    }

    public Integer getAge() {
        return age;
    }

    public String getGender() {
        return gender;
    }

    public String getFoodType() {
        return foodType;
    }

    public String getHealthStatus() {
        return healthStatus;
    }

    public LocalDate getArrivalDate() {
        return arrivalDate;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Enclosure getEnclosure() {
        return enclosure;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    public void setHealthStatus(String healthStatus) {
        this.healthStatus = healthStatus;
    }

    public void setArrivalDate(LocalDate arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setEnclosure(Enclosure enclosure) {
        this.enclosure = enclosure;
    }
}