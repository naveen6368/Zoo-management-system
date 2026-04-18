package com.zoo.application.controller;

import com.zoo.application.model.FeedingSchedule;
import com.zoo.application.service.FeedingScheduleService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feeding-schedules")
public class FeedingScheduleController {

    private final FeedingScheduleService feedingScheduleService;

    public FeedingScheduleController(FeedingScheduleService feedingScheduleService) {
        this.feedingScheduleService = feedingScheduleService;
    }

    @GetMapping
    public List<FeedingSchedule> getAllSchedules() {
        return feedingScheduleService.getAllSchedules();
    }

    @PostMapping
    public FeedingSchedule addSchedule(@Valid @RequestBody FeedingSchedule feedingSchedule) {
        return feedingScheduleService.addSchedule(feedingSchedule);
    }

    @GetMapping("/{id}")
    public Optional<FeedingSchedule> getScheduleById(@PathVariable Long id) {
        return feedingScheduleService.getScheduleById(id);
    }

    @PutMapping("/{id}")
    public FeedingSchedule updateSchedule(@PathVariable Long id, @Valid @RequestBody FeedingSchedule feedingSchedule) {
        return feedingScheduleService.updateSchedule(id, feedingSchedule);
    }

    @DeleteMapping("/{id}")
    public String deleteSchedule(@PathVariable Long id) {
        feedingScheduleService.deleteSchedule(id);
        return "Feeding schedule deleted successfully";
    }
}