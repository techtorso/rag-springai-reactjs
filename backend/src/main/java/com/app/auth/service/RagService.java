package com.app.auth.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.app.auth.repository.VectorStoreRepository;
import com.app.auth.util.PromptTemplates;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class RagService {

    private final VectorStore vectorStore;
    private final ChatModel chatModel;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private EmbeddingModel embeddingModel;    
    
    @Autowired
    private VectorStoreRepository vectorStoreRepo;
    
//    public RagService(VectorStore vectorStore, ChatModel chatModel) {
//		super();
//		this.vectorStore = vectorStore;
//		this.chatModel = chatModel;
//	}

    
    
    
    public Map<String, Object> ask(String question, String fileName) {
    	 {

    	    String currentUser = SecurityContextHolder
    	            .getContext()
    	            .getAuthentication()
    	            .getName();

    	    SearchRequest.Builder builder = SearchRequest.builder()
    	            .query(question)
    	            .topK(5);
//    	            .similarityThreshold(0.2);

    	    if (fileName != null &&
    	            !fileName.isBlank() &&
    	            !fileName.equals("ALL")) {

    	        builder.filterExpression(
    	                "uploadedBy == '" + currentUser +
    	                "' && fileName == '" + fileName + "'"
    	        );
    	    } else {

    	        builder.filterExpression(
    	                "uploadedBy == '" + currentUser + "'"
    	        );
    	    }

    	    if (isSummaryQuery(question)) {

    	        return summarizeDocument(fileName, currentUser);
    	    }
    	    
    	    if (isExplainQuery(question)) {
    	        return explainConcept(question, fileName, currentUser);
    	    }
    	    
    	    List<Document> docs =
    	            vectorStore.similaritySearch(builder.build());

    	    if (docs == null || docs.isEmpty()) {
    	    	
//    	    	builder.similarityThreshold(0.2);
    	    	
    	    	
    	    	docs = vectorStore.similaritySearch(builder.build());

    	    	if (docs == null || docs.isEmpty()) {
        	        return Map.of(
        	                "answer",
        	                "I couldn't find enough relevant information in your uploaded documents.",
        	                "sources",
        	                List.of()
        	        );

    	    	}
    	    		
    	    }
    	    
    	    
    	    
    	    System.out.println("Retrieved docs count: " + docs.size());

    	    for (Document doc : docs) {
    	        System.out.println("Retrieved content:");
    	        System.out.println(doc.getText());
    	        System.out.println("Metadata:");
    	        System.out.println(doc.getMetadata());
    	    }
    	    
    	    


    	    String context = docs.stream()
    	            .map(doc -> "[Source: %s]\n%s".formatted(
    	                    doc.getMetadata().get("fileName"),
    	                    doc.getText()))
    	            .collect(Collectors.joining("\n\n---\n\n"));

    	    boolean hasTelugu = context.matches(".*[\\u0C00-\\u0C7F].*");
    	    
    	    
    	    String languageInstruction = hasTelugu
    	            ? """
    	              CRITICAL LANGUAGE RULE:

    	              - The retrieved context contains Telugu content.
    	              - You MUST answer entirely in Telugu.
    	              - Do NOT answer in English.
    	              - Technical terms such as Spring Boot, React, PostgreSQL, OpenAI, Docker may remain in English.
    	              """
    	            : """
    	              CRITICAL LANGUAGE RULE:

    	              - Answer in the same language as the user's question.
    	              """;
    	    
    	    String finalPrompt =
    	            languageInstruction + "\n\n" +
    	            PromptTemplates.PROMPT_TEMPLATE.formatted(context, question);
    	    
    	    
    	    
//    	    String prompt = PromptTemplates.PROMPT_TEMPLATE.formatted(context, question);
    	    
    	    String answer = chatModel.call(finalPrompt);

    	    List<Map<String, String>> sources = docs.stream()
    	            .limit(3)
    	            .map(doc -> Map.of(
    	                    "fileName",
    	                    String.valueOf(
    	                            doc.getMetadata().get("fileName")
    	                    ),
    	                    "snippet",
    	                    doc.getText().substring(
    	                            0,
    	                            Math.min(
    	                                    200,
    	                                    doc.getText().length()
    	                            )
    	                    )
    	            ))
    	            .toList();

    	    return Map.of(
    	            "answer", answer,
    	            "sources", sources
    	    );
    	}
    }

    
    private boolean isSummaryQuery(String question) {

        String q = question.toLowerCase();

        return q.contains("summarize")
                || q.contains("summary")
                || q.contains("overview")
                || q.contains("key points")
                || q.contains("explain this document")
                || q.contains("what is this document about");
    }   
    

    private Map<String, Object> summarizeDocument(
            String fileName,
            String currentUser) {

        String sql = """
                SELECT content
                FROM vector_store
                WHERE metadata->>'uploadedBy' = ?
                AND metadata->>'fileName' = ?
                ORDER BY CAST(metadata->>'chunkIndex' AS INTEGER)
                LIMIT 20
                """;

        List<String> chunks = jdbcTemplate.queryForList(
                sql,
                String.class,
                currentUser,
                fileName
        );

        if (chunks == null || chunks.isEmpty()) {

            return Map.of(
                    "answer",
                    "No content found for this document.",
                    "sources",
                    List.of()
            );
        }

        String combinedText = String.join("\n\n", chunks);

        String prompt = """
                Summarize the following document.

                Include:
                - Main topic
                - Key points
                - Important conclusions

                DOCUMENT:
                %s
                """.formatted(combinedText);

        String answer = chatModel.call(prompt);

        return Map.of(
                "answer", answer,
                "sources", List.of(
                        Map.of("fileName", fileName)
                )
        );
    }
    
    private Map<String, Object> explainConcept(
            String question,
            String fileName,
            String currentUser) {

        SearchRequest.Builder builder = SearchRequest.builder()
                .query(question)
                .topK(5);
                

        builder.filterExpression(
                "uploadedBy == '" + currentUser +
                "' && fileName == '" + fileName + "'"
        );

        List<Document> docs =
                vectorStore.similaritySearch(builder.build());

        if (docs == null || docs.isEmpty()) {

            return Map.of(
                    "answer",
                    "I could not find enough information in the document.",
                    "sources",
                    List.of()
            );
        }

        String context = docs.stream()
                .map(Document::getText)
                .collect(Collectors.joining("\n\n"));

        String prompt = """
                You are a helpful teacher.

                Explain the following concept
                in a beginner-friendly way using
                ONLY the provided document context.

                Use:
                - simple language
                - examples if possible
                - step-by-step explanation

                CONTEXT:
                %s

                QUESTION:
                %s
                """.formatted(context, question);

        String answer = chatModel.call(prompt);

        return Map.of(
                "answer", answer,
                "sources",
                docs.stream()
                        .limit(3)
                        .map(doc -> Map.of(
                                "fileName",
                                String.valueOf(
                                        doc.getMetadata()
                                                .get("fileName")
                                )
                        ))
                        .toList()
        );
    }
    
    private boolean isExplainQuery(String question) {

        String q = question.toLowerCase().trim();

        return q.startsWith("explain ")
                || q.startsWith("teach me ")
                || q.startsWith("how does ")
                || q.startsWith("how do ")
                || q.startsWith("what is jwt")
                || q.startsWith("what is spring")
                || q.startsWith("what is authentication");
    }
    
    
    @Transactional
	public void deleteDocument(String fileName) {

	    String currentUser = SecurityContextHolder
	            .getContext()
	            .getAuthentication()
	            .getName();

	    vectorStoreRepo.deleteByFileNameAndUser(
	            fileName,
	            currentUser
	    );
	} 
    
    private boolean containsTelugu(String text) {
        return text != null && text.matches(".*[\\u0C00-\\u0C7F].*");
    }
   
}




