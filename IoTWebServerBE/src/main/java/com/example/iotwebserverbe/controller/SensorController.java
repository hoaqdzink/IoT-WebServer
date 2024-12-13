package com.example.iotwebserverbe.controller;

import com.example.iotwebserverbe.entity.Sensor;
import com.example.iotwebserverbe.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sensors")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    // Create a new Sensor
    @PostMapping
    public ResponseEntity<Sensor> createSensor(@RequestBody Sensor sensor) {
        Sensor savedSensor = sensorService.saveSensor(sensor);
        return new ResponseEntity<>(savedSensor, HttpStatus.CREATED);
    }

    // Get all Sensors
    @GetMapping
    public ResponseEntity<List<Sensor>> getAllSensors() {
        List<Sensor> sensors = sensorService.getAllSensors();
        return new ResponseEntity<>(sensors, HttpStatus.OK);
    }

    // Get Sensor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Sensor> getSensorById(@PathVariable int id) {
        Optional<Sensor> sensor = sensorService.getSensorById(id);
        return sensor.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Delete Sensor by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSensor(@PathVariable int id) {
        try {
            sensorService.deleteSensor(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
