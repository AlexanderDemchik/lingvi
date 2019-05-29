package com.lingvi.lingviserver.video.utils.ffmpeg;

public class HLSEntry {
    private String resolution;
    private int quality;
    private String path; // 360/index.m3u8
    private String bitrate;
    private String maxRate;
    private String buffSize;

    public HLSEntry() {
    }

    public HLSEntry(String resolution, String path, String bitrate, String maxRate, String buffSize, int quality) {
        this.resolution = resolution;
        this.path = path;
        this.bitrate = bitrate;
        this.maxRate = maxRate;
        this.buffSize = buffSize;
        this.quality = quality;
    }

    public static HLSEntry biuld360p() {
        return new HLSEntry("480x360", "360p/segments.m3u8", "800000", "900000", "1200k", 360);
    }

    public static HLSEntry biuld480p() {
        return new HLSEntry("842x480", "480p/segments.m3u8", "1400000", "1500000", "2100k", 480);
    }

    public static HLSEntry biuld720p() {
        return new HLSEntry("1280x720", "720p/segments.m3u8", "2800000", "3000000", "4200k", 720);
    }

    public static HLSEntry biuld1080p() {
        return new HLSEntry("480x360", "360/segments.m3u8", "800000", "900000","11111k", 1080);
    }


    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getBitrate() {
        return bitrate;
    }

    public void setBitrate(String bitrate) {
        this.bitrate = bitrate;
    }

    public String getMaxRate() {
        return maxRate;
    }

    public void setMaxRate(String maxRate) {
        this.maxRate = maxRate;
    }

    public String getBuffSize() {
        return buffSize;
    }

    public void setBuffSize(String buffSize) {
        this.buffSize = buffSize;
    }

    public int getQuality() {
        return quality;
    }

    public void setQuality(int quality) {
        this.quality = quality;
    }
}
