package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.dictionary.config.DictionaryProperties;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static junit.framework.TestCase.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {EspeakTranscriptionService.class, DictionaryProperties.class})
@EnableConfigurationProperties
public class EspeakTranscriptionServiceIT {

    @Autowired
    private EspeakTranscriptionService espeakTranscriptionService;

    @Autowired
    DictionaryProperties dictionaryProperties;

    /**
     * Just check if espeak is ready to use
     */
    @Test
    public void check() {
        String word = "word";
        String transcription = null;
        transcription = espeakTranscriptionService.transcript(word);
        assertNotNull(transcription);
    }
}
