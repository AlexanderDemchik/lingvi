package com.lingvi.lingviserver.video.utils.ffmpeg;

public class Stream {
    private String originalString;
    private int order;

    public String getOriginalString() {
        return originalString;
    }

    public void setOriginalString(String originalString) {
        this.originalString = originalString;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "Stream{" +
                "originalString='" + originalString + '\'' +
                ", order=" + order +
                '}';
    }
}
