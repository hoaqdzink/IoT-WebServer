package com.example.iotwebserverbe.controller;

import com.example.iotwebserverbe.entity.Control;
import com.example.iotwebserverbe.service.ControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/controls")
public class ControlController {

    @Autowired
    private ControlService controlService;

    // Create a new Control
    @PostMapping
    public ResponseEntity<Control> createControl(@RequestBody Control control) {
        Control savedControl = controlService.saveControl(control);
        return new ResponseEntity<>(savedControl, HttpStatus.CREATED);
    }

    // Get all Controls
    @GetMapping
    public ResponseEntity<List<Control>> getAllControls() {
        List<Control> controls = controlService.getAllControls();
        return new ResponseEntity<>(controls, HttpStatus.OK);
    }

    // Get Control by ID
    @GetMapping("/{id}")
    public ResponseEntity<Control> getControlById(@PathVariable int id) {
        Optional<Control> control = controlService.getControlById(id);
        return control.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/name/{type}")
    public List<Control> getControls(@PathVariable String type) {
        return controlService.getControlsByType(type);
    }

    // Update Control by ID
    @PutMapping("/{id}")
    public ResponseEntity<Control> updateControl(@PathVariable int id, @RequestBody Control updatedControl) {
        try {
            Control control = controlService.updateControl(id, updatedControl);
            return new ResponseEntity<>(control, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete Control by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteControl(@PathVariable int id) {
        try {
            controlService.deleteControl(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
