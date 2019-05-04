package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.commons.utils.LogExecutionTime;
import com.lingvi.lingviserver.commons.utils.Utils;
import com.lingvi.lingviserver.dictionary.entities.*;
import com.lingvi.lingviserver.dictionary.entities.primary.*;
import com.lingvi.lingviserver.dictionary.repositories.primary.*;
import com.lingvi.lingviserver.dictionary.utils.StorageUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
public class DictionaryService {

    private Logger logger = LoggerFactory.getLogger(DictionaryService.class);

    private YandexTranslationService yandexTranslationService;
    private WordRepository wordRepository;
    private TranslationRepository translationRepository;
    private GoogleTextToSpeechService googleTextToSpeechService;
    private SystranTranslationService systranTranslationService;
    private SoundRepository soundRepository;
    private UserWordRepository userWordRepository;
    private BingImageSearchService bingImageSearchService;
    private EspeakTranscriptionService espeakTranscriptionService;
    private ImageService imageService;
    private ImageRepository imageRepository;
    private StorageUtil storageUtil;

    private CacheManager cacheManager;

    /**
     * Self-autowired class, to use {@link Cacheable} for class methods
     */
    @Resource
    private DictionaryService dictionaryService;

    /**
     * currently it's just like a mock
     */
    private final SoundType soundType = SoundType.FEMALE_EN_GB;

    private List<Word> soundSaveInProcess = Collections.synchronizedList(new ArrayList<>());
    private List<Word> imageSaveInProcess = Collections.synchronizedList(new ArrayList<>());

    @Autowired
    DictionaryService(YandexTranslationService yandexTranslationService, WordRepository wordRepository, TranslationRepository translationRepository, GoogleTextToSpeechService googleTextToSpeechService, SystranTranslationService systranTranslationService, SoundRepository soundRepository, UserWordRepository userWordRepository, EspeakTranscriptionService espeakTranscriptionService, StorageUtil storageUtil, CacheManager cacheManager, ImageRepository imageRepository, BingImageSearchService bingImageSearchService, ImageService imageService, ImageRepository imageRepository1) {
        this.yandexTranslationService = yandexTranslationService;
        this.wordRepository = wordRepository;
        this.translationRepository = translationRepository;
        this.googleTextToSpeechService = googleTextToSpeechService;
        this.systranTranslationService = systranTranslationService;
        this.soundRepository = soundRepository;
        this.userWordRepository = userWordRepository;
        this.espeakTranscriptionService = espeakTranscriptionService;
        this.storageUtil = storageUtil;
        this.cacheManager = cacheManager;
        this.bingImageSearchService = bingImageSearchService;
        this.imageService = imageService;
        this.imageRepository = imageRepository1;
    }

