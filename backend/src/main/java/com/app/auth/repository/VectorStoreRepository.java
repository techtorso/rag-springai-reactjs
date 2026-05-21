package com.app.auth.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class VectorStoreRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    
    public VectorStoreRepository(JdbcTemplate jdbcTemplate) {
		super();
		this.jdbcTemplate = jdbcTemplate;
	}


	public void deleteByFileNameAndUser(
            String fileName,
            String uploadedBy) {

        String sql = """
            DELETE FROM vector_store
            WHERE metadata->>'fileName' = ?
            AND metadata->>'uploadedBy' = ?
        """;

        jdbcTemplate.update(sql, fileName, uploadedBy);
    }
}