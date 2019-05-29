package com.lingvi.lingviserver.video.entities.handler;

import com.lingvi.lingviserver.video.utils.ffmpeg.Info;
import com.lingvi.lingviserver.video.utils.ffmpeg.Stream;

import java.util.ArrayList;
import java.util.List;

public class SelectStreamsStage extends Stage {
    private Info info;
    private List<Stream> selectedStreams = new ArrayList<>();

    public Info getInfo() {
        return info;
    }

    public void setInfo(Info info) {
        this.info = info;
    }

    public List<Stream> getSelectedStreams() {
        return selectedStreams;
    }

    public void setSelectedStreams(List<Stream> selectedStreams) {
        this.selectedStreams = selectedStreams;
    }
}
