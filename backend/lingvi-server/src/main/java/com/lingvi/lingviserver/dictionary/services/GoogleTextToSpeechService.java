package com.lingvi.lingviserver.dictionary.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.dictionary.utils.StorageUtil;
import com.lingvi.lingviserver.dictionary.config.GoogleApiProperties;
import com.lingvi.lingviserver.dictionary.entities.SoundType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Helper service to work with google textToSpeech api
 */
@Service
public class GoogleTextToSpeechService {

    private Logger logger = LoggerFactory.getLogger(GoogleTextToSpeechService.class);

    private GoogleApiProperties googleApiProperties;

    private final String KEY_PARAM_NAME = "key";

    public GoogleTextToSpeechService(GoogleApiProperties googleApiProperties, StorageUtil storageUtil) {
        this.googleApiProperties = googleApiProperties;
    }

    /**
     * Do request to google text-to-speech, get base64 encoded mp3 file and then it to storage
     *
     * @param text text
     * @param soundType sound voice
     * @return base64EncodedString
     */
    public String getAudioFromText(String text, SoundType soundType) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(googleApiProperties.getTextToSpeechUrl())
                .queryParam(KEY_PARAM_NAME, googleApiProperties.getApiKey());

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<JsonNode> httpResponse = restTemplate.exchange(uriComponentsBuilder.toUriString(), HttpMethod.POST, new HttpEntity<>(buildRequestObject(text, convertSoundType(SoundType.FEMALE_EN_GB))), JsonNode.class);

        JsonNode response = httpResponse.getBody();
        if (response != null && response.get("audioContent") != null) {
            String base64EncodedAudio = response.get("audioContent").textValue();
            try {
                return base64EncodedAudio;
            } catch (ApiError e) {
                logger.error("Error occurred with storage");
                e.printStackTrace();
                return null;
            }
        }

        logger.warn("Something wrong with google speech to text. Response: " + httpResponse);

        return null;
    }


    /**
     * Map server sound types to api types
     * @param type {@link SoundType}
     * @return api voice code
     */
    private String convertSoundType(SoundType type) {
        switch (type) {
            case FEMALE_EN_GB: return "en-GB-Standard-C";
            case MALE_EN_GB: return "en-GB-Standard-D";
            default: return "en-GB-Standard-C";
        }
    }

    private String buildRequestObject(String text, String voiceCode) {
        return "{\n" +
                "    \"input\": {\n" +
                "      \"text\":\"" + text + "\"\n" +
                "    },\n" +
                "    \"voice\":{\n" +
                "      \"languageCode\":\"" + voiceCode.substring(0,5) + "\",\n" +
                "      \"name\":\"" + voiceCode + "\"\n" +
                "    \n" +
                "    },\n" +
                "    \"audioConfig\":{\n" +
                "      \"audioEncoding\":\"MP3\"\n" +
                "    }\n" +
                "}";
    }
}
