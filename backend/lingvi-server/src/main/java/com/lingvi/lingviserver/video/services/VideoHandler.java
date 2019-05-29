package com.lingvi.lingviserver.video.services;

import com.lingvi.lingviserver.commons.config.LocalStorageConfig;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.commons.utils.Utils;
import com.lingvi.lingviserver.uploader.entities.Upload;
import com.lingvi.lingviserver.video.entities.*;
import com.lingvi.lingviserver.video.entities.primary.Episode;
import com.lingvi.lingviserver.video.entities.primary.Film;
import com.lingvi.lingviserver.video.entities.primary.Video;
import com.lingvi.lingviserver.video.repositories.primary.EpisodeRepository;
import com.lingvi.lingviserver.video.repositories.primary.FilmRepository;
import com.lingvi.lingviserver.video.repositories.primary.ShowRepository;
import com.lingvi.lingviserver.video.repositories.primary.VideoRepository;
import com.lingvi.lingviserver.video.utils.ffmpeg.FFmpeg;
import com.lingvi.lingviserver.video.utils.ffmpeg.HLSEntry;
import com.lingvi.lingviserver.video.utils.ffmpeg.HLSResult;
import com.lingvi.lingviserver.video.utils.ffmpeg.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@Service
public class VideoHandler {

    private List<VideoHandlerEntry> handlerEntries = new CopyOnWriteArrayList<>();
    private LocalStorageConfig localStorageConfig;
    private VideoRepository videoRepository;
    private FilmRepository filmRepository;
    private ShowRepository showRepository;
    private EpisodeRepository episodeRepository;
    private Logger logger = LoggerFactory.getLogger(VideoHandler.class);

    public VideoHandler(LocalStorageConfig localStorageConfig, VideoRepository videoRepository, FilmRepository filmRepository, ShowRepository showRepository, EpisodeRepository episodeRepository) {
        this.localStorageConfig = localStorageConfig;
        this.videoRepository = videoRepository;
        this.filmRepository = filmRepository;
        this.showRepository = showRepository;
        this.episodeRepository = episodeRepository;
    }

    public ResponseEntity createUpload(Long videoId, String meta, long length, HttpServletRequest httpServletRequest) {
        Video video = videoRepository.findById(videoId).orElse(null);
        if (video == null) throw new ApiError("", HttpStatus.BAD_REQUEST);
        if (handlerEntries.stream().anyMatch((el) -> el.getVideo().getId().equals(videoId))) throw new ApiError("Video already handles", HttpStatus.BAD_REQUEST);

        Map<String, String> metaMap = convertUploadMetaToMap(meta);
        Upload upload = new Upload(metaMap.get("filename"), length);

        String fileName = upload.getId();
        if (upload.getOriginalFileName() != null) fileName += "." + Utils.getExtension(upload.getOriginalFileName());
        upload.setFileName(fileName);

        handlerEntries.add(new VideoHandlerEntry(upload, new VideoDTO(video)));

        try {
            return ResponseEntity.created(new URI(Utils.getRootUrl(httpServletRequest) + "/video/handler/upload/" + upload.getId())).header("Tus-Resumable", "1.0.0").build();
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

    public ResponseEntity<VideoHandlerEntry> proceedUpload(String uploadId, HttpServletRequest httpServletRequest) {
        VideoHandlerEntry handlerEntry = handlerEntries.stream().filter(u -> u.getUpload().getId().equals(uploadId)).findFirst().orElse(null);

        if (handlerEntry == null) throw new ApiError("", HttpStatus.NOT_FOUND);
        try {
            handlerEntry.getUpload().setOutputStream(new FileOutputStream(new File(localStorageConfig.getPath() + "/" + handlerEntry.getUpload().getFileName()), true));
            OutputStream outputStream = handlerEntry.getUpload().getOutputStream();
            InputStream inputStream = httpServletRequest.getInputStream();

            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = inputStream.read(buffer)) > 0) {
                outputStream.write(buffer, 0, bytesRead);
                handlerEntry.getUpload().setOffset(handlerEntry.getUpload().getOffset() + bytesRead);
            }

            outputStream.flush();
            handlerEntry.setStage(VideoHandlerStage.START_HANDLING);
            new Thread(() -> {
                handleVideo(handlerEntry.getVideo().getId(), new VideoHandlerRequest(VideoHandlerStage.START_HANDLING));
            }).start();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (handlerEntry.getUpload().getOutputStream() != null) {
                try { handlerEntry.getUpload().getOutputStream().close(); } catch (IOException e) {}
            }
        }

        return ResponseEntity.noContent().header("Upload-Offset", String.valueOf(handlerEntry.getUpload().getOffset())).header("Tus-Resumable", "1.0.0").build();
    }

