package com.lingvi.lingviserver.commons.entities;

import java.util.Arrays;

/**
 * Enum of used languages
 */
public enum Language {

    RU("ru"), EN("en"), UA("ua"), FR("fr");

    private String value;

    Language(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Language fromValue(String value) {
        for (Language language: values()) {
            if(language.value.equalsIgnoreCase(value)) {
                return language;
            }
        }
        throw new IllegalArgumentException(
                "Unknown enum type " + value + ", Allowed values are " + Arrays.toString(values()));
    }

}
