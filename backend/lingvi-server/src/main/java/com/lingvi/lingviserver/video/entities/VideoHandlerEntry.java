package com.lingvi.lingviserver.video.entities;

import com.lingvi.lingviserver.uploader.entities.Upload;
import com.lingvi.lingviserver.video.entities.handler.ConvertToHLSStage;
import com.lingvi.lingviserver.video.entities.handler.ConvertToMP4Stage;
import com.lingvi.lingviserver.video.entities.handler.SelectStreamsStage;
import com.lingvi.lingviserver.video.utils.ffmpeg.Info;

public class VideoHandlerEntry {
    private Upload upload;
    private VideoDTO video;
    private VideoHandlerStage stage;

    private SelectStreamsStage selectStreamsStage = new SelectStreamsStage();
    private ConvertToMP4Stage convertToMP4Stage = new ConvertToMP4Stage();
    private ConvertToHLSStage convertToHLSStage = new ConvertToHLSStage();

    public VideoHandlerEntry(Upload upload, VideoDTO video) {
        this.upload = upload;
        this.video = video;
        this.stage = VideoHandlerStage.UPLOAD_TO_LOCAL;
    }

    public Upload getUpload() {
        return upload;
    }

    public void setUpload(Upload upload) {
        this.upload = upload;
    }

    public VideoDTO getVideo() {
        return video;
    }

    public void setVideo(VideoDTO video) {
        this.video = video;
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

    public ConvertToMP4Stage getConvertToMP4Stage() {
        return convertToMP4Stage;
    }

    public void setConvertToMP4Stage(ConvertToMP4Stage convertToMP4Stage) {
        this.convertToMP4Stage = convertToMP4Stage;
    }

    public ConvertToHLSStage getConvertToHLSStage() {
        return convertToHLSStage;
    }

    public void setConvertToHLSStage(ConvertToHLSStage convertToHLSStage) {
        this.convertToHLSStage = convertToHLSStage;
    }
}
