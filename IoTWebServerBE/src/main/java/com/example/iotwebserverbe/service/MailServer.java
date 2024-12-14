package com.example.iotwebserverbe.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class MailServer {
    @Autowired
    private JavaMailSender emailSender; // Bean của Spring

    public void sendSimpleMessage(String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("vinhnh.2312@gmail.com"); // Email người gửi
        message.setTo("vinh.nguyenbk7979@hcmut.edu.vn");   // Email người nhận
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message); // Gửi email qua JavaMailSender
    }

}
