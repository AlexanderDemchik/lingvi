package com.lingvi.lingviserver.dictionary.controllers;

import com.lingvi.lingviserver.dictionary.config.ControllerPaths;
import com.lingvi.lingviserver.dictionary.entities.UserDictionaryAddWordRequest;
import com.lingvi.lingviserver.dictionary.entities.UserWordSliceResponse;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.entities.primary.UserWord;
import com.lingvi.lingviserver.dictionary.services.DictionaryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping(ControllerPaths.WORD + ControllerPaths.ID)
    public List<Long> getAllUserWordIds() {
        return dictionaryService.getAllUserWordIds();
    }

    @GetMapping(ControllerPaths.WORD)
    public UserWordSliceResponse getUserDictionaryWords(@RequestParam int page, @RequestParam int limit) {
        return dictionaryService.getUserDictionaryWords(page, limit);
    }

//    @PutMapping(ControllerPaths.WORD + "/{wordId}" + ControllerPaths.TRANSLATION)
//    public void editTranslations(@PathVariable Long wordId) {
//
//    }

    @PostMapping(ControllerPaths.WORD + "/{wordId}" + ControllerPaths.TRANSLATION)
    public UserWord addTranslation(@PathVariable Long wordId, @RequestBody Translation translation) {
        return dictionaryService.addTranslationToUserDictionaryWord(wordId, translation);
    }

    @DeleteMapping(ControllerPaths.WORD + "/{wordId}" + ControllerPaths.TRANSLATION + "/{translationId}")
    public void removeTranslation(@PathVariable Long wordId, @PathVariable Long translationId) {
        dictionaryService.removeTranslationFromUserDictionaryWord(wordId, translationId);
    }


}
