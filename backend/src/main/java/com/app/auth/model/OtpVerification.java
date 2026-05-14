package com.app.auth.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "otp_verification")
public class OtpVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    private String email;

    private String otp;

    @Column(name = "expiry_time")
    private LocalDateTime expiryTime;
    
    @Column(name = "used")
    private boolean used = false;

    
    
    
	public boolean isUsed() {
		return used;
	}

	public void setUsed(boolean used) {
		this.used = used;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public LocalDateTime getExpiryTime() {
		return expiryTime;
	}

	public void setExpiryTime(LocalDateTime expiryTime) {
		this.expiryTime = expiryTime;
	}
    
    
    
}