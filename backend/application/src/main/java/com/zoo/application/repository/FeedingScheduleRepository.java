package com.zoo.application.repository;

import com.zoo.application.model.FeedingSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedingScheduleRepository extends JpaRepository<FeedingSchedule, Long> {
}