package com.lingvi.lingviserver.video.utils.ffmpeg;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Info {
    private List<Stream> streams = new LinkedList<>();
    private List<String> ffmpegOutput = new LinkedList<>();
    private String bitrate;
    private String duration;
    private int durationInSeconds;

    public List<Stream> getStreams() {
        return streams;
    }

    public void setStreams(List<Stream> streams) {
        this.streams = streams;
    }

    public List<String> getFfmpegOutput() {
        return ffmpegOutput;
    }

    public void setFfmpegOutput(List<String> ffmpegOutput) {
        this.ffmpegOutput = ffmpegOutput;
    }

    public String getBitrate() {
        return bitrate;
    }

    public void setBitrate(String bitrate) {
        this.bitrate = bitrate;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    @Override
    public String toString() {
        return "Info{" +
                "streams=" + streams +
                ", ffmpegOutput=" + ffmpegOutput +
                ", bitrate='" + bitrate + '\'' +
                ", duration='" + duration + '\'' +
                '}';
    }

    public int getDurationInSeconds() {
        return durationInSeconds;
    }

    public void setDurationInSeconds(int durationInSeconds) {
        this.durationInSeconds = durationInSeconds;
    }
}
