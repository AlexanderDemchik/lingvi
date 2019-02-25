package com.lingvi.lingviserver.dictionary.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.commons.utils.StorageUtil;
import com.lingvi.lingviserver.dictionary.config.GoogleApiProperties;
import com.lingvi.lingviserver.dictionary.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.SoundType;
import com.lingvi.lingviserver.dictionary.entities.primary.Sound;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.UUID;

@Service
public class GoogleTextToSpeechService {

    private GoogleApiProperties googleApiProperties;
    private StorageUtil storageUtil;

    private final String KEY_PARAM_NAME = "key";

    public GoogleTextToSpeechService(GoogleApiProperties googleApiProperties, StorageUtil storageUtil) {
        this.googleApiProperties = googleApiProperties;
        this.storageUtil = storageUtil;
    }

    public Sound getAudioFromText(String text, Language language) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(googleApiProperties.getTextToSpeechUrl())
                .queryParam(KEY_PARAM_NAME, googleApiProperties.getApiKey());

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<JsonNode> httpResponse = restTemplate.exchange(uriComponentsBuilder.toUriString(), HttpMethod.POST, new HttpEntity<>(buildRequestObject(text)), JsonNode.class);

        JsonNode response = httpResponse.getBody();

        if (response != null && response.get("audioContent") != null) {
            String base64EncodedAudio = response.get("audioContent").textValue();
            try {
                String path = UUID.randomUUID() + ".mp3";
                path = "/" + path.substring(0, 1) + "/" + path.substring(1,2) + "/" + path;
                String pathFromResponse = storageUtil.saveSoundToStorage(path, base64EncodedAudio);
                return new Sound(SoundType.FEMALE_EN_GB, storageUtil.getSTORAGE_URL(), pathFromResponse);
            } catch (ApiError e) {
                return null;
            }
        }

        return null;
    }


    private String buildRequestObject(String text) {
        return "{\n" +
                "    \"input\": {\n" +
                "      \"text\":\"" + text + "\",\n" +
                "    },\n" +
                "    \"voice\":{\n" +
                "      \"languageCode\":\"en-gb\",\n" +
                "      \"name\":\"en-GB-Standard-A\",\n" +
                "      \"ssmlGender\":\"FEMALE\"\n" +
                "    },\n" +
                "    \"audioConfig\":{\n" +
                "      \"audioEncoding\":\"MP3\"\n" +
                "    }\n" +
                "}";
    }
}
