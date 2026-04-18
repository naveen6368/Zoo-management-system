package com.zoo.application.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "feeding_schedules")
public class FeedingSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Food name is required")
    private String foodName;

    @NotNull(message = "Feeding date is required")
    private LocalDate feedingDate;

    @NotNull(message = "Feeding time is required")
    private LocalTime feedingTime;

    @NotBlank(message = "Keeper name is required")
    private String keeperName;

    @ManyToOne
    @JoinColumn(name = "animal_id")
    @JsonIgnoreProperties({"enclosure"})
    private Animal animal;

    public FeedingSchedule() {
    }

    public FeedingSchedule(Long id, String foodName, LocalDate feedingDate,
                           LocalTime feedingTime, String keeperName, Animal animal) {
        this.id = id;
        this.foodName = foodName;
        this.feedingDate = feedingDate;
        this.feedingTime = feedingTime;
        this.keeperName = keeperName;
        this.animal = animal;
    }

    public Long getId() {
        return id;
    }

    public String getFoodName() {
        return foodName;
    }

    public LocalDate getFeedingDate() {
        return feedingDate;
    }

    public LocalTime getFeedingTime() {
        return feedingTime;
    }

    public String getKeeperName() {
        return keeperName;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public void setFeedingDate(LocalDate feedingDate) {
        this.feedingDate = feedingDate;
    }

    public void setFeedingTime(LocalTime feedingTime) {
        this.feedingTime = feedingTime;
    }

    public void setKeeperName(String keeperName) {
        this.keeperName = keeperName;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
}