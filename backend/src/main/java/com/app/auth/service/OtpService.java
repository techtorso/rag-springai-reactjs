package com.app.auth.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.app.auth.model.OtpVerification;

import com.app.auth.repository.OtpRepository;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class OtpService {
	
	@Autowired
	private  OtpRepository otpRepository;
	

	
	@Autowired
	private JavaMailSender mailSender;
	
	public void generateAndSendOtp(String email) {

	    String otp = String.valueOf(new Random().nextInt(900000) + 100000);

	    OtpVerification entity = new OtpVerification();
	    entity.setEmail(email);
	    entity.setOtp(otp);
	    entity.setExpiryTime(LocalDateTime.now().plusMinutes(30));
	    entity.setUsed(false);

	    otpRepository.save(entity);

	    sendEmail(email, otp);

}
	

	private void sendEmail(String email, String otp) {

	    SimpleMailMessage message = new SimpleMailMessage();
	    message.setTo(email);
	    message.setSubject("OTP Verification Code");
	    message.setText(
	        "Your OTP is: " + otp + "\n\n" +
	        "It is valid for 5 minutes.\n" +
	        "Do not share it with anyone."
	    );

	    mailSender.send(message);
	}

}