    /**
     * Getting word from db or do request to api
     *
     * @param text text to be translated
     * @param from language from which translation
     * @param to language to which translation is
     */
    private Word translate(String text, Language from, Language to) {

        Word translated;
        if((translated = wordRepository.findByTextIgnoreCaseAndLanguage(text, from)) != null) {
            List<Translation> translations = translationRepository.findByWordAndLanguageAndSourceIn(translated, to, Arrays.asList(TranslationSource.TRANSLATOR, TranslationSource.DICTIONARY));
            if (translations.size() == 0) {
                CompletableFuture<Translation> translatorResponse = CompletableFuture.supplyAsync(() -> yandexTranslationService.loadTranslation(text, from, to));
                CompletableFuture<Word> dictionaryResponse = CompletableFuture.supplyAsync(() -> yandexTranslationService.loadDictionaryTranslations(text, from, to));
                CompletableFuture.allOf(translatorResponse, dictionaryResponse).join();

                try {
                    Word translatedWordFromDict = dictionaryResponse.get();
                    Translation translationFromTranslator = translatorResponse.get();
                    List<Translation> translationsFromDict;

                    if (translatedWordFromDict != null) {
                        translationsFromDict = translatedWordFromDict.getTranslations();
                        for (Translation translation: translationsFromDict) {
                            translation.setWord(translated);
                            translationRepository.save(translation);
                        }
                    }

                    translationFromTranslator.setWord(translated);
                    translationRepository.save(translationFromTranslator);
                    return translated;

                } catch (InterruptedException | ExecutionException e) {
                    e.printStackTrace();
                    throw new ApiError("Error", HttpStatus.INTERNAL_SERVER_ERROR);
                }

            } else {
                return translated;
            }
        } else {
            CompletableFuture<Translation> translatorResponse = CompletableFuture.supplyAsync(() -> yandexTranslationService.loadTranslation(text, from, to));
            CompletableFuture<Word> dictionaryResponse = CompletableFuture.supplyAsync(() -> yandexTranslationService.loadDictionaryTranslations(text, from, to));
            CompletableFuture<String> transctiptionResponse = CompletableFuture.supplyAsync(() -> espeakTranscriptionService.transcript(text));
            CompletableFuture.allOf(translatorResponse, dictionaryResponse, transctiptionResponse).join();

            try {
                translated = dictionaryResponse.get();
                Translation translationFromTranslator = translatorResponse.get();
                if (translated != null) { //if we have dictionary translations so it not just a sequence

                    if (translationFromTranslator != null) {
                        translationFromTranslator.setWord(translated);
                        translationFromTranslator.setTranslation(translationFromTranslator.getTranslation().toLowerCase());
                        translated.getTranslations().add(translationFromTranslator);
                    } else {
                        logger.error("Something wrong with translator");
                    }

                    //check asynchronously if lemma for word is exist
                    CompletableFuture<String> lemmaResponse = CompletableFuture.supplyAsync(() -> systranTranslationService.getLemma(text, from));

                    Word finalTranslated = translated;
                    lemmaResponse.thenApply((lemma -> {
                        if (lemma != null) {
                            Word lemmaWord;
                            if ((lemmaWord = wordRepository.findByTextIgnoreCaseAndLanguage(lemma, from)) != null) {
                                finalTranslated.setLemma(lemmaWord);
                            } else {
                                lemmaWord = translate(lemma, from, to);
                                finalTranslated.setLemma(lemmaWord);
                            }
                        }
                        return null;
                    }));

                    //save sound asynchronously if it is word but not sequence
                    CompletableFuture<String> audioResponse = CompletableFuture.supplyAsync(() -> googleTextToSpeechService.getAudioFromText(finalTranslated.getText(), soundType));

                    soundSaveInProcess.add(finalTranslated);
                    audioResponse.thenApply(base64Audio -> {
                        Sound sound = storageUtil.saveSoundToStorage(base64Audio);
                        sound.setWord(finalTranslated);
                        sound.setSoundType(soundType);
                        finalTranslated.getSounds().add(sound);
                        wordRepository.save(finalTranslated);
                        soundSaveInProcess.remove(finalTranslated);
                        return null;
                    });

                    saveWordImageAsync(finalTranslated, from, to);

                    Utils.setTimeout(() -> soundSaveInProcess.remove(finalTranslated), 3000);

                    wordRepository.save(translated);
                } else { //if translation from dictionary is null, then it's just a sequence, and we not save it to db
                    if (translationFromTranslator == null) throw new ApiError("Error occurred while translate word", HttpStatus.BAD_REQUEST);
                    translated = new Word(text, from, new ArrayList<>());
                    translationFromTranslator.setWord(translated);
                    translated.getTranslations().add(translationFromTranslator);
                    translated.setId(null);
                }

                if (translated.getTranscription() == null) {
                    translated.setTranscription(transctiptionResponse.get());
                }
            } catch (ExecutionException | InterruptedException e) {
                e.printStackTrace();
            }
        }

        return translated;
    }

