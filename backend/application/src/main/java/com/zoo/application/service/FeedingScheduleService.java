package com.zoo.application.service;

import com.zoo.application.exception.ResourceNotFoundException;
import com.zoo.application.model.FeedingSchedule;
import com.zoo.application.repository.FeedingScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedingScheduleService {

    private final FeedingScheduleRepository feedingScheduleRepository;

    public FeedingScheduleService(FeedingScheduleRepository feedingScheduleRepository) {
        this.feedingScheduleRepository = feedingScheduleRepository;
    }

    public List<FeedingSchedule> getAllSchedules() {
        return feedingScheduleRepository.findAll();
    }

    public FeedingSchedule addSchedule(FeedingSchedule feedingSchedule) {
        return feedingScheduleRepository.save(feedingSchedule);
    }

    public Optional<FeedingSchedule> getScheduleById(Long id) {
        return feedingScheduleRepository.findById(id);
    }

    public FeedingSchedule updateSchedule(Long id, FeedingSchedule updatedSchedule) {
    return feedingScheduleRepository.findById(id).map(schedule -> {
        schedule.setFoodName(updatedSchedule.getFoodName());
        schedule.setFeedingDate(updatedSchedule.getFeedingDate());
        schedule.setFeedingTime(updatedSchedule.getFeedingTime());
        schedule.setKeeperName(updatedSchedule.getKeeperName());
        schedule.setAnimal(updatedSchedule.getAnimal());
        return feedingScheduleRepository.save(schedule);
    }).orElseThrow(() -> new ResourceNotFoundException("Feeding schedule not found with id: " + id));
}

    public void deleteSchedule(Long id) {
        if (!feedingScheduleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Feeding schedule not found with id: " + id);
        }
        feedingScheduleRepository.deleteById(id);
    }
}