package com.zoo.application.controller;

import com.zoo.application.model.Animal;
import com.zoo.application.service.AnimalService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/animals")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalService.getAllAnimals();
    }

    @PostMapping
    public Animal addAnimal(@Valid @RequestBody Animal animal) {
        return animalService.addAnimal(animal);
    }

    @GetMapping("/{id}")
    public Optional<Animal> getAnimalById(@PathVariable Long id) {
        return animalService.getAnimalById(id);
    }

    @PutMapping("/{id}")
    public Animal updateAnimal(@PathVariable Long id, @Valid @RequestBody Animal animal) {
        return animalService.updateAnimal(id, animal);
    }

    @DeleteMapping("/{id}")
    public String deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimal(id);
        return "Animal deleted successfully";
    }
}