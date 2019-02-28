package com.lingvi.lingviserver.dictionary.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.lingvi.lingviserver.dictionary.config.SystranProperties;
import com.lingvi.lingviserver.dictionary.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class SystranTranslationService implements TranslationService {

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

    public String getLemma(String word, Language lang) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(systranProperties.getLemmaUrl())
                .queryParam(KEY_PARAM_NAME, systranProperties.getApiKey())
                .queryParam(LANG_PARAM_NAME, lang.getValue())
                .queryParam(TEXT_PARAM_NAME, word);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<JsonNode> httpResponse = restTemplate.exchange(uriComponentsBuilder.build().toUri(), HttpMethod.GET, null, JsonNode.class);

        JsonNode response = httpResponse.getBody();

        if (response != null) {
            if (response.get("lemmas").size() > 0) {
                String lemma = response.get("lemmas").get(0).get("lemma").textValue();
                if (!lemma.equals(word)) {
                    return response.get("lemmas").get(0).get("lemma").textValue();
                }
            }
        }

        return null;
    }
}
