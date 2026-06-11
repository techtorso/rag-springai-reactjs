package com.app.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.auth.model.AccessRequest;
import com.app.auth.model.User;

@Repository
public interface PlaformAccessRequestRepository extends JpaRepository<AccessRequest, Long> {
	
    Optional<AccessRequest> findByEmail(String email);

    boolean existsByEmail(String email);


}
