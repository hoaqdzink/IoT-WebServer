package com.example.iotwebserverbe.repository;

import com.example.iotwebserverbe.entity.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Integer> {
}
