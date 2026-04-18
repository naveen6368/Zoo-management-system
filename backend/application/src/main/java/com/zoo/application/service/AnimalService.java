package com.zoo.application.service;

import com.zoo.application.exception.ResourceNotFoundException;
import com.zoo.application.model.Animal;
import com.zoo.application.repository.AnimalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

    private final AnimalRepository animalRepository;

    public AnimalService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public Animal addAnimal(Animal animal) {
        return animalRepository.save(animal);
    }

    public Optional<Animal> getAnimalById(Long id) {
        return animalRepository.findById(id);
    }

    public Animal updateAnimal(Long id, Animal updatedAnimal) {
        return animalRepository.findById(id).map(animal -> {
            animal.setName(updatedAnimal.getName());
            animal.setSpecies(updatedAnimal.getSpecies());
            animal.setAge(updatedAnimal.getAge());
            animal.setGender(updatedAnimal.getGender());
            animal.setFoodType(updatedAnimal.getFoodType());
            animal.setHealthStatus(updatedAnimal.getHealthStatus());
            animal.setArrivalDate(updatedAnimal.getArrivalDate());
            animal.setImageUrl(updatedAnimal.getImageUrl());
            animal.setEnclosure(updatedAnimal.getEnclosure());
            return animalRepository.save(animal);
        }).orElseThrow(() -> new ResourceNotFoundException("Animal not found with id: " + id));
    }

    public void deleteAnimal(Long id) {
        if (!animalRepository.existsById(id)) {
            throw new ResourceNotFoundException("Animal not found with id: " + id);
        }
        animalRepository.deleteById(id);
    }
}