package com.lingvi.lingviserver.account.entities;

import com.lingvi.lingviserver.commons.entities.Language;

public class Settings {
    private Language translationLanguage;
    private Language uiLanguage;

    public Settings() {
    }

    public Settings(Language translationLanguage, Language uiLanguage) {
        this.translationLanguage = translationLanguage;
        this.uiLanguage = uiLanguage;
    }

    public Language getTranslationLanguage() {
        return translationLanguage;
    }

    public void setTranslationLanguage(Language translationLanguage) {
        this.translationLanguage = translationLanguage;
    }

    public Language getUiLanguage() {
        return uiLanguage;
    }

    public void setUiLanguage(Language uiLanguage) {
        this.uiLanguage = uiLanguage;
    }
}
