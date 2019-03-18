package com.lingvi.lingviserver.video.controllers;

import com.lingvi.lingviserver.video.config.ControllerPaths;
import com.lingvi.lingviserver.video.entities.primary.Show;
import com.lingvi.lingviserver.video.services.VideoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ControllerPaths.VIDEO)
public class VideoController {

    private VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping(ControllerPaths.SHOW)
    public Show createShow(@RequestBody Show show) {
        return videoService.createShow(show);
    }

    @GetMapping(ControllerPaths.SHOW)
    public List<Show> getShows() {
        return videoService.getShows();
    }

    @GetMapping(ControllerPaths.SHOW + "/{id}")
    public Show getShowById(@PathVariable Long id) {
        return videoService.getShowById(id);
    }
}
