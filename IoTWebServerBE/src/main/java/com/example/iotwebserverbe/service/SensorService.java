package com.example.iotwebserverbe.service;

import com.example.iotwebserverbe.entity.Sensor;
import com.example.iotwebserverbe.repository.SensorRepository;
import com.example.iotwebserverbe.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    // Create or Save Sensor
    public Sensor saveSensor(Sensor reqSensor) {
        Sensor sensor = new Sensor();
        sensor.setTime(DateUtils.getCurrentDateTime());
        sensor.setName(reqSensor.getName());
        sensor.setType(reqSensor.getType());
        return sensorRepository.save(sensor);
    }

    // Get all Sensors
    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    // Get Sensor by ID
    public Optional<Sensor> getSensorById(int id) {
        return sensorRepository.findById(id);
    }

    // Delete Sensor by ID
    public void deleteSensor(int id) {
        sensorRepository.deleteById(id);
    }
}
