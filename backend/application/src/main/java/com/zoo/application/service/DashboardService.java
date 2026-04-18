package com.zoo.application.service;

import com.zoo.application.model.DashboardResponse;
import com.zoo.application.repository.AnimalRepository;
import com.zoo.application.repository.EnclosureRepository;
import com.zoo.application.repository.FeedingScheduleRepository;
import com.zoo.application.repository.MedicalRecordRepository;
import com.zoo.application.repository.StaffRepository;
import com.zoo.application.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final AnimalRepository animalRepository;
    private final EnclosureRepository enclosureRepository;
    private final StaffRepository staffRepository;
    private final FeedingScheduleRepository feedingScheduleRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final UserRepository userRepository;

    public DashboardService(AnimalRepository animalRepository,
                            EnclosureRepository enclosureRepository,
                            StaffRepository staffRepository,
                            FeedingScheduleRepository feedingScheduleRepository,
                            MedicalRecordRepository medicalRecordRepository,
                            UserRepository userRepository) {
        this.animalRepository = animalRepository;
        this.enclosureRepository = enclosureRepository;
        this.staffRepository = staffRepository;
        this.feedingScheduleRepository = feedingScheduleRepository;
        this.medicalRecordRepository = medicalRecordRepository;
        this.userRepository = userRepository;
    }

    public DashboardResponse getDashboardCounts() {
        long totalAnimals = animalRepository.count();
        long totalEnclosures = enclosureRepository.count();
        long totalStaff = staffRepository.count();
        long totalFeedingSchedules = feedingScheduleRepository.count();
        long totalMedicalRecords = medicalRecordRepository.count();
        long totalUsers = userRepository.count();

        return new DashboardResponse(
                totalAnimals,
                totalEnclosures,
                totalStaff,
                totalFeedingSchedules,
                totalMedicalRecords,
                totalUsers
        );
    }
}