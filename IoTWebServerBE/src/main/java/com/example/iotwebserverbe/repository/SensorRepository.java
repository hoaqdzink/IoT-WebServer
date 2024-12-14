package com.example.iotwebserverbe.repository;

import com.example.iotwebserverbe.entity.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Integer> {

    List<Sensor> findAllByNameOrderByTimeDesc(String name);
}
