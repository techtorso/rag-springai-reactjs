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
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
    

    public RagService(VectorStore vectorStore, ChatModel chatModel) {
		super();
		this.vectorStore = vectorStore;
		this.chatModel = chatModel;
	}

    
    public String retrieveContext(
            String question,
            String selectedDocument) {

        StringBuilder contextBuilder =
                new StringBuilder();

        String sql;

        List<Map<String, Object>> rows;

        // ALL DOCUMENTS
        if ("ALL".equalsIgnoreCase(selectedDocument)) {

            sql = """
                    SELECT content
                    FROM vector_store
                    LIMIT 5
                    """;

            rows = jdbcTemplate.queryForList(sql);

        } else {

            sql = """
                    SELECT content
                    FROM vector_store
                    WHERE metadata->>'fileName' = ?
                    LIMIT 5
                    """;

            rows = jdbcTemplate.queryForList(
                    sql,
                    selectedDocument
            );
        }

        for (Map<String, Object> row : rows) {

            contextBuilder.append(
                    row.get("content")
            );

            contextBuilder.append("\n\n");
        }

        return contextBuilder.toString();
    }
    
    public Map<String, Object> ask(String question, String fileName) {
    	 {

    	    String currentUser = SecurityContextHolder
    	            .getContext()
    	            .getAuthentication()
    	            .getName();

    	    SearchRequest.Builder builder = SearchRequest.builder()
    	            .query(question)
    	            .topK(5)
    	            .similarityThreshold(0.4);

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

    	    List<Document> docs =
    	            vectorStore.similaritySearch(builder.build());

    	    if (docs == null || docs.isEmpty()) {

    	        return Map.of(
    	                "answer",
    	                "I couldn't find enough relevant information in your uploaded documents.",
    	                "sources",
    	                List.of()
    	        );
    	    }

//    	    for (Document doc : docs) {
//
//    	        System.out.println("================================");
//    	        System.out.println("Score: " + doc.getScore());
//    	        System.out.println(doc.getMetadata().get("fileName"));
//    	        System.out.println(doc.getText());
//    	    }

    	    String context = docs.stream()
    	            .map(doc -> "[Source: %s]\n%s".formatted(
    	                    doc.getMetadata().get("fileName"),
    	                    doc.getText()))
    	            .collect(Collectors.joining("\n\n---\n\n"));

    	    String prompt =
    	            PromptTemplates.PROMPT_TEMPLATE
    	                    .formatted(context, question);

    	    String answer = chatModel.call(prompt);

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

    
    
    



}