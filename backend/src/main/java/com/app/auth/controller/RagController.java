package com.app.auth.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.auth.dto.AskRequest;
import com.app.auth.service.RagService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/rag")
@RequiredArgsConstructor
public class RagController {

    private final RagService ragService;
    
     

    public RagController(RagService ragService) {
		super();
		this.ragService = ragService;
	}



	@PostMapping("/ask")
    public ResponseEntity<Map<String,Object>> ask(@RequestBody AskRequest request) {
		
        return ResponseEntity.ok(ragService.ask(request.getQuestion(), request.getFileName()));
    }
}