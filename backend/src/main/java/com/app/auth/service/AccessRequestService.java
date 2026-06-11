package com.app.auth.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.auth.dto.RegisterRequest;
import com.app.auth.exception.EmailAlreadyAvailableException;
import com.app.auth.model.AccessRequest;
import com.app.auth.model.User;
import com.app.auth.repository.PlaformAccessRequestRepository;

@Service
@Transactional
public class AccessRequestService {
	
@Autowired
private PlaformAccessRequestRepository platformAccessRepo;


@Autowired
private JavaMailSender mailSender;


@Autowired
private  EmailService emailService;


@Value("${rag.access.request.mail}")
private String requestforRagServices;


@Transactional
public Map<String, String> grantAccess(AccessRequest request) {
	
	
    if (platformAccessRepo.findByEmail(request.getEmail()).isPresent()) {
    	throw new EmailAlreadyAvailableException("Email already registered From Backend, You will  be getting the access soon!!!");
    
    }

	
	
	AccessRequest accessReq = new  AccessRequest();
	
	accessReq.setEmail(request.getEmail());
	accessReq.setFullName(request.getFullName());
	accessReq.setOrganization(request.getOrganization());
	accessReq.setText(request.getText());
	
	platformAccessRepo.save(accessReq);
	
	
	emailService.sendPlatformAccessRequestEmail(request.getFullName(), request.getEmail(), request.getOrganization(), request.getText());
		
	
	return Map.of("message", "Recieved the Request");
}

private void sendEmail(AccessRequest request) {

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(requestforRagServices);
    message.setSubject("Tech Torso RAG Access Required");
    message.setText(request.getEmail() + "requested for RAG App Application Access");
        
   

    mailSender.send(message);
}



}
