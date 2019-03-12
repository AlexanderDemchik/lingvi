package com.lingvi.lingviserver.video.services;

import com.lingvi.lingviserver.video.entities.primary.Video;
import com.lingvi.lingviserver.video.repositories.VideoRepository;
import org.springframework.stereotype.Service;

@Service
public class VideoService {

    private VideoRepository videoRepository;

    public Video createVideo(Video video) {
        if (video.getLink() != null) {

        }

        return videoRepository.save(video);
    }
}
