package com.lingvi.lingviserver.commons.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(ApiError.class)
    public Object handleApiException(ApiError e) {
        return new ResponseEntity<>(new ApiErrorResponse(e), e.getStatus());
    }
}
