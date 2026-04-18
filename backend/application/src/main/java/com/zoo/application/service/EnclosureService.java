package com.zoo.application.service;

import com.zoo.application.exception.ResourceNotFoundException;
import com.zoo.application.model.Enclosure;
import com.zoo.application.repository.EnclosureRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnclosureService {

    private final EnclosureRepository enclosureRepository;

    public EnclosureService(EnclosureRepository enclosureRepository) {
        this.enclosureRepository = enclosureRepository;
    }

    public List<Enclosure> getAllEnclosures() {
        return enclosureRepository.findAll();
    }

    public Enclosure addEnclosure(Enclosure enclosure) {
        return enclosureRepository.save(enclosure);
    }

    public Optional<Enclosure> getEnclosureById(Long id) {
        return enclosureRepository.findById(id);
    }

    public Enclosure updateEnclosure(Long id, Enclosure updatedEnclosure) {
        return enclosureRepository.findById(id).map(enclosure -> {
            enclosure.setName(updatedEnclosure.getName());
            enclosure.setType(updatedEnclosure.getType());
            enclosure.setCapacity(updatedEnclosure.getCapacity());
            enclosure.setLocation(updatedEnclosure.getLocation());
            enclosure.setStatus(updatedEnclosure.getStatus());
            return enclosureRepository.save(enclosure);
        }).orElseThrow(() -> new ResourceNotFoundException("Enclosure not found with id: " + id));
    }

    public void deleteEnclosure(Long id) {
        if (!enclosureRepository.existsById(id)) {
            throw new ResourceNotFoundException("Enclosure not found with id: " + id);
        }
        enclosureRepository.deleteById(id);
    }
}