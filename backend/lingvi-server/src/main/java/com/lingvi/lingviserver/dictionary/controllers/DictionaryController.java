package com.lingvi.lingviserver.dictionary.controllers;

import com.lingvi.lingviserver.dictionary.config.ControllerPaths;
import com.lingvi.lingviserver.dictionary.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.SoundResponse;
import com.lingvi.lingviserver.dictionary.entities.WordResponse;
import com.lingvi.lingviserver.dictionary.services.DictionaryService;
import com.lingvi.lingviserver.dictionary.utils.LanguageConventer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ControllerPaths.DICTIONARY)
public class DictionaryController {

    private DictionaryService dictionaryService;

    @Autowired
    public DictionaryController(DictionaryService dictionaryService) {
        this.dictionaryService = dictionaryService;
    }

    @GetMapping(ControllerPaths.TRANSLATION)
    public WordResponse getTranslation(@RequestParam String text, @RequestParam Language from, @RequestParam Language to) {
        return dictionaryService.handleUserTranslateRequest(text, from, to);
    }

    @GetMapping(ControllerPaths.SOUND_PATH)
    public SoundResponse getSoundPath(@PathVariable(value = "word_id") long wordId) {
        return dictionaryService.getSoundByWordId(wordId);
    }

    @InitBinder
    public void initBinder(final WebDataBinder webdataBinder) {
        webdataBinder.registerCustomEditor(Language.class, new LanguageConventer());
    }
}
