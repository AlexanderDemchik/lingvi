package com.lingvi.lingviserver.dictionary.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.lingvi.lingviserver.commons.utils.LogExecutionTime;
import com.lingvi.lingviserver.dictionary.config.BingSearchProperties;
import com.lingvi.lingviserver.dictionary.entities.ImageSearchResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.LinkedList;
import java.util.List;

@Service
public class BingImageSearchService implements ImageSearchService {

    private BingSearchProperties bingSearchProperties;
    private Logger logger = LoggerFactory.getLogger(BingImageSearchService.class);

    public BingImageSearchService(BingSearchProperties bingSearchProperties) {
        this.bingSearchProperties = bingSearchProperties;
    }

    @Override
    @LogExecutionTime
    public List<ImageSearchResult> findImage(String searchQuery) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(bingSearchProperties.getSearchUrl())
                .queryParam("q", searchQuery).queryParam("count", 3).queryParam("height", 300).queryParam("width", 300);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<JsonNode> responseEntity;
        try {
            responseEntity = restTemplate.exchange(URI.create(uriComponentsBuilder.toUriString()), HttpMethod.GET, buildRequestEntity(), JsonNode.class); //just uri string don't work, but URI object do - what a fuck???
        } catch (HttpClientErrorException e) {
            e.printStackTrace();
            return null;
        }
        JsonNode body;
        if (responseEntity.getStatusCodeValue() == 200 && (body = responseEntity.getBody()) != null) {
            JsonNode value = body.get("value");
            List<ImageSearchResult> searchResults = new LinkedList<>();
            for (int i = 0; i < value.size(); i++) {
               try {
                   searchResults.add(loadImageWithFallback(value.get(i).get("thumbnailUrl").textValue(), value.get(i).get("contentUrl").textValue()));
               } catch (Exception e) {
                   logger.error("Error occurred while load image from bing search");
               }
            }

            return (searchResults.size() > 0) ? searchResults : null;
        }

        logger.error("Bing image search returned " + responseEntity.getStatusCodeValue() + "code and value: " + responseEntity.getBody());
        return null;
    }

    private ImageSearchResult loadImageWithFallback(String url, String fallbackUrl) {
        try {
            return loadImage(url);
        } catch (HttpClientErrorException e) {
            return loadImage(fallbackUrl);
        }
    }

    private HttpEntity buildRequestEntity() {
        HttpHeaders headers = new HttpHeaders();
        headers.add(bingSearchProperties.getAuthorizationHeaderName(), bingSearchProperties.getApiKey());
        headers.add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0");
        return new HttpEntity(headers);
    }
}