    /**
     * It's just wrapper around {@link DictionaryService#translate(String, Language, Language)} to allow caching, because cache not correctly work with lazy initialization
     *
     * @param text text to be translated
     * @param from language from which translation
     * @param to language to which translation is
     * @return {@link WordDTO}
     */
    @Cacheable(value = "dictionary", key = "{#text,#from,#to}")
    public WordDTO cacheableTranslate(String text, Language from, Language to) {
        List<Translation> resultTranslations;
        Word word = translate(text, from, to);
        Image image = null;
        if (word.getId() != null) { //it's already saved word
            // we need translations only from translator or dictionary, cause in the future i planned add translations from user
            image = imageRepository.findFirstByWord(word);
            resultTranslations = translationRepository.findByWordAndLanguageAndSourceIn(word, to, Arrays.asList(TranslationSource.TRANSLATOR, TranslationSource.DICTIONARY));
        } else { //it's not saved sequence
            resultTranslations = word.getTranslations();
        }

        return new WordDTO(word, resultTranslations, image);
    }

    private void saveWordImageAsync(Word word, Language from, Language to) {
        CompletableFuture<List<ImageSearchResult>> imageSearchResponse = CompletableFuture.supplyAsync(() -> bingImageSearchService.findImage(word.getText()));
        imageSaveInProcess.add(word);
        imageSearchResponse.thenApply(imageSearchResult -> {
            if (imageSearchResult != null) {
                for (ImageSearchResult searchResult: imageSearchResult) {
                    imageService.create(word, searchResult.getContent(), searchResult.getExtension(), -1L);
                }
                imageSaveInProcess.remove(word);
                Objects.requireNonNull(cacheManager.getCache("dictionary")).evict(word.getText() + "," + from + "," + to);
            }
            return null;
        });
        Utils.setTimeout(() -> imageSaveInProcess.remove(word), 3000);
    }

    private List<Image> saveWordImageSync(Word word, Language from, Language to) {
        imageSaveInProcess.add(word);
        List<ImageSearchResult> imageSearchResults = bingImageSearchService.findImage(word.getText());
        List<Image> savedImages = new LinkedList<>();
        if (imageSearchResults != null) {
            for (ImageSearchResult searchResult: imageSearchResults) {
                savedImages.add(imageService.create(word, searchResult.getContent(), searchResult.getExtension(), -1L));
            }
            imageSaveInProcess.remove(word);
            Objects.requireNonNull(cacheManager.getCache("dictionary")).evict(word.getText() + "," + from + "," + to);
        }
        return savedImages;
    }
// May be it's implementation was better but ....
    /**
     * Map {@link Word} to {@link WordResponse}
     *
     * @param text text to be translated
     * @param from language from which translation
     * @param to language to which translation is
     */
    public WordResponseV2 handleUserTranslateRequestV2(String text, Language from, Language to) {

        text = text.trim();

        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
        WordDTO word = cacheableTranslate(text, from, to);
        List<TranslationResponse> resultTranslations = null;
        Image image = null;
        String soundUrl = null;

        if (word.getId() != null) {
            UserWord wordFromUserDict = userWordRepository.findByWordIdAndWordLanguageAndTranslationLanguageAndAccountId(word.getId(), from, to, userId);

            List<Translation> translationsFromUserDict = null;
            List<Long> translationsFromUserDictIds = null;

            Sound sound = soundRepository.findTop1ByWordIdAndSoundType(word.getId(), SoundType.FEMALE_EN_GB);
            if (sound != null) {
                soundUrl = sound.getRootUrl() + sound.getRelativePath();
            }

            if (wordFromUserDict != null) {
                translationsFromUserDict = wordFromUserDict.getUserTranslations();
                translationsFromUserDictIds = translationsFromUserDict.stream().map(Translation::getId).collect(Collectors.toList());
                image = wordFromUserDict.getSelectedImage();
            } else {
                image = imageRepository.findFirstByWordId(word.getId());
            }

            List<Translation> translationsFromCommonDict = translationRepository.findByWordIdAndLanguageAndSourceInOrderByPopularityDesc(word.getId(), to, Arrays.asList(TranslationSource.TRANSLATOR, TranslationSource.DICTIONARY));
            List<Translation> userTranslations = translationRepository.findByWordIdAndLanguageAndSourceInAndAddedBy(word.getId(), to, Collections.singletonList(TranslationSource.USER), userId);
            translationsFromCommonDict.addAll(userTranslations);

            if (translationsFromUserDict != null) {
                resultTranslations = translationsFromUserDict.stream().map(t -> new TranslationResponse(t, true)).collect(Collectors.toList());
                for (Translation translation : translationsFromCommonDict) {
                    if (!translationsFromUserDictIds.contains(translation.getId())) {
                        resultTranslations.add(new TranslationResponse(translation, false));
                    }
                }
            } else {
                resultTranslations = translationsFromCommonDict.stream().map(t -> new TranslationResponse(t, false)).collect(Collectors.toList());
            }
        } else {
            resultTranslations = word.getTranslations().stream().map(t -> new TranslationResponse(t, false)).collect(Collectors.toList());
        }

        return new WordResponseV2(word, resultTranslations, to, image, soundUrl);
    }

