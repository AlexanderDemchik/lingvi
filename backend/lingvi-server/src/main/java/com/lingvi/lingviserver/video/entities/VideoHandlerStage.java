package com.lingvi.lingviserver.video.entities;

public enum VideoHandlerStage {
    UPLOAD_TO_LOCAL, CONVERT_TO_MP4, CONVERT_TO_HLS, SELECT_STREAMS, CREATING_SPRITES, UPLOAD_TO_REMOTE, START_HANDLING
}
