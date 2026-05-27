package com.app.auth.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.auth.dto.LoginRequest;
import com.app.auth.dto.OtpRequest;
import com.app.auth.dto.RegisterRequest;
import com.app.auth.exception.InvalidOtpException;
import com.app.auth.exception.InvalidPasswordException;
import com.app.auth.exception.OtpAlreadyUsedException;
import com.app.auth.exception.OtpExpiredException;
import com.app.auth.model.OtpVerification;
import com.app.auth.model.User;
import com.app.auth.repository.OtpRepository;
import com.app.auth.repository.UserRepository;
import com.app.auth.service.AuthService;
import com.app.auth.service.JwtUtil;
import com.app.auth.service.OtpService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private OtpService otpService;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    // =========================
    // 1. REGISTER
    // =========================
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.ok(authService.register(req));
    }
    // =========================
    // 2. VERIFY REGISTRATION OTP
    // =========================
    @PostMapping("/verify-registration-otp")
    public ResponseEntity<?> verifyRegistrationOtp(@RequestBody OtpRequest req) {

        OtpVerification otp = validateOtp(req);

        otp.setUsed(true);
        otpRepository.save(otp);

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow();

        user.setEmailVerified(true);
        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of("message", "EMAIL_VERIFIED"));
    }

    // =========================
    // 3. LOGIN
    // =========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!user.isEmailVerified()) {
            return ResponseEntity.badRequest()
                    .body("Email not verified");
        }

        if (!authService.validatePassword(req.getPassword(), user.getPassword())) {
        	
        	
        	
//            return ResponseEntity.badRequest()
//                    .body("Invalid credentials");
        	
        	throw new InvalidPasswordException("Invalid Credentials");
        	
        	
        }

        otpService.generateAndSendOtp(req.getEmail());
        
//        System.out.println("Login Should work"+ req.getEmail());

        return ResponseEntity.ok(
                Map.of("message", "LOGIN_OTP_SENT"));
    }

    // =========================
    // 4. VERIFY LOGIN OTP (ISSUE JWT)
    // =========================
    @PostMapping("/verify-login-otp")
    public ResponseEntity<?> verifyLoginOtp(@RequestBody OtpRequest req) {

        OtpVerification otp = validateOtp(req);

        otp.setUsed(true);
        otpRepository.save(otp);

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow();

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return ResponseEntity.ok(
                Map.of("token", token));
    }

    // =========================
    // COMMON OTP VALIDATION
    // =========================
    private OtpVerification validateOtp(OtpRequest req) {

        OtpVerification otp = otpRepository
                .findTopByEmailOrderByIdDesc(req.getEmail())
                .orElseThrow();

        if (otp.isUsed()) {
            throw new OtpAlreadyUsedException("OTP already used");
        }

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new OtpExpiredException("OTP expired");
        }

        if (!otp.getOtp().equals(req.getOtp())) {
            throw new InvalidOtpException("Invalid OTP Coming from Backend");
        }

        return otp;
    }
}