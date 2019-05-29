package com.lingvi.lingviserver.video.entities;

import com.lingvi.lingviserver.video.entities.handler.SelectStreamsStage;
import com.lingvi.lingviserver.video.utils.ffmpeg.Stream;

import java.util.List;

public class VideoHandlerRequest {
    private VideoHandlerStage stage;
    private SelectStreamsStage selectStreamsStage;

    public VideoHandlerRequest(VideoHandlerStage stage) {
        this.stage = stage;
    }

    public VideoHandlerRequest() {
    }

    public VideoHandlerStage getStage() {
        return stage;
    }

    public void setStage(VideoHandlerStage stage) {
        this.stage = stage;
    }

    public SelectStreamsStage getSelectStreamsStage() {
        return selectStreamsStage;
    }

    public void setSelectStreamsStage(SelectStreamsStage selectStreamsStage) {
        this.selectStreamsStage = selectStreamsStage;
    }
}
