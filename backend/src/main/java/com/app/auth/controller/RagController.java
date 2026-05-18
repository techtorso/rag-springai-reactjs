package com.app.auth.controller;

import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.auth.dto.AskRequest;
import com.app.auth.service.RagService;
import com.app.auth.util.PromptTemplates;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/rag")
@RequiredArgsConstructor
public class RagController {

	@Autowired
	private RagService ragService;

	@Autowired
	private ChatClient chatClient;

	public RagController(ChatClient chatClient, RagService ragService) {
		super();
		this.ragService = ragService;
		this.chatClient = chatClient;
	}

//	public RagController(RagService ragService, ChatClient chatClient) {
//		super();
//		this.ragService = ragService;
//		this.chatClient = chatClient;
//	}

	@PostMapping("/ask")
	public ResponseEntity<Map<String, Object>> ask(@RequestBody AskRequest request) {

		return ResponseEntity.ok(ragService.ask(request.getQuestion(), request.getFileName()));
	}

	@GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<String> streamAnswer(@RequestParam String question, @RequestParam String document) {

		String context = ragService.retrieveContext(question, document);

		String finalPrompt = PromptTemplates.PROMPT_TEMPLATE.formatted(document, context, question);

		return chatClient.prompt(finalPrompt).stream().content();
	}

}