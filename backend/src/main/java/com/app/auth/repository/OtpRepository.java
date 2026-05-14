package com.app.auth.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.auth.model.OtpVerification;

@Repository
public interface OtpRepository extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification> findByEmail(String email);

    void deleteByEmail(String email);
    
    
    Optional<OtpVerification> findTopByEmailOrderByIdDesc(String email);
}