package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.commons.utils.Utils;
import com.lingvi.lingviserver.dictionary.entities.ImageSearchResult;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * Service to find images from text
 */
public interface ImageSearchService {

    /**
     * @param query query
     * @return {@link com.lingvi.lingviserver.dictionary.entities.ImageSearchResult}
     */
    List<ImageSearchResult> findImage(String query);

    default String detectExtension(MediaType mediaType, String imageUrl) {
        if (mediaType != null) {
            if (mediaType.equals(MediaType.IMAGE_JPEG)) {
                return ".jpg";
            } else if (mediaType.equals(MediaType.IMAGE_PNG)) {
                return ".png";
            }
        }

        return Utils.detectFileExtension(imageUrl);
    }

    default ImageSearchResult loadImage(String url) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0");
        HttpEntity requestEntity = new HttpEntity(headers);
        ResponseEntity<byte[]> responseEntity = restTemplate.exchange(url, HttpMethod.GET, requestEntity, byte[].class);
        return new ImageSearchResult(responseEntity.getBody(), detectExtension(responseEntity.getHeaders().getContentType(), url));
    }
}
