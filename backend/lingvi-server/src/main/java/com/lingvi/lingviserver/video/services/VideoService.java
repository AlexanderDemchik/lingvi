package com.lingvi.lingviserver.video.services;

import com.lingvi.lingviserver.commons.config.LocalStorageConfig;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.commons.repositories.primary.StorageFileRepository;
import com.lingvi.lingviserver.video.entities.primary.Episode;
import com.lingvi.lingviserver.video.entities.primary.Film;
import com.lingvi.lingviserver.video.entities.primary.Season;
import com.lingvi.lingviserver.video.entities.primary.Show;
import com.lingvi.lingviserver.video.repositories.primary.FilmRepository;
import com.lingvi.lingviserver.video.repositories.primary.ShowRepository;
import com.lingvi.lingviserver.video.repositories.primary.VideoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class VideoService {

    private VideoRepository videoRepository;
    private ShowRepository showRepository;
    private FilmRepository filmRepository;
    private StorageFileRepository storageFileRepository;

    public VideoService(VideoRepository videoRepository, ShowRepository showRepository, FilmRepository filmRepository, LocalStorageConfig localStorageConfig, StorageFileRepository storageFileRepository) {
        this.videoRepository = videoRepository;
        this.showRepository = showRepository;
        this.filmRepository = filmRepository;
        this.storageFileRepository = storageFileRepository;
    }

    public List<Film> getFilms() {
        return filmRepository.findAll();
    }

    public Film getFilmById(String key) {
        System.out.println(key);
        if (key == null) throw new ApiError("", HttpStatus.BAD_REQUEST);
        Film film = filmRepository.findByKey(key);
        if (film == null) throw new ApiError("", HttpStatus.NOT_FOUND);
        return film;
    }

    @Transactional
    public void deleteFilms(List<Long> ids) {
        if (ids == null) throw new ApiError("", HttpStatus.BAD_REQUEST);
        for (Long id: ids) {
            filmRepository.deleteById(id);
        }
    }

    public Film createFilm(Film film) {
        if (film.getKey() == null || film.getKey().trim().equals("")) throw new ApiError("", HttpStatus.BAD_REQUEST);
        if (film.getName() == null || film.getName().trim().equals("")) throw new ApiError("", HttpStatus.BAD_REQUEST);


        filmRepository.save(film);
        return film;
    }

    public Film updateFilm(Film film) {
        Film filmFromDb = filmRepository.findById(film.getId()).orElse(null);

        if (filmFromDb == null) throw new ApiError("", HttpStatus.NOT_FOUND);

        if (film.getName() != null) {
            filmFromDb.setName(film.getName().trim());
        }

        if (film.getDescription() != null) {
            filmFromDb.setDescription(film.getDescription().trim());
        }

        if (film.getPreviewPoster() != null && !filmFromDb.getPreviewPoster().getId().equals(film.getPreviewPoster().getId())) {
            filmFromDb.setPreviewPoster(film.getPreviewPoster());
        }

        if (film.getVideo().getPoster() != null) {
            filmFromDb.getVideo().setPoster(film.getVideo().getPoster());
        } else {
            if (filmFromDb.getVideo().getPoster() != null) filmFromDb.getVideo().setPoster(null);
        }

        filmRepository.save(filmFromDb);
        return filmFromDb;
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
