package com.lingvi.lingviserver.dictionary.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class DictionaryServiceTest {

    private DictionaryService dictionaryService;

    @Before
    public void before() {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0");
        HttpEntity requestEntity = new HttpEntity(headers);
        ResponseEntity<byte[]> responseEntity = restTemplate.exchange("http://cdn1.sciencefiction.com/wp-content/uploads/2014/12/reboot1.jpg", HttpMethod.GET, requestEntity, byte[].class);
    }

    @Test
    public void test() {
        System.out.println("ssss?sss.Sss".replaceAll("[.,!?/]", ""));
    }
}
