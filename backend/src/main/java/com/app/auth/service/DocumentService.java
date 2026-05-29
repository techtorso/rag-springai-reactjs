package com.app.auth.service;

//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.auth.exception.ExtractPDFException;
import com.app.auth.exception.UnSupportedFileType;
import com.app.auth.exception.UploadLimitExceededException;
import com.app.auth.repository.VectorStoreRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DocumentService {

	private final VectorStore vectorStore;
	private JdbcTemplate jdbcTemplate;
	private VectorStoreRepository vectorStoreRepo;

	public DocumentService(VectorStore vectorStore, JdbcTemplate jdbcTemplate) {
		super();
		this.vectorStore = vectorStore;
		this.jdbcTemplate = jdbcTemplate;
	}

	public void processDocument(MultipartFile file) {

		String text;

//		= extractText(file);

		String filename = file.getOriginalFilename();

		if (filename == null) {
			throw new RuntimeException("Invalid file name");
		}

		String lowerCaseName = filename.toLowerCase();

		try {

			if (lowerCaseName.endsWith(".pdf")) {
				text = extractPdfText(file);
			} else if (lowerCaseName.endsWith(".docx")) {
				text = extractDocxText(file);
			} else if (lowerCaseName.endsWith(".txt")) {
				text = extractTxtText(file);
			} else {
				throw new UnSupportedFileType("Unsupported file type, Only PDF, Docx, txt");
			}


//			

			TokenTextSplitter splitter = new TokenTextSplitter();
			List<Document> chunks = splitter.apply(List.of(new Document(text)));
			var auth = SecurityContextHolder.getContext().getAuthentication();

			List<Document> documents = chunks.stream()
					.filter(doc -> doc.getText() != null && doc.getText().replaceAll("\\s+", "").length() > 10)
					.map(doc -> new Document(doc.getText(), Map.of("uploadedBy", auth.getName(), "fileName",
							file.getOriginalFilename(), "uploadedAt", Instant.now().toString())))
					.toList();

			String sql = """
					                SELECT COUNT(DISTINCT metadata->>'fileName')
					FROM vector_store
					WHERE metadata->>'uploadedBy' = ?

					                     """;

			Integer count = jdbcTemplate.queryForObject(sql, Integer.class, auth.getName());

			count = (count == null) ? 0 : count;

			if (count >= 5) {
				System.out.println("Max Limit - Kishore");
				throw new UploadLimitExceededException("Maximum 5 documents allowed per user");
			}

			vectorStore.add(documents);

		}
		catch (UploadLimitExceededException ue) {
			throw new UploadLimitExceededException("Maximum 5 documents allowed per user");
			
		} 
		catch (Exception e) {
//            log.error("Error extracting text from file", e);
			throw new RuntimeException("Failed to process file");
		} 

	}

//        var auth = SecurityContextHolder.getContext().getAuthentication();

//        
//        TokenTextSplitter splitter = new TokenTextSplitter();
//        
//
//        List<String> chunks = splitter.split(text);

	// List<String> chunks = chunkText(text);

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
//        vectorStore.add(documents);

	private String extractText(MultipartFile file) {
		try (PDDocument document = PDDocument.load(file.getInputStream())) {
			PDFTextStripper stripper = new PDFTextStripper();
			return stripper.getText(document);
		} catch (Exception e) {
			throw new RuntimeException("Failed to read PDF", e);
		}
	}

	@Transactional
	public void deleteDocument(String fileName) {

		String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();

		vectorStoreRepo.deleteByFileNameAndUser(fileName, currentUser);
	}

	private String extractPdfText(MultipartFile file) {

		// Use your existing PDF extraction logic here
		// Example:
//		 return pdfService.extract(file);

		try (PDDocument document = PDDocument.load(file.getInputStream())) {
			PDFTextStripper stripper = new PDFTextStripper();
			return stripper.getText(document);
		} catch (Exception e) {
			throw new ExtractPDFException("Exception from PDF Extract");
		}

//        throw new RuntimeException("PDF extraction not implemented here");
	}

	private String extractDocxText(MultipartFile file) throws IOException {

		try (XWPFDocument document = new XWPFDocument(file.getInputStream());
				XWPFWordExtractor extractor = new XWPFWordExtractor(document)) {
			return extractor.getText();
		}
	}

	private String extractTxtText(MultipartFile file) throws IOException {

		StringBuilder builder = new StringBuilder();

		try (BufferedReader reader = new BufferedReader(
				new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

			String line;

			while ((line = reader.readLine()) != null) {
				builder.append(line).append("\n");
			}
		}

		return builder.toString();
	}

}
