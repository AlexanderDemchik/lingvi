package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.dictionary.entities.UserDictMeta;
import com.lingvi.lingviserver.dictionary.entities.UserDictMetaImpl;
import com.lingvi.lingviserver.dictionary.entities.primary.DictionaryMeta;
import com.lingvi.lingviserver.dictionary.entities.primary.Image;
import com.lingvi.lingviserver.dictionary.entities.primary.UserWord;
import com.lingvi.lingviserver.dictionary.repositories.primary.DictionaryMetaRepository;
import com.lingvi.lingviserver.dictionary.repositories.primary.UserWordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.lingvi.lingviserver.commons.utils.Utils.getUserId;

@Service
public class UserDictionaryService {

    private ImageService imageService;
    private DictionaryService dictionaryService;
    private UserWordRepository userWordRepository;
    private DictionaryMetaRepository dictionaryMetaRepository;


    public UserDictionaryService(ImageService imageService, DictionaryService dictionaryService, UserWordRepository userWordRepository, DictionaryMetaRepository dictionaryMetaRepository) {
        this.imageService = imageService;
        this.dictionaryService = dictionaryService;
        this.userWordRepository = userWordRepository;
        this.dictionaryMetaRepository = dictionaryMetaRepository;
    }

    public Image changeSelectedImage(Long wordId, Image image) {
        UserWord userWord;
        if ((userWord = userWordRepository.findByIdAndAccountId(wordId, getUserId())) != null) {
            if ((image = imageService.getImageById(image.getId())) != null) {
                userWord.setSelectedImage(image);
                userWordRepository.save(userWord);
                return image;
            }
        }
        return null;
    }


    /**
     * return user dictionaries and number of words in it (ex. EN -> RU (20 words))
     * @return List of {@link UserDictMeta}
     */
    public List<UserDictMetaImpl> getUserDictionaryMeta() {

        List<UserDictMetaImpl> metaBasedOnDb = dictionaryMetaRepository.getByUserId(getUserId()).stream().map(UserDictMetaImpl::new).collect(Collectors.toList());
        List<UserDictMetaImpl> metaBasedOnWords = dictionaryMetaRepository.getDictionaryMeta(getUserId()).stream().map(UserDictMetaImpl::new).collect(Collectors.toList());

        for (UserDictMetaImpl metaWordsBased: metaBasedOnWords) {
            boolean contains = false;
            for (UserDictMetaImpl metaDbBased: metaBasedOnDb) {
                if (metaWordsBased.getFrom().equals(metaDbBased.getFrom()) && metaWordsBased.getTo().equals(metaDbBased.getTo())) {
                    metaDbBased.setNum(metaWordsBased.getNum());
                    contains = true;
                    break;
                }
            }
            if (!contains) {
                metaBasedOnDb.add(metaWordsBased);
                dictionaryMetaRepository.save(new DictionaryMeta(getUserId(), metaWordsBased.getFrom(), metaWordsBased.getTo()));
            }
        }

        return metaBasedOnDb;
    }

    public DictionaryMeta addNewDictionaryMeta(DictionaryMeta userDictMeta) {
        List<Language> availableFromLanguages = Arrays.asList(Language.EN, Language.RU);
        List<Language> availableToLanguages = Arrays.asList(Language.RU, Language.FR, Language.UA, Language.EN);

        if (!availableFromLanguages.contains(userDictMeta.getFrom())) {
            throw new ApiError("Not supported word language", HttpStatus.BAD_REQUEST);
        }

        if (!availableToLanguages.contains(userDictMeta.getTo())) {
            throw new ApiError("Not supported translation language", HttpStatus.BAD_REQUEST);
        }

        if (dictionaryMetaRepository.findByUserIdAndFromAndTo(getUserId(), userDictMeta.getFrom(), userDictMeta.getTo()) != null) {
            throw new ApiError("meta already exist", HttpStatus.BAD_REQUEST);
        }

        userDictMeta.setUserId(getUserId());
        return dictionaryMetaRepository.save(userDictMeta);
    }

    @Transactional
    public void deleteDictionary(DictionaryMeta userDictMeta) {
        DictionaryMeta meta = dictionaryMetaRepository.findByUserIdAndFromAndTo(getUserId(), userDictMeta.getFrom(), userDictMeta.getTo());
        if (meta == null) throw new ApiError("Meta not exist", HttpStatus.BAD_REQUEST);
        userWordRepository.deleteAllByAccountIdAndWordLanguageAndTranslationLanguage(getUserId(), userDictMeta.getFrom(), userDictMeta.getTo());
        dictionaryMetaRepository.delete(meta);
    }

}
