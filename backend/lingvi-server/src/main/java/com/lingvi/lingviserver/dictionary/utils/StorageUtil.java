package com.lingvi.lingviserver.dictionary.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.commons.utils.Utils;
import com.lingvi.lingviserver.dictionary.entities.primary.Image;
import com.lingvi.lingviserver.dictionary.entities.primary.Sound;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class StorageUtil {

    final private String STORAGE_URL = "http://localhost";
    final private String AUDIO_URL = "/audio";
    final private String IMAGES_URL = "/images";

    /**
     * @param data base64 encoded mp3 audio
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

    public Image saveWordImageToStorage(MultipartFile file) {
        String path = UUID.randomUUID() + Utils.detectFileExtension(file.getOriginalFilename());
        path = "/" + path.substring(0, 1) + "/" + path.substring(1, 2) + "/" + path;

        Path tempFilePath;
        try {
            tempFilePath = Files.createTempFile("", "");
            Files.write(tempFilePath, file.getBytes());
        } catch (IOException e) {
            throw new ApiError("", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", new FileSystemResource(tempFilePath));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(STORAGE_URL + IMAGES_URL + path, HttpMethod.POST, requestEntity, String.class);

        if (responseEntity.getStatusCodeValue() != 200) {
            throw new ApiError("Error occurred while save image to storage", HttpStatus.BAD_REQUEST);
        }

        return new Image(STORAGE_URL, IMAGES_URL + path);
    }

    public Image saveWordImageToStorage(byte[] fileData, String extension) {
        String path = UUID.randomUUID() + extension;
        path = "/" + path.substring(0, 1) + "/" + path.substring(1, 2) + "/" + path;

        Path tempFilePath;
        try {
            tempFilePath = Files.createTempFile("", "");
            Files.write(tempFilePath, fileData);
        } catch (IOException e) {
            throw new ApiError("", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", new FileSystemResource(tempFilePath));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        try {
            restTemplate.exchange(STORAGE_URL + IMAGES_URL + path, HttpMethod.POST, requestEntity, String.class);
        } catch (Exception e) {
            throw new ApiError("Error occurred while save image to storage", HttpStatus.BAD_REQUEST);
        }

        return new Image(STORAGE_URL, IMAGES_URL + path);
    }

    public String getSTORAGE_URL() {
        return STORAGE_URL;
    }
}
