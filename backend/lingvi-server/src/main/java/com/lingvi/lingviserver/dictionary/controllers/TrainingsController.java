package com.lingvi.lingviserver.dictionary.controllers;

import com.lingvi.lingviserver.dictionary.services.TrainingsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trainings")
public class TrainingsController {

    private TrainingsService trainingsService;

    public TrainingsController(TrainingsService trainingsService) {
        this.trainingsService = trainingsService;
    }

    @GetMapping("/wordTranslation")
    public Object getWordTranslationTrainingData() {
        return trainingsService.getWordTranslationTraining();
    }

    @GetMapping("/translationWord")
    public Object getTranslationWordTrainingData() {
        return trainingsService.getTranslationWordTraining();
    }

    @GetMapping("/listening")
    public Object getListeningTraining() {
        return trainingsService.getListeningTraining();
    }
}
