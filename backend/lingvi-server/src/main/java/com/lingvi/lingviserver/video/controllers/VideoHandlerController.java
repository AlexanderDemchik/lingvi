package com.lingvi.lingviserver.video.controllers;

import com.lingvi.lingviserver.video.config.ControllerPaths;
import com.lingvi.lingviserver.video.entities.VideoHandlerEntry;
import com.lingvi.lingviserver.video.entities.VideoHandlerRequest;
import com.lingvi.lingviserver.video.services.VideoHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(ControllerPaths.VIDEO + "/handler")
public class VideoHandlerController {

    private VideoHandler videoHandler;

    public VideoHandlerController(VideoHandler videoHandler) {
        this.videoHandler = videoHandler;
    }

    @PostMapping("/upload/{videoId}")
    public ResponseEntity upload(@PathVariable Long videoId, @RequestHeader("Upload-Metadata") String meta, @RequestHeader("Upload-Length") long length, HttpServletRequest request) {
        return videoHandler.createUpload(videoId, meta, length, request);
    }

    @RequestMapping(path = "/upload/{uploadId}",method = RequestMethod.OPTIONS)
    public ResponseEntity uploadOptions() {
        return ResponseEntity.noContent().header("Tus-Resumable", "1.0.0").header("Tus-Version", "1.0.0").header("Tus-Extension", "creation").build();
    }

    @RequestMapping(value = "/upload/{uploadId}", method = RequestMethod.PATCH)
    public ResponseEntity proceedUpload(@PathVariable String uploadId, HttpServletRequest request) {
        return videoHandler.proceedUpload(uploadId, request);
    }

    @RequestMapping(value = "/upload/{uploadId}", method = RequestMethod.HEAD)
    public ResponseEntity resumeUpload(@PathVariable String uploadId) {
        return videoHandler.resumeUpload(uploadId);
    }

    @GetMapping(value = "/{videoId}")
    public VideoHandlerEntry getHandlerByVideoId(@PathVariable Long videoId) {
        return videoHandler.getHandlerByVideoId(videoId);
    }

    @DeleteMapping("/{videoId}")
    public ResponseEntity deleteHandlerByVideoId(@PathVariable Long videoId) {
        return videoHandler.deleteHandlerByVideoId(videoId);
    }

    @PostMapping("/{videoId}")
    public ResponseEntity updateHandler(@PathVariable Long videoId, @RequestBody VideoHandlerRequest handlerRequest) {
        return videoHandler.handleVideo(videoId, handlerRequest);
    }

}
