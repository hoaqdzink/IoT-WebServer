package com.example.iotwebserverbe.service;


import com.example.iotwebserverbe.entity.Control;
import com.example.iotwebserverbe.repository.ControlRepository;
import com.example.iotwebserverbe.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ControlService {

    @Autowired
    private ControlRepository controlRepository;

    // Create or Save Control
    public Control saveControl(Control request) {
        Control control = new Control();
        control.setTime(DateUtils.getCurrentDateTime());
        control.setType(request.getType());
        control.setStatus(request.getStatus());
        return controlRepository.save(control);
    }

    // Get all Controls
    public List<Control> getAllControls() {
        return controlRepository.findAll();
    }

    // Get Control by ID
    public Optional<Control> getControlById(int id) {
        return controlRepository.findById(id);
    }

    // Update Control
    public Control updateControl(int id, Control updatedControl) {
        return controlRepository.findById(id).map(control -> {
            control.setTime(updatedControl.getTime());
            control.setStatus(updatedControl.getStatus());
            control.setType(updatedControl.getType());
            return controlRepository.save(control);
        }).orElseThrow(() -> new RuntimeException("Control not found with id: " + id));
    }

    // Delete Control by ID
    public void deleteControl(int id) {
        controlRepository.deleteById(id);
    }
}
