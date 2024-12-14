package com.example.iotwebserverbe.repository;

import com.example.iotwebserverbe.entity.Control;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ControlRepository extends JpaRepository<Control, Integer> {

    List<Control> findAllByTypeOrderByTimeDesc(String type);
}
