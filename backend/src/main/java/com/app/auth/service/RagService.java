package com.app.auth.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.app.auth.util.PromptTemplates;
@Service
@RequiredArgsConstructor
public class RagService {

    private final VectorStore vectorStore;
    private final ChatModel chatModel;
    
    
    

    public RagService(VectorStore vectorStore, ChatModel chatModel) {
		super();
		this.vectorStore = vectorStore;
		this.chatModel = chatModel;
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

    	    for (Document doc : docs) {

    	        System.out.println("================================");
    	        System.out.println("Score: " + doc.getScore());
    	        System.out.println(doc.getMetadata().get("fileName"));
    	        System.out.println(doc.getText());
    	    }

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
    
    
	/*
	 * private Set<String> extractKeywords(String question) { return
	 * Arrays.stream(question.toLowerCase().split("\\s+")) .filter(word ->
	 * word.length() > 3) .filter(word ->
	 * !Set.of("what","how","many","years","have","worked","does").contains(word))
	 * .collect(Collectors.toSet()); }
	 */



}