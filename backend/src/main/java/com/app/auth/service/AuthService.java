package com.app.auth.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.auth.dto.LoginRequest;
import com.app.auth.dto.OtpRequest;
import com.app.auth.dto.RegisterRequest;
import com.app.auth.model.OtpVerification;
import com.app.auth.model.Role;
import com.app.auth.model.User;
import com.app.auth.repository.OtpRepository;
import com.app.auth.repository.UserRepository;


import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private OtpService otpService;

    
    
    public UserRepository getUserRepository() {
		return userRepository;
	}

	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public OtpRepository getOtpRepository() {
		return otpRepository;
	}

	public void setOtpRepository(OtpRepository otpRepository) {
		this.otpRepository = otpRepository;
	}

	public JwtUtil getJwtUtil() {
		return jwtUtil;
	}

	public void setJwtUtil(JwtUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	// REGISTER
	@Transactional
	public Map<String, String> register(RegisterRequest req) {

	    if (userRepository.findByEmail(req.getEmail()).isPresent()) {
//	        throw new RuntimeException("Email already registered");
	        return Map.of("message", "Email already registered");
	    }
	    
//	    System.out.println("Password :  "+ req.getPassword());
//	    System.out.println("Confirm Password: "+ req.getComfirmPassword());
	    

	    if (!req.getPassword()
                .equals(req.getComfirmPassword())) {
	    	return Map.of("message", "Passwords do not match");
            
        }
	    
	    
	    
	    
	    otpService.generateAndSendOtp(req.getEmail());

	    User user = new User();
	    user.setEmail(req.getEmail());
	    user.setPassword(passwordEncoder.encode(req.getPassword()));
	    user.setRole(Role.USER);
	    user.setEmailVerified(false);

	    userRepository.save(user);

	    return Map.of("message", "REGISTRATION_OTP_SENT");
	}
    // LOGIN STEP 1 (Generate OTP)
    public String login(LoginRequest req) {

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate OTP
        String otp = String.valueOf((int)(Math.random() * 900000) + 100000);

        otpRepository.deleteByEmail(req.getEmail());
        
        OtpVerification otpEntity = new OtpVerification();
        otpEntity.setEmail(user.getEmail());
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        
        
        otpRepository.save(otpEntity);

        // TODO: send email (JavaMailSender)

        return "OTP sent to email";
    }

    // VERIFY OTP (LOGIN STEP 2)
    public String verifyOtp(OtpRequest req) {

        OtpVerification otp = otpRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (!otp.getOtp().equals(req.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        


        return jwtUtil.generateToken(user.getEmail(), user.getRole().name());
    }
    
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }   
    public boolean validatePassword(String raw, String encoded) {
        return passwordEncoder.matches(raw, encoded);
    }
}