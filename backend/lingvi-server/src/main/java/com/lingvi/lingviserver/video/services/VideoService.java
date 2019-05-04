package com.lingvi.lingviserver.video.services;

import com.lingvi.lingviserver.commons.config.LocalStorageConfig;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.commons.utils.Utils;
import com.lingvi.lingviserver.video.entities.Upload;
import com.lingvi.lingviserver.video.entities.primary.Episode;
import com.lingvi.lingviserver.video.entities.primary.Season;
import com.lingvi.lingviserver.video.entities.primary.Show;
import com.lingvi.lingviserver.video.repositories.primary.ShowRepository;
import com.lingvi.lingviserver.video.repositories.primary.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

@Service
public class VideoService {

    private VideoRepository videoRepository;
    private ShowRepository showRepository;
    private List<Upload> uploads = new LinkedList<>();
    private LocalStorageConfig localStorageConfig;

    @Autowired
    private HttpServletRequest httpServletRequest;

    public VideoService(VideoRepository videoRepository, ShowRepository showRepository, LocalStorageConfig localStorageConfig) {
        this.videoRepository = videoRepository;
        this.showRepository = showRepository;
        this.localStorageConfig = localStorageConfig;
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

    public ResponseEntity createUpload(Long videoId, String meta) {
        Map<String, String> metaMap = convertUploadMetaToMap(meta);
        Upload upload = new Upload(videoId, metaMap.get("filename"));

        String fileName = upload.getId();
        if (upload.getOriginalFileName() != null) fileName += "." + Utils.getExtension(upload.getOriginalFileName());
        upload.setFileName(fileName);

        uploads.add(upload);

        try {
            return ResponseEntity.created(new URI(Utils.getRootUrl(httpServletRequest) + "/video/upload/" + upload.getId())).header("Tus-Resumable", "1.0.0").build();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        throw new ApiError("", HttpStatus.BAD_REQUEST);
    }

    private Map<String, String> convertUploadMetaToMap(String meta) {
        Map<String, String> result = new HashMap<>();
        String[] splittedMeta = meta.split(",");

        for (String m: splittedMeta) {
            String[] split = m.split(" ");
            result.put(split[0], new String(Base64.getDecoder().decode(split[1])));
        }

        return result;
    }

    public ResponseEntity proceedUpload(String uploadId) {
        Upload upload = uploads.stream().filter(u -> u.getId().equals(uploadId)).findFirst().orElse(null);

        if (upload == null) throw new ApiError("", HttpStatus.NOT_FOUND);

        try {
            InputStream inputStream = httpServletRequest.getInputStream();

            FileOutputStream outputStream = new FileOutputStream(new File(localStorageConfig.getPath() + "/" + upload.getFileName()), true);

            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = inputStream.read(buffer)) > 0) {
                outputStream.write(buffer, 0, bytesRead);
                upload.setOffset(upload.getOffset() + bytesRead);
            }

            outputStream.flush();
            outputStream.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.noContent().header("Upload-Offset", String.valueOf(upload.getOffset())).header("Tus-Resumable", "1.0.0").build();
    }

    public ResponseEntity resumeUpload(String uploadId) {
        Upload upload = uploads.stream().filter(u -> u.getId().equals(uploadId)).findFirst().orElse(null);

        if (upload == null) throw new ApiError("", HttpStatus.NOT_FOUND);

        return ResponseEntity.ok().header("Upload-Offset", String.valueOf(upload.getOffset())).build();
    }

}