    /**
     * Map {@link Word} to {@link WordResponse}
     * Return translations already grouped by part of speech
     *
     * @param text text to be translated
     * @param from language from which translation
     * @param to language to which translation is
     */
    @LogExecutionTime
    public WordResponse handleUserTranslateRequest(String text, Language from, Language to) {

        text = text.trim();

        Long userId = getUserId();
        WordDTO word = dictionaryService.cacheableTranslate(text, from, to);
        List<Translation> resultTranslations;
        Translation defaultTranslation;
        boolean isInUserDict = false;
        Long userDictId = null;

        resultTranslations = word.getTranslations();
        if (resultTranslations.size() == 0) throw new ApiError("Can not get translation", HttpStatus.BAD_REQUEST);

        if (word.getId() != null) {
            // check if user already have word in his dictionary
            UserWord userWord;
            if ((userWord = userWordRepository.findByWordIdAndWordLanguageAndTranslationLanguageAndAccountId(word.getId(), word.getLanguage(), to, userId)) != null) {
                isInUserDict = true;
                userDictId = userWord.getId();
            }
            defaultTranslation = findDefaultTranslation(resultTranslations);
        } else {
            defaultTranslation = word.getTranslations().get(0);
            resultTranslations.remove(0);
        }

        if (resultTranslations.size() == 0) resultTranslations = null;

        return new WordResponse(word, soundRepository.findTop1ByWordIdAndSoundType(word.getId(), soundType), groupTranslationsByPartOfSpeech(resultTranslations), defaultTranslation, isInUserDict, to, userDictId);
    }

    /**
     * If word present in dictionary return link to mp3 file in storage else return base64 decoded string with mp3
     * If word present in dictionary but link to sound not found, save audio and then return link
     *
     * @param t text
     * @return {@link SoundResponse}
     *
     * @see Word
     * @see Sound
     * @see SoundType
     */
    public SoundResponse textToSpeech(String t, final Language language) {
        final String text = t.trim();
        final SoundType soundType = SoundType.FEMALE_EN_GB; //@TODO take sound type from user profile
        Sound sound;
        Word word;
        if ((word = wordRepository.findByTextIgnoreCaseAndLanguage(text, language)) != null) {
            if ((sound = soundRepository.findTop1ByWordIdAndSoundType(word.getId(), soundType)) != null) {
                return new SoundResponse(sound.getRootUrl() + sound.getRelativePath());
            } else {
                if (soundSaveInProcess.stream().filter((w -> w.getText().equalsIgnoreCase(text) && w.getLanguage().equals(language))).collect(Collectors.toList()).size() >= 1) {
                    while (true) {
                        Utils.setTimeoutSync(() -> {}, 200);
                        if (soundSaveInProcess.stream().filter((w -> w.getText().equalsIgnoreCase(text) && w.getLanguage().equals(language))).collect(Collectors.toList()).size() == 0) {
                            if ((sound = soundRepository.findTop1ByWordIdAndSoundType(word.getId(), soundType)) == null) {
                                sound = saveSound(word, soundType);
                            }
                            break;
                        }
                    }
                } else {
                    sound = saveSound(word, soundType);
                }
                if (sound != null) {
                    return new SoundResponse(sound.getRootUrl() + sound.getRelativePath());
                }
                throw new ApiError("Error occurred while getting sound for word id: " + word.getId() + " soundType: " + soundType, HttpStatus.BAD_REQUEST);
            }
        } else {
            return new SoundResponse("data:audio/mp3;base64," + googleTextToSpeechService.getAudioFromText(text, soundType));
        }
    }

