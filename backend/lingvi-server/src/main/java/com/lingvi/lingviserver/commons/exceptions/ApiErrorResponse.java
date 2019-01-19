package com.lingvi.lingviserver.commons.exceptions;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Date;
import java.util.List;

public class ApiErrorResponse {

    private Date timestamp;
    private String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String code;
    private int status;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<ApiSubError> errors;

    public ApiErrorResponse(ApiError e) {
        this.timestamp = e.getTimestamp();
        this.message = e.getMessage();
        this.status = e.getStatus().value();
        this.errors = e.getErrors();
        this.code = e.getCode();
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
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
