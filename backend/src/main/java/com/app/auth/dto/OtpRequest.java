package com.app.auth.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class OtpRequest {
    
	@Column(unique = true)
	private String email;
	
	
	
    private String otp;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
    
    
}