    /**
     * Method to add {@link Word} to user dictionary as {@link UserWord}
     * @param text word string
     * @param from word language
     * @param to translation language
     * @param translations if need to save certain translations
     * @return ??
     */
    public Object saveWordToUserDictionary(String text, Language from, Language to, List<Translation> translations) {
        text = text.trim().toLowerCase();
        Word w;
        UserWord userWord;
        Long userId = getUserId();

        //check if word exist in dictionary
        if ((w = wordRepository.findByTextIgnoreCaseAndLanguage(text, from)) == null) {
            w = translate(text, from, to);

            if (w.getId() == null) {
                wordRepository.save(w);
                Objects.requireNonNull(cacheManager.getCache("dictionary")).evict(w.getText() + "," + from + "," + to);
            }

            List<Translation> userTranslations;
            List<Translation> wordTranslations = translationRepository.findByWordAndLanguageAndSourceIn(w, to, Arrays.asList(TranslationSource.TRANSLATOR, TranslationSource.DICTIONARY));

            if (wordTranslations.size() == 1) {
                userTranslations = wordTranslations;
            } else {
                userTranslations = filterTranslationsBeforeSaveToUserDictionary(groupTranslationsByPartOfSpeech(wordTranslations), findDefaultTranslation(wordTranslations));
            }

            userWord = new UserWord();
            userWord.setWord(w);
            userWord.getUserTranslations().addAll(userTranslations);
        } else {
            userWord = new UserWord();
            userWord.setWord(w);
            List<Translation> userTranslations = new ArrayList<>();

            if (translations != null) {
                for (Translation translation : translations) {
                    if (translation.getId() != null) {
                        Optional<Translation> optionalTranslation = translationRepository.findById(translation.getId());
                        optionalTranslation.ifPresent(userTranslations::add);
                    }
                }
            } else {
                List<Translation> wordTranslations = translationRepository.findByWordAndLanguageAndSourceIn(w, to, Arrays.asList(TranslationSource.TRANSLATOR, TranslationSource.DICTIONARY));
                Map<PartOfSpeech, List<Translation>> groupedTranslations = groupTranslationsByPartOfSpeech(wordTranslations);
                userTranslations = filterTranslationsBeforeSaveToUserDictionary(groupedTranslations, findDefaultTranslation(wordTranslations));
            }

            if (userTranslations.size() == 0) throw new ApiError("Error occured while save user word", HttpStatus.BAD_REQUEST);

            userWord.setUserTranslations(userTranslations);
        }

        userWord.setTranslationLanguage(to);
        userWord.setAccountId(userId);
        Image image = imageRepository.findFirstByWord(w);
        userWord.setSelectedImage(image);
        userWordRepository.save(userWord);

        //save image async
        if (image == null && w.getText().split(" ").length < 5) {
            Word finalW = w;
            if (imageSaveInProcess.stream().noneMatch(word -> word.getText().equals(finalW.getText()) && word.getLanguage().equals(finalW.getLanguage()))) {
                CompletableFuture<List<Image>> completableFuture = CompletableFuture.supplyAsync(() -> saveWordImageSync(finalW, from, to));
                completableFuture.thenApply(images -> {
                    userWordRepository.findById(userWord.getId()).ifPresent((uWord) -> {
                        uWord.setSelectedImage(imageRepository.findById(images.get(0).getId()).orElse(null));
                        userWordRepository.save(uWord);
                    });
                    return null;
                });
            } else {
                //in the future it will be good to change this implementation to observable
                Utils.setTimeout(() -> userWordRepository.findById(userWord.getId()).ifPresent((uWord) -> {
                    uWord.setSelectedImage(imageRepository.findFirstByWord(finalW));
                    userWordRepository.save(uWord);
                }), 5000);
            }
        }

        return userWord;
    }

