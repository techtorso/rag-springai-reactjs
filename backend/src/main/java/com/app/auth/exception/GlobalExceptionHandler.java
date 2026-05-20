package com.app.auth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

}