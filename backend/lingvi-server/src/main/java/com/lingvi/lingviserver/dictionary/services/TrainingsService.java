package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.account.entities.primary.User;
import com.lingvi.lingviserver.account.repositories.primary.UserRepository;
import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.commons.utils.Utils;
import com.lingvi.lingviserver.dictionary.entities.WordDTO;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.entities.primary.UserWord;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import com.lingvi.lingviserver.dictionary.repositories.primary.TranslationRepository;
import com.lingvi.lingviserver.dictionary.repositories.primary.UserWordRepository;
import com.lingvi.lingviserver.dictionary.repositories.primary.WordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TrainingsService {

    private UserWordRepository userWordRepository;
    private TranslationRepository translationRepository;
    private UserRepository userRepository;
    private WordRepository wordRepository;

    public TrainingsService(UserWordRepository userWordRepository, TranslationRepository translationRepository, UserRepository userRepository, WordRepository wordRepository) {
        this.userWordRepository = userWordRepository;
        this.translationRepository = translationRepository;
        this.userRepository = userRepository;
        this.wordRepository = wordRepository;
    }

    public Object getWordTranslationTraining() {
        Long userId = Utils.getUserId();
        User account = userRepository.findById(userId).orElse(null);

        if (account == null) throw new ApiError("Err", HttpStatus.BAD_REQUEST);

        List<UserWord> userWords = userWordRepository.findByAccountIdAndWordLanguageAndTranslationLanguage(Utils.getUserId(), Language.EN, account.getTranslationLanguage());
        List<Translation> translations = translationRepository.findTranslationByWordLanguageAndLanguage(Language.EN, account.getTranslationLanguage());


        List<Object> result = new ArrayList<>();

        int i = 0;
        int num = userWords.size() < 10 ? userWords.size() : 10;
        while (i < num) {
            UserWord userWord = userWords.get((int) Math.floor(Math.random() * userWords.size()));
            userWords.remove(userWord);

            int j = 0;
            List<Translation> translationsForUserWord = new ArrayList<>();
            Translation answer = userWord.getUserTranslations().get((int) Math.floor(Math.random() * userWord.getUserTranslations().size()));
            translationsForUserWord.add(answer);
            while (j < 4) {
                Translation translation = translations.get((int) Math.floor(Math.random() * translations.size()));

                if (!translation.getWord().getId().equals(userWord.getWord().getId())) {
                    if (translation.getPartOfSpeech() != null) {
                        if (!translation.getPartOfSpeech().equals(answer.getPartOfSpeech())) continue;
                    }
                    translationsForUserWord.add(translation);
                    j++;
                }
            }


            Collections.shuffle(translationsForUserWord);

            Map<String, Object> gameEntry = new HashMap<>();
            gameEntry.put("word", userWord);
            gameEntry.put("answers", translationsForUserWord);
            gameEntry.put("answer", answer.getId());

            result.add(gameEntry);
            i++;
        }

        return result;
    }

    public Object getTranslationWordTraining() {
        Long userId = Utils.getUserId();
        User account = userRepository.findById(userId).orElse(null);

        if (account == null) throw new ApiError("Err", HttpStatus.BAD_REQUEST);

        List<UserWord> userWords = userWordRepository.findByAccountIdAndWordLanguageAndTranslationLanguage(Utils.getUserId(), Language.EN, account.getTranslationLanguage());
        List<Word> words = wordRepository.findAllByLanguage(Language.EN);

        List<Object> result = new ArrayList<>();

        int i = 0;
        int num = userWords.size() < 10 ? userWords.size() : 10;
        while (i < num) {
            UserWord userWord = userWords.get((int) Math.floor(Math.random() * userWords.size()));
            userWords.remove(userWord);
            Collections.shuffle(userWord.getUserTranslations());
            Translation userTranslation = userWord.getUserTranslations().get(0);

            List<WordDTO> wordsForUserTranslation = new LinkedList<>();
            wordsForUserTranslation.add(new WordDTO(userWord.getWord()));

            int j = 0;
            while (j < 4) {
                Word word = words.get((int) Math.floor(Math.random() * words.size()));
                words.remove(word);

                if (!word.getId().equals(userWord.getWord().getId())) {
                    j++;
                    wordsForUserTranslation.add(new WordDTO(word));
                }
            }


            Collections.shuffle(wordsForUserTranslation);

            Map<String, Object> gameEntry = new HashMap<>();
            gameEntry.put("word", userWord);
            gameEntry.put("translation", userTranslation);
            gameEntry.put("answers", wordsForUserTranslation);
            gameEntry.put("answer", userWord.getWord().getId());

            result.add(gameEntry);
            i++;
        }

        return result;
    }

    public Object getListeningTraining() {
        Long userId = Utils.getUserId();
        User account = userRepository.findById(userId).orElse(null);

        if (account == null) throw new ApiError("Err", HttpStatus.BAD_REQUEST);

        List<UserWord> userWords = userWordRepository.findByAccountIdAndWordLanguageAndTranslationLanguage(Utils.getUserId(), Language.EN, account.getTranslationLanguage());

        Collections.shuffle(userWords);

        Map<String, Object> result = new HashMap<>();
        result.put("words", userWords.subList(0, userWords.size() < 10 ? userWords.size() : 10));

        return result;


    }
}
