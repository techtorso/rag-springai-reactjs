package com.app.auth.controller;



import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.auth.service.DocumentQueryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class DocumentQueryController {

    private final DocumentQueryService documentQueryService;

    
//    public DocumentQueryController(DocumentQueryService documentQueryService) {
//		super();
//		this.documentQueryService = documentQueryService;
//	}


	@GetMapping
    public List<String> getDocuments() {
        return documentQueryService.getUploadedDocuments();
    }
}