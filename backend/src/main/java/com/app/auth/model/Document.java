package com.app.auth.model;



import jakarta.persistence.*;

@Entity
@Table(name = "your_table_name") // replace with actual table name
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "file_name", nullable = false, length = 255)
    private String fileName;

    // USER-DEFINED type: you’ll need to map this properly depending on your DB setup.
    // For example, if it's a vector type (like pgvector in PostgreSQL), you can store as String or byte[].
    
    
    @Column(name = "embedding", columnDefinition = "vector(1536)")
    private float[] embedding;    // tsvector is PostgreSQL-specific. Usually handled via full-text search, not directly mapped.
    
    

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
	public float[] getEmbedding() {
		return embedding;
	}
	public void setEmbedding(float[] embedding) {
		this.embedding = embedding;
	}
    
    
    
    
 }
