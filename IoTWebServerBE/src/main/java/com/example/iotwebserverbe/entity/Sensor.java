package com.example.iotwebserverbe.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="sensor")
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @Column
    private Date time;

    @Column
    private String type;

    public Sensor(int id, String name, Date time, String type) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.type = type;
    }
    public Sensor() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
