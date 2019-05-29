package com.lingvi.lingviserver.video.repositories.primary;

import com.lingvi.lingviserver.video.entities.primary.Film;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilmRepository extends CrudRepository<Film, Long> {
    List<Film> findAll();
    Film findByKey(String key);
    Film findByVideoId(Long id);
}
