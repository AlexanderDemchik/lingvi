package com.lingvi.lingviserver.dictionary.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.dictionary.entities.primary.Sound;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
public class StorageUtil {

    final private String STORAGE_URL = "http://localhost";
    final private String AUDIO_URL = "/audio";

    /**
     * @param data base64 encoded mp3 auiio
     * @return {@link Sound}
     */
    public Sound saveSoundToStorage(String data) {
        String path = UUID.randomUUID() + ".mp3";
        path = "/" + path.substring(0, 1) + "/" + path.substring(1,2) + "/" + path;
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode rootNode = mapper.createObjectNode();
        rootNode.put("audioContent", data);
        HttpEntity<JsonNode> entity = new HttpEntity<>(rootNode);

        ResponseEntity<JsonNode> responseEntity = restTemplate.exchange(STORAGE_URL + AUDIO_URL + path, HttpMethod.POST, entity, JsonNode.class);

        if (responseEntity.getStatusCodeValue() != 200) throw new ApiError("Error save sound", HttpStatus.BAD_REQUEST);

        return new Sound(null, STORAGE_URL, AUDIO_URL + path);
    }

    public String getSTORAGE_URL() {
        return STORAGE_URL;
    }
}
