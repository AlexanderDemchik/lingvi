package com.lingvi.lingviserver.video.entities.handler;

public class ConvertToMP4Stage extends Stage{
    private double progress;
    private String resultFilePath;

    public double getProgress() {
        return progress;
    }

    public void setProgress(double progress) {
        this.progress = progress;
    }

    public String getResultFilePath() {
        return resultFilePath;
    }

    public void setResultFilePath(String resultFilePath) {
        this.resultFilePath = resultFilePath;
    }
}
