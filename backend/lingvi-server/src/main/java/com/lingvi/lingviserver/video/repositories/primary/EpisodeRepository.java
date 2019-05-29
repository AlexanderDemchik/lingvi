package com.lingvi.lingviserver.video.repositories.primary;

import com.lingvi.lingviserver.video.entities.primary.Episode;
import com.lingvi.lingviserver.video.entities.primary.Video;
import org.springframework.data.repository.CrudRepository;

public interface EpisodeRepository extends CrudRepository<Episode, Long> {
    Episode findByVideoId(Long id);
}
