package com.app.auth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.app.auth.dto.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
            UploadLimitExceededException.class
    )
    public ResponseEntity<ErrorResponse>
    handleUploadLimitException(
            UploadLimitExceededException ex) {

        ErrorResponse error =
                new ErrorResponse(
                        400,
                        "UPLOAD_LIMIT_EXCEEDED",
                        ex.getMessage()
                );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    }
    
    
    @ExceptionHandler(OtpAlreadyUsedException.class)
    public ResponseEntity<ErrorResponse> handleOtpAlreadyUsedException(OtpAlreadyUsedException ex){
    		
    	
    	ErrorResponse error =
    		    new ErrorResponse(
    		            400,
    		            "OTP Already Used Kishore",
    		            ex.getMessage()
    		    );
    	return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    	
    	
    	
    }
    
    
    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<ErrorResponse> handleInvalidOtpException(InvalidOtpException ex){
    		
    	
    	ErrorResponse error =
    		    new ErrorResponse(
    		            400,
    		            "Invalid OTP Exception From Backend",
    		            ex.getMessage()
    		    );
    	return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    	
    	
    	
    }
    
    
    
    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPasswordException(InvalidPasswordException ex){
    		
    	
    	ErrorResponse error =
    		    new ErrorResponse(
    		            401,
    		            "Invalid Password Execeptin, Handled at Backend",
    		            ex.getMessage()
    		    );
    	return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    	
    	
    	
    }
    
    
    @ExceptionHandler(EmailAlreadyAvailableException.class)
    public ResponseEntity<ErrorResponse> handleEmailAlreadyAvailableException(EmailAlreadyAvailableException ex){
    		
    	
    	ErrorResponse error =
    		    new ErrorResponse(
    		            401,
    		            "Email already registered",
    		            ex.getMessage()
    		    );
    	return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    	
    	
    	
    }
    
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex) {

        String errorMessage = ex.getBindingResult()
                .getFieldError()
                .getDefaultMessage();

        ErrorResponse error = new ErrorResponse(
                400,
                "Method Arguement Kishore ",
                "Krishna  Kishore Back End"
                
        );

        return ResponseEntity.badRequest().body(error);
    }
    
    
    
    
    
    @ExceptionHandler(InvalidDocumentUploadTypeException.class)
    
    public ResponseEntity<ErrorResponse>  handleInvalidDocumentUploadException(InvalidDocumentUploadTypeException ex) 
    {

        ErrorResponse error =
                new ErrorResponse(
                        400,
                        "Invalid Document Type Exception",
                        ex.getMessage()
                );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    }
    

//    
//    UsernameNotFoundException
    
        
    
    
    
    

}