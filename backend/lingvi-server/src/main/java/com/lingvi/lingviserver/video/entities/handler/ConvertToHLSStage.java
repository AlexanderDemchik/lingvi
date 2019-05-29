package com.lingvi.lingviserver.video.entities.handler;

import com.lingvi.lingviserver.video.utils.ffmpeg.HLSResult;

public class ConvertToHLSStage {
    private double progress;
    private String resultFilePath;
    private HLSResult hlsResult;

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

    public HLSResult getHlsResult() {
        return hlsResult;
    }

    public void setHlsResult(HLSResult hlsResult) {
        this.hlsResult = hlsResult;
    }
}
