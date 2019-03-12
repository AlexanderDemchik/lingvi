package com.lingvi.lingviserver.video.controllers;

import com.lingvi.lingviserver.video.config.ControllerPaths;
import com.lingvi.lingviserver.video.entities.primary.Video;
import com.lingvi.lingviserver.video.services.VideoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ControllerPaths.VIDEO)
public class VideoController {

    private VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping
    public Video createVideo(@RequestBody Video video) {
        return videoService.createVideo(video);
    }

    @PutMapping("/{videoId}")
    public void updateVideo(@PathVariable Long videoId) {

    }

    @DeleteMapping("/{videoId}")
    public void deleteVideo(@PathVariable Long videoId) {

    }

    @GetMapping("/{videoId}")
    public void getVideoById(@PathVariable Long videoId) {

    }

    @PostMapping("/{videoId}" + ControllerPaths.QUALITY)
    public void addQuality() {

    }

    @DeleteMapping("/{videoId}" + ControllerPaths.QUALITY)
    public void deleteQuality() {

    }

    @PostMapping("/{videoId}" + ControllerPaths.SUBTITLE)
    public void addSubtitle() {

    }

    @DeleteMapping("/{videoId}" + ControllerPaths.SUBTITLE)
    public void deleteSubtitle() {

    }
}
