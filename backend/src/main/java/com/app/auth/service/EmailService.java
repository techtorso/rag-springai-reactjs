package com.app.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	@Value("${rag.access.request.mail}")
	private String mailTo;

	@Value("${app.otp.expiry-minutes}")
	private long expiryTime;

	
	
	@Async
	public void sendPlatformAccessRequestEmail(String name, String email, String organization, String text) {

		SimpleMailMessage message = new SimpleMailMessage();

		message.setTo(mailTo);
		message.setSubject("New Platform Access Request");

		message.setText("Full Name: " + name + "\n" + "Email: " + email + "\n" + "Organization: " + organization + "\n"
				+ "Message: " + text);

		mailSender.send(message);
	}

	@Async
	public void otpMail(String email, String otp) {
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		message.setSubject("OTP Verification Code");
		message.setText(
				"Your OTP is: " + otp + "\n\n" + "It is valid for "
						+ expiryTime + "minutes.\n" + "Do not share it with anyone.");

		mailSender.send(message);
	}
}
