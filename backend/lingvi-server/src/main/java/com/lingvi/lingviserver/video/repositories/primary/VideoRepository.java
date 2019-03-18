package com.lingvi.lingviserver.video.repositories.primary;

import com.lingvi.lingviserver.video.entities.primary.Video;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends CrudRepository<Video, Long> {
}
