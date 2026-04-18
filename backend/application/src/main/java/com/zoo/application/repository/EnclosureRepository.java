package com.zoo.application.repository;

import com.zoo.application.model.Enclosure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnclosureRepository extends JpaRepository<Enclosure, Long> {
}