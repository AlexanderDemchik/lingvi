package com.lingvi.lingviserver.video.repositories.primary;

import com.lingvi.lingviserver.video.entities.primary.Show;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowRepository extends CrudRepository<Show, Long> {
    List<Show> findAll();
}
