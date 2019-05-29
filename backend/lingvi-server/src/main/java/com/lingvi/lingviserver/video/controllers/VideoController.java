package com.lingvi.lingviserver.video.controllers;

import com.lingvi.lingviserver.video.config.ControllerPaths;
import com.lingvi.lingviserver.video.entities.primary.Film;
import com.lingvi.lingviserver.video.entities.primary.Show;
import com.lingvi.lingviserver.video.services.VideoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping(ControllerPaths.FILM)
    public Film createFilm(@RequestBody Film film) {
        return videoService.createFilm(film);
    }

    @PutMapping(ControllerPaths.FILM)
    public Film updateFilm(@RequestBody Film film) {
        return videoService.updateFilm(film);
    }

    @GetMapping(ControllerPaths.FILM + "/{id}")
    public Film getFilmById(@PathVariable String id) {
        return videoService.getFilmById(id);
    }

    @DeleteMapping(ControllerPaths.FILM)
    public void deleteFilms(@RequestBody Map<String, List<Long>> body) {
        videoService.deleteFilms(body.get("ids"));
    }

    @GetMapping(ControllerPaths.FILM)
    public List<Film> getFilms() {
        return videoService.getFilms();
    }

    @GetMapping(ControllerPaths.SHOW)
    public List<Show> getShows() {
        return videoService.getShows();
    }

    @GetMapping(ControllerPaths.SHOW + "/{id}")
    public Show getShowById(@PathVariable Long id) {
        return videoService.getShowById(id);
    }


//    @PostMapping("/{id}/upload")
//    public ResponseEntity uploadVideo(@PathVariable Long id, @RequestHeader("Upload-Metadata") String meta) {
//        return videoService.createUpload(id, meta);
//    }
//
//    @RequestMapping(value = "/{id}/upload", method = RequestMethod.OPTIONS)
//    public ResponseEntity uploadOptions(@PathVariable Long id) {
//        return ResponseEntity.noContent().header("Tus-Resumable", "1.0.0").header("Tus-Version", "1.0.0").header("Tus-Extension", "creation").build();
//    }
//
//    @RequestMapping(value = "/upload/{uploadId}", method = RequestMethod.PATCH)
//    public ResponseEntity proceedUpload(@PathVariable String uploadId) {
//        return videoService.proceedUpload(uploadId);
//    }
//
//    @RequestMapping(value = "/upload/{uploadId}", method = RequestMethod.HEAD)
//    public ResponseEntity resumeUpload(@PathVariable String uploadId) {
//        return videoService.resumeUpload(uploadId);
//    }

}
