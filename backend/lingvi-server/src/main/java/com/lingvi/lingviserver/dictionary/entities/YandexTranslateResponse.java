package com.lingvi.lingviserver.dictionary.entities;

/**
 * Response that we get from yandex translate api when translate text
 */
public class YandexTranslateResponse {

    private int code;
    private String lang;
    /**
     * Translated text
     */
    private String[] text;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }


    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public String[] getText() {
        return text;
    }

    public void setText(String[] text) {
        this.text = text;
    }
}
