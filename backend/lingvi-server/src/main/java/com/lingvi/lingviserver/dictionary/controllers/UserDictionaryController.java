package com.lingvi.lingviserver.dictionary.controllers;

import com.lingvi.lingviserver.dictionary.config.ControllerPaths;
import com.lingvi.lingviserver.dictionary.entities.UserDictionaryAddWordRequest;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.services.DictionaryService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ControllerPaths.USER_DICTIONARY)
public class UserDictionaryController {

    private DictionaryService dictionaryService;

    UserDictionaryController(DictionaryService dictionaryService) {

        this.dictionaryService = dictionaryService;
    }

    @PostMapping(ControllerPaths.WORD)
    public Object addWordToUserDict(@RequestBody UserDictionaryAddWordRequest request) {
        return dictionaryService.saveWordToUserDictionary(request.getWord(), request.getFrom(), request.getTo(), request.getTranslations());
    }

    @DeleteMapping(ControllerPaths.WORD + "/{wordId}")
    public void removeWordFromUserDict(@PathVariable Long wordId) {
        dictionaryService.removeWordFromUserDictionary(wordId);
    }

//    @PutMapping(ControllerPaths.WORD + "/{wordId}" + ControllerPaths.TRANSLATION)
//    public void editTranslations(@PathVariable Long wordId) {
//
//    }

    @PostMapping(ControllerPaths.WORD + "/{wordId}" + ControllerPaths.TRANSLATION)
    public void addTranslation(@PathVariable Long wordId, @RequestBody Translation translation) {
        dictionaryService.addTranslationToUserDictionaryWord(wordId, translation);
    }

    @DeleteMapping(ControllerPaths.WORD + "/{wordId}/{translationId}" + ControllerPaths.TRANSLATION)
    public void removeTranslation(@PathVariable Long wordId, @PathVariable Long translationId) {
        dictionaryService.removeTranslationFromUserDictionaryWord(wordId, translationId);
    }
}