    /**
     * Helper method, do request to text-to-speech api, and then try to save received audio to storage
     *
     * @param word {@link Word}
     * @param soundType {@link SoundType}
     * @return if ok - {@link Sound}, else null
     */
    private Sound saveSound(Word word, SoundType soundType) {
        Sound sound = storageUtil.saveSoundToStorage(googleTextToSpeechService.getAudioFromText(word.getText(), soundType));
        if (sound != null) {
            sound.setWord(word);
            sound.setSoundType(soundType);
            soundRepository.save(sound);
            return sound;
        }
        return null;
    }

    /**
     * Helper method to group transplations by part of speech
     *
     * @param translations list of {@link Translation}
     * @return map {@link PartOfSpeech} - list of {@link Translation}
     */
    @SuppressWarnings("ArraysAsListWithZeroOrOneArgument")
    private Map<PartOfSpeech, List<Translation>> groupTranslationsByPartOfSpeech(List<Translation> translations) {

        Map<PartOfSpeech, List<Translation>> result = null;
        if (translations != null) {
            result = new HashMap<>();
            for (Translation translation : translations) {
                if (translation.getPartOfSpeech() != null) {
                    if (result.get(translation.getPartOfSpeech()) == null) {
                        result.put(translation.getPartOfSpeech(), new ArrayList<>(Arrays.asList(translation)));
                    } else {
                        result.get(translation.getPartOfSpeech()).add(translation);
                    }
                }
            }
        }
        return result;
    }

    /**
     * @param groupedTranslations translations grouped before {@link DictionaryService#groupTranslationsByPartOfSpeech(List)}
     */
    private List<Translation> filterTranslationsBeforeSaveToUserDictionary(Map<PartOfSpeech, List<Translation>> groupedTranslations, Translation defaultTranslation) {
        List<Translation> resultTranslations = new ArrayList<>();
        List<String> addedTranslations = new ArrayList<>();

        if (defaultTranslation != null) {
            resultTranslations.add(defaultTranslation);
            addedTranslations.add(defaultTranslation.getTranslation());
        }

        if (groupedTranslations != null) {

            Set<PartOfSpeech> keySet = groupedTranslations.keySet();

            for (PartOfSpeech key: keySet) {
                Translation toBeAdded = groupedTranslations.get(key).get(0);
                if (!addedTranslations.contains(toBeAdded.getTranslation())) {
                    resultTranslations.add(toBeAdded);
                }
            }
        }
        return resultTranslations;
    }

    /**
     * Usually it will be translation from Translator
     *
     * @param translations translations in which search will proceed
     * @return {@link Translation}
     */
    private Translation findDefaultTranslation(List<Translation> translations) {
        AtomicReference<Translation> defaultTranslation = new AtomicReference<>();
        defaultTranslation.set(translations.stream().filter((translation -> translation.getSource().equals(TranslationSource.TRANSLATOR))).findFirst().orElse(null));
        if (defaultTranslation.get() == null) {
            defaultTranslation.set(translations.stream().filter((translation -> translation.getPartOfSpeech() == null)).findFirst().orElse(null));
            if (defaultTranslation.get() == null) defaultTranslation.set(translations.get(0));
        }
        return defaultTranslation.get();
    }

