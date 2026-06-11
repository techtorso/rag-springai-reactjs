package com.app.auth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.auth.model.AccessRequest;
import com.app.auth.service.AccessRequestService;

import jakarta.validation.Valid;

@RestController
public class PlatformAccessRequestController {
	
	@Autowired
	private AccessRequestService accessRequestSerivce;
	
	@PostMapping("/api/public/access-request")
	public ResponseEntity<Map<String,String>> requestAccess(
			 @Valid @RequestBody AccessRequest dto) {

		
	    Map<String, String>  saved = accessRequestSerivce.grantAccess(dto);

//	    emailService.sendAccessRequestEmail(saved);

	    return ResponseEntity.ok( 
	        Map.of("message",
	        		 "Your access request has been submitted successfully.")
	    );
	}

//	@Autowired
//	private AccessRequestService accessRequestSerivce;
//
//	@PostMapping("/api/public/access-request")
//	public String userActivation(@RequestBody AccessRequest request) {
//		return 		accessRequestSerivce.grantAccess(request);
//	}

}
