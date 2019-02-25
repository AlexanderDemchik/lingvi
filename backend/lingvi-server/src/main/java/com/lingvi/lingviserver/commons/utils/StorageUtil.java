package com.lingvi.lingviserver.commons.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class StorageUtil {

    final private String STORAGE_URL = "http://localhost";
    final private String AUDIO_URL = "/audio";

    /**
     * @param path relative path to file
     */
    public String saveSoundToStorage(String path, String data) {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode rootNode = mapper.createObjectNode();
        rootNode.put("audioContent", data);
        HttpEntity<JsonNode> entity = new HttpEntity<>(rootNode);

        ResponseEntity<JsonNode> responseEntity = restTemplate.exchange(STORAGE_URL + AUDIO_URL + path, HttpMethod.POST, entity, JsonNode.class);

        if (responseEntity.getBody() == null || responseEntity.getStatusCodeValue() != 200) throw new ApiError("Error save sound", HttpStatus.BAD_REQUEST);

        return responseEntity.getBody().get("path").textValue();
    }

    public String getSTORAGE_URL() {
        return STORAGE_URL;
    }
}