    /**
     * Helper method to get user id from spring context
     * @return user id
     */
    private Long getUserId() {
        return Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    /**
     * Remove word from user dictionary by word id
     * @param wordId word id
     */
    @Transactional
    public void removeWordFromUserDictionary(Long wordId) {
        userWordRepository.deleteByIdAndAccountId(wordId, getUserId());
    }

    /**
     * Remove collection of words from user dictionary by word id
     * @param wordIds collection of word ids to be deleted
     */
    @Transactional
    public void batchRemoveWordsFromUserDictionary(List<Long> wordIds) {
        Long userId = getUserId();
        for (Long id: wordIds) {
            userWordRepository.deleteByIdAndAccountId(id, userId);
        }
    }

    /**
     * @param wordId user word id
     * @return {@link UserWord}
     */
    public TranslationResponse addTranslationToUserDictionaryWord(Long wordId, Translation translation) {
        UserWord userWord = userWordRepository.findById(wordId).orElse(null);
        if (userWord == null) throw new ApiError("Word not exist in user dictionary", HttpStatus.BAD_REQUEST);

        if (translation.getId() == null) {
            translation.setSource(TranslationSource.USER);
            translation.setWord(userWord.getWord());
            translation.setAddedBy(getUserId());
            translationRepository.save(translation);
        } else {
            translation = translationRepository.findById(translation.getId()).orElse(null);
            if (translation == null) throw new ApiError("Translation not exist", HttpStatus.NOT_FOUND);
        }

        Translation finalTranslation = translation;
        if (userWord.getUserTranslations().stream().noneMatch((tr) -> tr.getId().equals(finalTranslation.getId()))) {
            userWord.getUserTranslations().add(translation);
        } else {
            throw new ApiError("Already saved", HttpStatus.BAD_REQUEST);
        }

        userWordRepository.save(userWord);
        return new TranslationResponse(translation, true);
    }

    /**
     * @param wordId word id
     * @param translationId translation id
     */
    public void removeTranslationFromUserDictionaryWord(Long wordId, Long translationId) {
        UserWord userWord = userWordRepository.findById(wordId).orElse(null);
        if(userWord == null) throw new ApiError("Word not exist in user dictionary", HttpStatus.BAD_REQUEST);

        List<Translation> userTranslations = userWord.getUserTranslations();
        if (userTranslations.size() == 1) throw new ApiError("Can not delete last translation, delete all word", HttpStatus.BAD_REQUEST);
        Translation translation = userTranslations.stream().filter(tr -> tr.getId().equals(translationId)).findFirst().orElse(null);
        if (translation == null) throw new ApiError("Unexpected error", HttpStatus.BAD_REQUEST);

        userWord.getUserTranslations().remove(translation);
        userWordRepository.save(userWord);

        //if it is translation added this user, remove translation from common dictionary
        if (translation.getSource().equals(TranslationSource.USER) && getUserId().equals(translation.getAddedBy())) {
            translationRepository.delete(translation);
        }
    }

    public UserWordSliceResponse getUserDictionaryWords(int page, int limit, String filter, Language fromLang, Language toLang) {
        filter = filter.trim();
        return new UserWordSliceResponse(userWordRepository.findByAccountIdAndWordTextLikeAndWordLanguageAndTranslationLanguage(getUserId(), "%" + filter + "%", fromLang, toLang, PageRequest.of(page, limit, Sort.Direction.DESC, "createdDate")));
    }

    public List<Long> getAllUserWordIds(String filter, Language fromLang, Language toLang) {
        filter = filter.trim();
        return userWordRepository.findAllIds(filter, fromLang, toLang, getUserId());
    }
}
