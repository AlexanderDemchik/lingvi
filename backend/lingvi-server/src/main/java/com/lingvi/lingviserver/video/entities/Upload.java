package com.lingvi.lingviserver.video.entities;

import java.util.UUID;

public class Upload {
    private String id;
    private String originalFileName;
    private String fileName;
    private long videoId;
    private long offset;

    public Upload(long videoId, String originalFileName) {
        this.id = UUID.randomUUID().toString();
        this.videoId = videoId;
        this.originalFileName = originalFileName;
        this.offset = 0;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public long getVideoId() {
        return videoId;
    }

    public void setVideoId(long videoId) {
        this.videoId = videoId;
    }

    public long getOffset() {
        return offset;
    }

    public void setOffset(long offset) {
        this.offset = offset;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }
}
