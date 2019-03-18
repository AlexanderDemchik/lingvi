package com.lingvi.lingviserver.video.services;

import com.lingvi.lingviserver.video.entities.primary.Episode;
import com.lingvi.lingviserver.video.entities.primary.Season;
import com.lingvi.lingviserver.video.entities.primary.Show;
import com.lingvi.lingviserver.video.repositories.primary.ShowRepository;
import com.lingvi.lingviserver.video.repositories.primary.VideoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoService {

    private VideoRepository videoRepository;
    private ShowRepository showRepository;

    public VideoService(VideoRepository videoRepository, ShowRepository showRepository) {
        this.videoRepository = videoRepository;
        this.showRepository = showRepository;
    }

    public Show createShow(Show show) {
        for (Season season: show.getSeasons()) {
            season.setShow(show);
            for (Episode episode: season.getEpisodes()) {
                episode.setSeason(season);
            }
        }

        return showRepository.save(show);
    }

    public List<Show> getShows() {
        return showRepository.findAll();
    }

    public Show getShowById(Long id) {
        return showRepository.findById(id).orElse(null);
    }
}
