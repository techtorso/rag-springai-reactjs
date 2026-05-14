package com.app.auth.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DocumentQueryService {

    
	private final JdbcTemplate jdbcTemplate;
    
    

    public DocumentQueryService(JdbcTemplate jdbcTemplate) {
		super();
		this.jdbcTemplate = jdbcTemplate;
	}



	public List<String> getUploadedDocuments() {
		
		
		 String currentUser = SecurityContextHolder
		            .getContext()
		            .getAuthentication()
		            .getName();
		 
		 System.out.println("Logged User Kishore "+ currentUser);
	
		 String sql = """
		            SELECT DISTINCT metadata->>'fileName'
		            FROM vector_store
		            WHERE metadata->>'uploadedBy' = ?
		            ORDER BY metadata->>'fileName'
		            """;
		 
		 
		 
		 

		 return jdbcTemplate.queryForList(
		            sql,
		            String.class,
		            currentUser
		    );
		}
    }