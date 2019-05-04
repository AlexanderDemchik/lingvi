package com.lingvi.lingviserver.dictionary.controllers;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.config.ControllerPaths;
import com.lingvi.lingviserver.dictionary.entities.*;
import com.lingvi.lingviserver.dictionary.entities.primary.DictionaryMeta;
import com.lingvi.lingviserver.dictionary.entities.primary.Image;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.services.DictionaryService;
import com.lingvi.lingviserver.dictionary.services.UserDictionaryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ControllerPaths.USER_DICTIONARY)
public class UserDictionaryController {

    private DictionaryService dictionaryService;
    private UserDictionaryService userDictionaryService;

    UserDictionaryController(DictionaryService dictionaryService, UserDictionaryService userDictionaryService) {

        this.dictionaryService = dictionaryService;
        this.userDictionaryService = userDictionaryService;
    }

    @PostMapping(ControllerPaths.WORD)
    public Object addWordToUserDict(@RequestBody UserDictionaryAddWordRequest request) {
        return dictionaryService.saveWordToUserDictionary(request.getWord(), request.getFrom(), request.getTo(), request.getTranslations());
    }

    @DeleteMapping(ControllerPaths.WORD + "/{wordId}")
    public void removeWordFromUserDict(@PathVariable Long wordId) {
        dictionaryService.removeWordFromUserDictionary(wordId);
    }

    @DeleteMapping(ControllerPaths.WORD)
    public void batchRemoveWordsFromUserDict(@RequestBody BatchDeleteWordsRequest request) {
        dictionaryService.batchRemoveWordsFromUserDictionary(request.getIds());
    }

    @GetMapping(ControllerPaths.WORD + ControllerPaths.ID)
    public List<Long> getAllUserWordIds(@RequestParam(required = false, defaultValue = "") String filter, @RequestParam Language from, @RequestParam Language to) {
        return dictionaryService.getAllUserWordIds(filter, from, to);
    }

    @GetMapping(ControllerPaths.WORD)
    public UserWordSliceResponse getUserDictionaryWords(@RequestParam int page, @RequestParam int limit, @RequestParam(required = false, defaultValue = "") String filter, @RequestParam Language from, @RequestParam Language to) {
        return dictionaryService.getUserDictionaryWords(page, limit, filter, from, to);
    }

//    @PutMapping(ControllerPaths.WORD + "/{wordId}" + ControllerPaths.TRANSLATION)
//    public void editTranslations(@PathVariable Long wordId) {
//
//    }

    @PostMapping(ControllerPaths.WORD + "/{wordId}" + ControllerPaths.TRANSLATION)
    public TranslationResponse addTranslation(@PathVariable Long wordId, @RequestBody Translation translation) {
        return dictionaryService.addTranslationToUserDictionaryWord(wordId, translation);
    }

    @DeleteMapping(ControllerPaths.WORD + "/{wordId}" + ControllerPaths.TRANSLATION + "/{translationId}")
    public void removeTranslation(@PathVariable Long wordId, @PathVariable Long translationId) {
        dictionaryService.removeTranslationFromUserDictionaryWord(wordId, translationId);
    }

    @GetMapping(ControllerPaths.META)
    public List<UserDictMetaImpl> getDictMeta() {
        return userDictionaryService.getUserDictionaryMeta();
    }

    @PostMapping(ControllerPaths.WORD + "/{wordId}" + ControllerPaths.IMAGE)
    public Image setImage(@PathVariable Long wordId, @RequestBody Image image) {
        return userDictionaryService.changeSelectedImage(wordId, image);
    }

    @PostMapping
    public DictionaryMeta addDictionary(@RequestBody DictionaryMeta dictionaryMeta) {
        return userDictionaryService.addNewDictionaryMeta(dictionaryMeta);
    }

    @DeleteMapping
    public void removeDictionary(@RequestBody DictionaryMeta dictionaryMeta) {
        userDictionaryService.deleteDictionary(dictionaryMeta);
    }

}
