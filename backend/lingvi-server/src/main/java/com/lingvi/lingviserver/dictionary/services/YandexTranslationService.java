package com.lingvi.lingviserver.dictionary.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.lingvi.lingviserver.dictionary.config.YandexTranslationApiProperties;
import com.lingvi.lingviserver.dictionary.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.PartOfSpeech;
import com.lingvi.lingviserver.dictionary.entities.TranslationSource;
import com.lingvi.lingviserver.dictionary.entities.YandexTranslateResponse;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedList;
import java.util.List;

/**
 * Used to call yandex translation api
 */
@Service
public class YandexTranslationService implements TranslationService {

    private final String KEY_PARAM_NAME = "key";
    private final String LANG_PARAM_NAME = "lang";
    private final String TEXT_PARAM_NAME = "text";
    private final String FLAGS_PARAM_NAME = "flags";

    private Logger logger = LoggerFactory.getLogger(YandexTranslationService.class);

    private YandexTranslationApiProperties.Dictionary yandexDictionaryProperties;
    private YandexTranslationApiProperties.Translate yandexTranslateProperties;

    public YandexTranslationService(YandexTranslationApiProperties.Dictionary yandexDictionaryProperties, YandexTranslationApiProperties.Translate yandexTranslateProperties) {
        this.yandexDictionaryProperties = yandexDictionaryProperties;
        this.yandexTranslateProperties = yandexTranslateProperties;
    }

    @Override
    public Translation loadTranslation(String text, Language fromLang, Language toLang) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(yandexTranslateProperties.getUrl())
                .queryParam(KEY_PARAM_NAME, yandexTranslateProperties.getApiKey())
                .queryParam(LANG_PARAM_NAME, fromLang.getValue().concat("-").concat(toLang.getValue()));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add(TEXT_PARAM_NAME, text);

        HttpEntity<MultiValueMap> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        YandexTranslateResponse responseBody = restTemplate.exchange(uriComponentsBuilder.toUriString(), HttpMethod.POST, entity, YandexTranslateResponse.class).getBody();

        if(responseBody != null) {
            switch (responseBody.getCode()) {
                case 200: return new Translation(toLang, responseBody.getText()[0], TranslationSource.TRANSLATOR);
                case 401: logger.error("Invalid api key"); break;
                case 402: logger.error("Blocked api key"); break;
                case 404: logger.error("Exceeded the daily limit on the amount of translated text"); break;
                case 413: logger.error("Exceeded the maximum text size");
            }
        }
        return null;
    }

    @Override
    public Word loadDictionaryTranslations(String text, Language fromLang, Language toLang) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(yandexDictionaryProperties.getUrl())
                .queryParam(KEY_PARAM_NAME, yandexDictionaryProperties.getApiKey())
                .queryParam(LANG_PARAM_NAME, fromLang.getValue().concat("-").concat(toLang.getValue()))
                .queryParam(TEXT_PARAM_NAME, text)
                .queryParam(FLAGS_PARAM_NAME, 13);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<JsonNode> httpResponse = restTemplate.exchange(uriComponentsBuilder.toUriString(), HttpMethod.GET, null, JsonNode.class);

        if(httpResponse.getBody() != null) {
            switch (httpResponse.getStatusCodeValue()) {
                case 200:
                    return parseDictionaryTranslations(httpResponse.getBody(), text, fromLang, toLang);
                case 401:
                    logger.error("Invalid api key");
                    break;
                case 402:
                    logger.error("Blocked api key");
                    break;
                case 404:
                    logger.error("Exceeded the daily limit on the amount of translated text");
                    break;
                case 413:
                    logger.error("Exceeded the maximum text size");
            }
        }

        return null;
    }

    private Word parseDictionaryTranslations(JsonNode node, String text, Language fromLang, Language toLang) {
        JsonNode defNode = node.get("def");
        if(defNode.size() > 0 && defNode.get(0).get("text").textValue().equals(text)) {
            List<Translation> translations = new LinkedList<>();
            JsonNode firstDef = defNode.get(0);
            Word word = new Word();
            word.setWord(text);
            word.setLanguage(fromLang);
            if (firstDef.get("ts") != null) word.setTranscription(firstDef.get("ts").textValue());

            for (JsonNode defNodeElement : defNode) {
                if (defNodeElement.get("text").textValue().equals(text)) {
                    for (JsonNode trNode : defNodeElement.get("tr")) {
                        Translation translation = new Translation(toLang, trNode.get("text").textValue(), word, TranslationSource.DICTIONARY);
                        if (trNode.get("pos") != null) {
                            translation.setPartOfSpeech(parsePartOfSpech(trNode.get("pos").textValue()));
                        }
                        translations.add(translation);
                    }
                }
            }

            word.setTranslations(translations);
            return word;
        }

        return null;
    }

    private PartOfSpeech parsePartOfSpech(String partOfSpeech) {
        switch (partOfSpeech) {
            case "noun": return PartOfSpeech.NOUN;
            case "verb": return PartOfSpeech.VERB;
            case "preposition": return PartOfSpeech.PREPOSITION;
            case "interjection": return PartOfSpeech.INTERJECTION;
            case "participle": return PartOfSpeech.PARTICIPLE;
            case "conjunction": return PartOfSpeech.CONJUNCTION;
            case "adverb": return PartOfSpeech.ADVERB;
            case "adjective": return PartOfSpeech.ADJECTIVE;
            case "pronoun": return PartOfSpeech.PRONOUN;
            default: return null;
        }
    }
}