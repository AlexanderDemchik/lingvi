package com.lingvi.lingviserver.uploader.controllers;

import com.lingvi.lingviserver.commons.entities.primary.StorageFile;
import com.lingvi.lingviserver.uploader.services.UploaderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/uploader")
public class UploaderController {

    private UploaderService uploaderService;

    public UploaderController(UploaderService uploaderService) {
        this.uploaderService = uploaderService;
    }

    @PostMapping()
    public ResponseEntity upload(@RequestHeader("Upload-Metadata") String meta, @RequestHeader("Upload-Length") long length, HttpServletRequest request) {
        return uploaderService.createUpload(meta, length, request);
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity uploadOptions() {
        return ResponseEntity.noContent().header("Tus-Resumable", "1.0.0").header("Tus-Version", "1.0.0").header("Tus-Extension", "creation").build();
    }

    @RequestMapping(value = "/{uploadId}", method = RequestMethod.PATCH)
    public ResponseEntity proceedUpload(@PathVariable String uploadId, HttpServletRequest request) {
        return uploaderService.proceedUpload(uploadId, request);
    }

    @RequestMapping(value = "/{uploadId}", method = RequestMethod.HEAD)
    public ResponseEntity resumeUpload(@PathVariable String uploadId) {
        return uploaderService.resumeUpload(uploadId);
    }

    @DeleteMapping(value = "/{uploadId}")
    public ResponseEntity deleteUpload(@PathVariable String uploadId) {
        return uploaderService.deleteUpload(uploadId);
    }

    @GetMapping(value = "/{uploadId}")
    public StorageFile getFileFromUpload(@PathVariable String uploadId) {
        return uploaderService.getFileFromUpload(uploadId);
    }
}
