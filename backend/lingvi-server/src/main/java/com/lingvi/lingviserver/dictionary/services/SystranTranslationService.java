package com.lingvi.lingviserver.dictionary.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.lingvi.lingviserver.commons.utils.LogExecutionTime;
import com.lingvi.lingviserver.dictionary.config.SystranProperties;
import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Allows get word lemmas
 * @see TranslationService
 */
@Service
public class SystranTranslationService implements TranslationService {

    private Logger logger = LoggerFactory.getLogger(SystranTranslationService.class);

    private final String KEY_PARAM_NAME = "key";
    private final String TEXT_PARAM_NAME = "input";
    private final String LANG_PARAM_NAME = "lang";

    private SystranProperties systranProperties;

    public SystranTranslationService(SystranProperties systranProperties) {
        this.systranProperties = systranProperties;
    }

    @Override
    public Translation loadTranslation(String word, Language fromLang, Language toLang) {
        return null;
    }

    @Override
    public Word loadDictionaryTranslations(String word, Language fromLang, Language toLang) {
        return null;
    }

    /**
     * @param word word
     * @param lang language
     * @return lemma word string
     */
    @LogExecutionTime
    public String getLemma(String word, Language lang) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(systranProperties.getLemmaUrl())
                .queryParam(KEY_PARAM_NAME, systranProperties.getApiKey())
                .queryParam(LANG_PARAM_NAME, lang.getValue())
                .queryParam(TEXT_PARAM_NAME, word);

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<JsonNode> httpResponse = restTemplate.exchange(uriComponentsBuilder.build().toUri(), HttpMethod.GET, null, JsonNode.class);
            JsonNode response = httpResponse.getBody();

            if (response != null) {
                if (response.get("lemmas").size() == 1) {
                    int startI = response.get("lemmas").get(0).get("start").intValue();
                    int endI = response.get("lemmas").get(0).get("end").intValue();
                    if (startI == 0 && endI == word.length()) {
                        String lemma = response.get("lemmas").get(0).get("lemma").textValue();
                        if (!lemma.equalsIgnoreCase(word)) {
                            return response.get("lemmas").get(0).get("lemma").textValue();
                        }
                    }
                }
            }
        } catch (HttpServerErrorException e) {
            logger.warn("Systran api responsed with code: " + e.getRawStatusCode());
        }
        return null;
    }
}
