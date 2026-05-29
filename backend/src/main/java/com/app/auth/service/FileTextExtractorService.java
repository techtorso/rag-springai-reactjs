package com.app.auth.service;

import lombok.extern.slf4j.Slf4j;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.auth.exception.ExtractDocxException;
import com.app.auth.exception.ExtractPDFException;
import com.app.auth.exception.ExtractTxtTextException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
public class FileTextExtractorService {

	public String extractText(MultipartFile file) {

		String filename = file.getOriginalFilename();

		if (filename == null) {
			throw new RuntimeException("Invalid file name");
		}

		String lowerCaseName = filename.toLowerCase();

		try {

			if (lowerCaseName.endsWith(".pdf")) {
				return extractPdfText(file);
			}

			if (lowerCaseName.endsWith(".docx")) {
				return extractDocxText(file);
			}

			if (lowerCaseName.endsWith(".txt")) {
				return extractTxtText(file);
			}

			throw new RuntimeException("Unsupported file type");

		} catch (Exception e) {
//            log.error("Error extracting text from file", e);
			throw new RuntimeException("Failed to process file");
		}
	}

	private String extractPdfText(MultipartFile file) {

		// Use your existing PDF extraction logic here
		// Example:
		// return pdfService.extract(file);

		try (PDDocument document = PDDocument.load(file.getInputStream())) {
			PDFTextStripper stripper = new PDFTextStripper();
			return stripper.getText(document);
		} catch (Exception e) {
			throw new ExtractPDFException("Exception from PDF Extract");
		}

//        throw new RuntimeException("PDF extraction not implemented here");
	}

	private String extractDocxText(MultipartFile file) throws IOException {

		try (
				XWPFDocument document = new XWPFDocument(file.getInputStream());
				XWPFWordExtractor extractor = new XWPFWordExtractor(document)) 
		{
			
			return extractor.getText();
		} catch (Exception ex) {
			throw new ExtractDocxException("Exception from Docx Extract");
		}
			// TODO: handle exception
		
		
	}

	private String extractTxtText(MultipartFile file) throws IOException {

		StringBuilder builder = new StringBuilder();

		try (BufferedReader reader = new BufferedReader(
				new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
			String line;
			while ((line = reader.readLine()) != null) {
				builder.append(line).append("\n");
			}
			
			return builder.toString();
		} catch (Exception e) {
			throw new ExtractTxtTextException("Exception from Text Extract");
		}

	
	}

}
