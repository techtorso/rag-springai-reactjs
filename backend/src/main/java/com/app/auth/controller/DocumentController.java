package com.app.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.auth.service.DocumentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/docs")
@RequiredArgsConstructor
public class DocumentController {

    
	private final DocumentService documentService;
	
	

    public DocumentController(DocumentService documentService) {
		super();
		this.documentService = documentService;
	}



	@PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {

        if (!"application/pdf".equals(file.getContentType())) {
            return ResponseEntity.badRequest().body("Only PDF files are allowed");
        }

        long maxSize = 10 * 1024 * 1024;
        
        if (file.getSize() > maxSize) {

            return ResponseEntity
                    .badRequest()
                    .body("Maximum allowed size is 10 MB");
        }

        documentService.processDocument(file);

        return ResponseEntity.ok("File uploaded & processed successfully");
    }
	
	
}