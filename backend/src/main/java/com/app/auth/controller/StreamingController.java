//package com.app.auth.controller;
//
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import com.app.auth.service.RagService;
//import com.app.auth.util.PromptTemplates;
//
//import reactor.core.publisher.Flux;
//import org.springframework.ai.chat.client.ChatClient;
//import org.springframework.beans.factory.annotation.Autowired;
//
//public class StreamingController {
//
//	@Autowired
//	private ChatClient chatClient;
//
//	@Autowired
//	private RagService ragService;
//
//	@GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//	public Flux<String> streamAnswer(@RequestParam String question, @RequestParam String document) {
//		
//		String  context = ragService.retrieveContext(question, document);
//				
//		
//
////		PromptTemplates.PROMPT_TEMPLATE.formatted(document, context, question);
//
////		String finalPrompt = buildPrompt(question, document);
//		
//		String finalPrompt = PromptTemplates.PROMPT_TEMPLATE.formatted(document, context, question);
//
//		return chatClient.prompt(finalPrompt).stream().content();
//	}
//}
