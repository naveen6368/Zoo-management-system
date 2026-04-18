package com.zoo.application.model;

public class DashboardResponse {

    private long totalAnimals;
    private long totalEnclosures;
    private long totalStaff;
    private long totalFeedingSchedules;
    private long totalMedicalRecords;
    private long totalUsers;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalAnimals, long totalEnclosures, long totalStaff,
                             long totalFeedingSchedules, long totalMedicalRecords, long totalUsers) {
        this.totalAnimals = totalAnimals;
        this.totalEnclosures = totalEnclosures;
        this.totalStaff = totalStaff;
        this.totalFeedingSchedules = totalFeedingSchedules;
        this.totalMedicalRecords = totalMedicalRecords;
        this.totalUsers = totalUsers;
    }

    public long getTotalAnimals() {
        return totalAnimals;
    }

    public void setTotalAnimals(long totalAnimals) {
        this.totalAnimals = totalAnimals;
    }

    public long getTotalEnclosures() {
        return totalEnclosures;
    }

    public void setTotalEnclosures(long totalEnclosures) {
        this.totalEnclosures = totalEnclosures;
    }

    public long getTotalStaff() {
        return totalStaff;
    }

    public void setTotalStaff(long totalStaff) {
        this.totalStaff = totalStaff;
    }

    public long getTotalFeedingSchedules() {
        return totalFeedingSchedules;
    }

    public void setTotalFeedingSchedules(long totalFeedingSchedules) {
        this.totalFeedingSchedules = totalFeedingSchedules;
    }

    public long getTotalMedicalRecords() {
        return totalMedicalRecords;
    }

    public void setTotalMedicalRecords(long totalMedicalRecords) {
        this.totalMedicalRecords = totalMedicalRecords;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }
}