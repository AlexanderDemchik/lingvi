package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.dictionary.config.DictionaryProperties;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Used to get transcription of word/sequence
 * Uses <a href="URL#http://espeak.sourceforge.net/">espeak</a>
 */
@Service
public class EspeakTranscriptionService {

    private DictionaryProperties dictionaryProperties;

    public EspeakTranscriptionService(DictionaryProperties dictionaryProperties) {
        this.dictionaryProperties = dictionaryProperties;
    }

    /**
     * @param word word
     * @return IPA transcription
     */
    public String transcript(String word) {
        String command = "\"" + dictionaryProperties.getEspeakPath() + "\" --ipa -q \"" + word + "\"";
        try {
            Process p = Runtime.getRuntime().exec(command);
            p.waitFor();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()))) {
                return reader.readLine().trim();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }
}
