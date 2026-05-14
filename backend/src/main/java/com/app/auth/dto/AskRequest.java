package com.app.auth.dto;

import java.util.List;
import java.util.Map;

public class AskRequest {
	 private String question;
	 private String fileName;
	 
//	 private List<Map<String, String>> history;
	 public String getQuestion() {
		 return question;
	 }
	 public void setQuestion(String question) {
		 this.question = question;
	 }
	 public String getFileName() {
		 return fileName;
	 }
	 public void setFileName(String fileName) {
		 this.fileName = fileName;
	 }
	 
	 
		/*
		 * public List<Map<String, String>> getHistory() { return history; } public void
		 * setHistory(List<Map<String, String>> history) { this.history = history; }
		 */	 
}
