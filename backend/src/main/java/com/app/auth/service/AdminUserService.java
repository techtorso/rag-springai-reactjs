package com.app.auth.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.auth.dto.RegisterRequest;
import com.app.auth.model.Role;
import com.app.auth.model.User;
import com.app.auth.repository.UserRepository;

@Service
public class AdminUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    
    
    public User createUser(
    		RegisterRequest request) {

        Optional<User> existing =
                userRepository.findByEmail(
                        request.getEmail());

        if (existing.isPresent()) {
            throw new RuntimeException(
                    "Username already exists");
        }

        User user = new User();

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setRole(request.getRole());

        user.setEnabled(true);
        
        user.setEmailVerified(true);

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateRole(
            Long id,
            String role) {

        User user = userRepository.findById(id)
                .orElseThrow();
        
        user.setRole(Role.valueOf(role));

        return userRepository.save(user);
    }

    public User disableUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow();

        user.setEnabled(false);

        return userRepository.save(user);
    }

    public User enableUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow();

        user.setEnabled(true);

        return userRepository.save(user);
    }

    
    	
    	@Transactional
    	public void deleteUser(Long id) {

    	    User user = userRepository
    	            .findById(id)
    	            .orElseThrow();

    	    String email = user.getEmail();

    	    // DELETE VECTOR DATA
    	    jdbcTemplate.update(
    	        """
    	        DELETE FROM vector_store
    	        WHERE metadata->>'uploadedBy' = ?
    	        """,
    	        email
    	    );

    	    // DELETE USER
    	    userRepository.delete(user);
    	}

        
 
}