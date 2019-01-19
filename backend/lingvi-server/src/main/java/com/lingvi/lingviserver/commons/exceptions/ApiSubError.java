package com.lingvi.lingviserver.commons.exceptions;

import com.fasterxml.jackson.annotation.JsonInclude;

public abstract class ApiSubError {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String code;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
