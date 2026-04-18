package com.zoo.application.controller;

import com.zoo.application.model.Enclosure;
import com.zoo.application.service.EnclosureService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/enclosures")
public class EnclosureController {

    private final EnclosureService enclosureService;

    public EnclosureController(EnclosureService enclosureService) {
        this.enclosureService = enclosureService;
    }

    @GetMapping
    public List<Enclosure> getAllEnclosures() {
        return enclosureService.getAllEnclosures();
    }

    @PostMapping
    public Enclosure addEnclosure(@Valid @RequestBody Enclosure enclosure) {
        return enclosureService.addEnclosure(enclosure);
    }

    @GetMapping("/{id}")
    public Optional<Enclosure> getEnclosureById(@PathVariable Long id) {
        return enclosureService.getEnclosureById(id);
    }

    @PutMapping("/{id}")
    public Enclosure updateEnclosure(@PathVariable Long id, @Valid @RequestBody Enclosure enclosure) {
        return enclosureService.updateEnclosure(id, enclosure);
    }

    @DeleteMapping("/{id}")
    public String deleteEnclosure(@PathVariable Long id) {
        enclosureService.deleteEnclosure(id);
        return "Enclosure deleted successfully";
    }
}