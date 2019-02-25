package com.lingvi.lingviserver.dictionary.utils;

import com.lingvi.lingviserver.dictionary.entities.Language;
import java.beans.PropertyEditorSupport;

/**
 * Created for used enum {@link Language} as param at controller
 */
public class LanguageConventer extends PropertyEditorSupport {
    public void setAsText(final String text) throws IllegalArgumentException {
        setValue(Language.fromValue(text));
    }
}