    public ResponseEntity resumeUpload(String uploadId) {
        VideoHandlerEntry handlerEntry = handlerEntries.stream().filter(u -> u.getUpload().getId().equals(uploadId)).findFirst().orElse(null);

        if (handlerEntry == null) throw new ApiError("", HttpStatus.NOT_FOUND);

        return ResponseEntity.ok().header("Upload-Offset", String.valueOf(handlerEntry.getUpload().getOffset())).header("Upload-Length", String.valueOf(handlerEntry.getUpload().getLength())).build();
    }

    public VideoHandlerEntry getHandlerByVideoId(Long videoId) {
        return handlerEntries.stream().filter(u -> u.getVideo().getId().equals(videoId)).findFirst().orElse(null);
    }

    public ResponseEntity handleVideo(Long videoId, VideoHandlerRequest handlerRequest) {
        FFmpeg ffmpeg = new FFmpeg(localStorageConfig.getPath());
        VideoHandlerEntry handlerEntry = handlerEntries.stream().filter(u -> u.getVideo().getId().equals(videoId)).findFirst().orElse(null);
        if (handlerEntry == null) throw new ApiError("", HttpStatus.NOT_FOUND);
        if (!handlerRequest.getStage().equals(handlerEntry.getStage())) throw new ApiError("Stages not matches", HttpStatus.BAD_REQUEST);

        switch (handlerRequest.getStage()) {
            case START_HANDLING: {
                logger.info("Start handling of video with id " + handlerEntry.getVideo().getId());
                try {
                    handlerEntry.getSelectStreamsStage().setInfo(ffmpeg.getInfo(localStorageConfig.getPath() + "/" + handlerEntry.getUpload().getFileName()));
                    handlerEntry.setStage(VideoHandlerStage.SELECT_STREAMS);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            }
            case SELECT_STREAMS: {
                List<Stream> selectedStreams = handlerRequest.getSelectStreamsStage().getSelectedStreams();
                if (selectedStreams.size() < 2) throw new ApiError("", HttpStatus.BAD_REQUEST);
                handlerEntry.getSelectStreamsStage().setSelectedStreams(handlerRequest.getSelectStreamsStage().getSelectedStreams());
                handlerEntry.getSelectStreamsStage().setStatus(true);
                handlerEntry.setStage(VideoHandlerStage.CONVERT_TO_MP4);
                CompletableFuture.supplyAsync(() -> {
                    handleVideo(handlerEntry.getVideo().getId(), new VideoHandlerRequest(VideoHandlerStage.CONVERT_TO_MP4));
                    logger.info("Start converting to mp4 of video with id " + handlerEntry.getVideo().getId());
                    return null;
                });
                return ResponseEntity.noContent().build();

            }
            case CONVERT_TO_MP4: {
                CompletableFuture.supplyAsync(() -> {
                    String outputFile = localStorageConfig.getPath() + "/" + UUID.randomUUID().toString() + ".mp4";
                    ffmpeg.convertToMP4(
                            localStorageConfig.getPath() + "/" + handlerEntry.getUpload().getFileName(),
                            outputFile,
                            handlerEntry.getSelectStreamsStage().getSelectedStreams(),
                            (value) -> handlerEntry.getConvertToMP4Stage().setProgress((value * 100.0 / handlerEntry.getSelectStreamsStage().getInfo().getDurationInSeconds())));

                    handlerEntry.getConvertToMP4Stage().setResultFilePath(outputFile);
                    handlerEntry.getConvertToMP4Stage().setStatus(true);
                    handlerEntry.setStage(VideoHandlerStage.CONVERT_TO_HLS);
                    handleVideo(handlerEntry.getVideo().getId(), new VideoHandlerRequest(VideoHandlerStage.CONVERT_TO_HLS));
                    logger.info("Start converting to hls of video with id " + handlerEntry.getVideo().getId());
                    return null;
                });
                return ResponseEntity.noContent().build();
            }
            case CONVERT_TO_HLS: {
                CompletableFuture.supplyAsync(() -> {
                    String outputDir = localStorageConfig.getPath();
                    try {
                        HLSResult hlsResult = ffmpeg.convertToHls(
                                handlerEntry.getConvertToMP4Stage().getResultFilePath(),
                                outputDir + "/" + videoId,
                                (value) -> handlerEntry.getConvertToHLSStage().setProgress((value * 100.0 / handlerEntry.getSelectStreamsStage().getInfo().getDurationInSeconds())));

                        handlerEntry.getConvertToHLSStage().setResultFilePath("/" + handlerEntry.getVideo().getId());
                        handlerEntry.getConvertToHLSStage().setHlsResult(hlsResult);
                        handlerEntry.getConvertToMP4Stage().setStatus(true);
                        handlerEntry.setStage(VideoHandlerStage.UPLOAD_TO_REMOTE);
                        handleVideo(handlerEntry.getVideo().getId(), new VideoHandlerRequest(VideoHandlerStage.UPLOAD_TO_REMOTE));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return null;
                });
                return ResponseEntity.noContent().build();
            }
            case UPLOAD_TO_REMOTE: {
                CompletableFuture.supplyAsync(() -> {
                    Video video = videoRepository.findById(handlerEntry.getVideo().getId()).orElse(null);
                    if (video != null) {
                        String rootPath = null;
                        String relativePath = null;
                        logger.error("here");
                        rootPath = "http://localhost:8080/storage";
                        relativePath = "/videos" + handlerEntry.getConvertToHLSStage().getResultFilePath() + "/master.m3u8";

                        logger.error(rootPath);
                        logger.error(relativePath);

                        ///////////
                        if (!Files.exists(Paths.get(localStorageConfig.getPath() + "/videos" + "/" + videoId))) {
                            try {
                                Files.createDirectory(Paths.get(localStorageConfig.getPath() + "/videos" + "/" + videoId));
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                        try {
                            FileSystemUtils.copyRecursively(new File(localStorageConfig.getPath() + handlerEntry.getConvertToHLSStage().getResultFilePath()), new File(localStorageConfig.getPath() + "/videos"));
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                        ////////

                        video.setRootUrl(rootPath);
                        video.setRelativePath(relativePath);
                        video.setVideoType(VideoType.HLS);
                        video.setQualities(handlerEntry.getConvertToHLSStage().getHlsResult().getHlsEntryList().stream().map(HLSEntry::getQuality).collect(Collectors.toList()));
                        video.setReady(true);
                        videoRepository.save(video);
                    } else {
                        logger.error("Error upload to remote for video with id: " + handlerEntry.getVideo().getId());
                    }
                    return null;
                });
                return ResponseEntity.noContent().build();
            }
        }
        return null;
    }

    public ResponseEntity deleteHandlerByVideoId(Long videoId) {
        VideoHandlerEntry handlerEntry = handlerEntries.stream().filter(u -> u.getVideo().getId().equals(videoId)).findFirst().orElse(null);
        if (handlerEntry == null) throw new ApiError("", HttpStatus.NOT_FOUND);
        Upload upload = handlerEntry.getUpload();
        if (upload == null) throw new ApiError("Upload not found", HttpStatus.NOT_FOUND);
        try {
            if (handlerEntry.getUpload().getOutputStream() != null) {
                try { handlerEntry.getUpload().getOutputStream().close(); } catch (IOException e) {} //close stream if one exist
            }

            Files.delete(Paths.get(localStorageConfig.getPath() + "/" + upload.getFileName()));
            handlerEntries.remove(handlerEntry);
        } catch (IOException e) {
            e.printStackTrace();
            throw new ApiError("Error occurred while deleting handler " + videoId, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}
