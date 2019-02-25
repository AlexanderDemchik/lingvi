package com.lingvi.lingviserver.commons.exceptions;

import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.List;

/**
 * Common model of rest errors
 */
public class ApiError extends RuntimeException {

    private Date timestamp;
    private String message;
    private HttpStatus status;
    private String code;
    private List<ApiSubError> errors;

    public ApiError(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
        this.timestamp = new Date();
    }

    public ApiError(String message, String code, HttpStatus status) {
        this.message = message;
        this.status = status;
        this.timestamp = new Date();
    }

    public ApiError(String message, HttpStatus status, List<ApiSubError> errors) {
        this.timestamp = new Date();
        this.message = message;
        this.status = status;
        this.errors = errors;
    }

    public ApiError(String message, String code, HttpStatus status, List<ApiSubError> errors) {
        this.timestamp = new Date();
        this.message = message;
        this.code = code;
        this.status = status;
        this.errors = errors;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public List<ApiSubError> getErrors() {
        return errors;
    }

    public void setErrors(List<ApiSubError> errors) {
        this.errors = errors;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
