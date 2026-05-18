package com.app.auth.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final VectorStore vectorStore;
    
    

    public DocumentService(VectorStore vectorStore) {
		super();
		this.vectorStore = vectorStore;
	}

	public void processDocument(MultipartFile file) {

        String text = extractText(file);
        
//        System.out.println("Extracted text = [" + text + "]");
//        System.out.println("Text length = " + text.length());
        
        
        
        
        TokenTextSplitter splitter = new TokenTextSplitter();

        List<Document> chunks = splitter.apply(
            List.of(new Document(text))
        );

//        System.out.println("Chunk Size = " + chunks.size());

        var auth = SecurityContextHolder.getContext().getAuthentication();

        List<Document> documents = chunks.stream()
            .filter(doc -> doc.getText() != null &&
                    doc.getText().replaceAll("\\s+", "").length() > 10)
            .map(doc -> new Document(
                    doc.getText(),
                    Map.of(
                        "uploadedBy", auth.getName(),
                        "fileName", file.getOriginalFilename(),
                        "uploadedAt", Instant.now().toString()
                    )
            ))
            .toList();
        
//        var auth = SecurityContextHolder.getContext().getAuthentication();

        vectorStore.add(documents);
        
        
//        
//        TokenTextSplitter splitter = new TokenTextSplitter();
//        
//
//        List<String> chunks = splitter.split(text);
        
        
        //        List<String> chunks = chunkText(text);
        
//        List<String> chunks = splitter.split(text);
        
//        System.out.println("Check here Very Important "+chunks.size());

        
        

//        System.out.println("Auth = " + auth);
        
		/*
		 * List<Document> documents = chunks.stream() .filter(chunk -> chunk != null &&
		 * chunk.replaceAll("\\s+", "").length() > 10) .map(chunk -> new Document(
		 * chunk, Map.of( "uploadedBy", auth.getName(), "fileName",
		 * file.getOriginalFilename(), "uploadedAt", Instant.now().toString() ) ))
		 * .toList();
		 * 
		 * System.out.println("Document Size "+ documents.size());
		 */        
        vectorStore.add(documents);
    }

    private String extractText(MultipartFile file) {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        } catch (Exception e) {
            throw new RuntimeException("Failed to read PDF", e);
        }
    }
    
}