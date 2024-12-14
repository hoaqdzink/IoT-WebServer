package com.example.iotwebserverbe.service;

import com.example.iotwebserverbe.entity.Sensor;
import com.example.iotwebserverbe.repository.SensorRepository;
import com.example.iotwebserverbe.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private MailServer mailServer;


    // Create or Save Sensor
    public Sensor saveSensor(Sensor reqSensor) {
        Sensor sensor = new Sensor();
        sensor.setTime(DateUtils.getCurrentDateTime());
        sensor.setName(reqSensor.getName());
        sensor.setType(reqSensor.getType());

        if(sensor.getName().equals("humidity") && Integer.parseInt(sensor.getType()) <= 50){
            String WARNING_EMAIL_SUBJECT = "Cảnh báo độ ẩm thấp";
            String WARNING_EMAIL_TEMPLATE = "Cảnh báo: Độ ẩm không khí đã giảm dưới 50%. Hiện tại độ ẩm đo được là: " + sensor.getType() + "%";
            mailServer.sendSimpleMessage(WARNING_EMAIL_SUBJECT, WARNING_EMAIL_TEMPLATE);
        }

        return sensorRepository.save(sensor);
    }

    public List<Sensor> getSensorsByName(String name) {
        List<Sensor> sensors = sensorRepository.findAllByNameOrderByTimeDesc(name);

        return sensors.stream()
                .collect(Collectors.groupingBy(
                        Sensor::getTime,
                        LinkedHashMap::new,
                        Collectors.toList()
                ))
                .values()
                .stream()
                .map(group -> group.get(0))
                .limit(12)
                .collect(Collectors.toList());
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
