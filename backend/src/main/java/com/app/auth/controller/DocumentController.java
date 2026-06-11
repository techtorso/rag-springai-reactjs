package com.app.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.servlet.MultipartProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.util.unit.DataSize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.auth.service.DocumentService;

@RestController
@RequestMapping("/api/docs")
//@RequiredArgsConstructor
public class DocumentController {

    
	@Autowired
	private DocumentService documentService;
	
	
//	@Value("${app.max-documents-per-user}")
//	private long maxFilesUploadLimit;
	
	
	@Autowired
	private MultipartProperties multipartProperties;
	
	
	
//	@Value("${spring.servlet.multipart.max-file-size}")
//	private long max;
	
	


	@PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
		
		DataSize maxSize = multipartProperties.getMaxFileSize();
		
		
		
		String fileName = file.getOriginalFilename().toLowerCase();

		boolean validExtension =
		        fileName.endsWith(".pdf") ||
		        fileName.endsWith(".docx") ||
		        fileName.endsWith(".txt");

		boolean validMimeType =
		        "application/pdf".equals(file.getContentType()) ||
		        "application/vnd.openxmlformats-officedocument.wordprocessingml.document".equals(file.getContentType()) ||
		        "text/plain".equals(file.getContentType());
		
		if (!validExtension || !validMimeType) {
		    throw new IllegalArgumentException("Unsupported file type");
		}
	

//        long maxSize = 10 * 1024 * 1024;
        
        if (file.getSize() > maxSize.toBytes()) {

            return ResponseEntity
                    .badRequest()
                    .body("Maximum allowed size is "
                    		+ maxSize + "MB");
        }

        documentService.processDocument(file);

        return ResponseEntity.ok("File uploaded & processed successfully");
    }
	
	
}