package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.commons.utils.Utils;
import com.lingvi.lingviserver.dictionary.entities.primary.Image;
import com.lingvi.lingviserver.dictionary.entities.primary.UserWord;
import com.lingvi.lingviserver.dictionary.repositories.primary.UserWordRepository;
import org.springframework.stereotype.Service;

@Service
public class UserDictionaryService {

    private ImageService imageService;
    private DictionaryService dictionaryService;
    private UserWordRepository userWordRepository;


    public UserDictionaryService(ImageService imageService, DictionaryService dictionaryService, UserWordRepository userWordRepository) {
        this.imageService = imageService;
        this.dictionaryService = dictionaryService;
        this.userWordRepository = userWordRepository;
    }

    public Image changeSelectedImage(Long wordId, Image image) {
        UserWord userWord;
        if ((userWord = userWordRepository.findByIdAndAccountId(wordId, Utils.getUserId())) != null) {
            if ((image = imageService.getImageById(image.getId())) != null) {
                userWord.setSelectedImage(image);
                userWordRepository.save(userWord);
                return image;
            }
        }
        return null;
    }


}
