package com.lingvi.lingviserver.uploader.services;

import com.lingvi.lingviserver.commons.config.LocalStorageConfig;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.commons.repositories.primary.StorageFileRepository;
import com.lingvi.lingviserver.commons.utils.Utils;
import com.lingvi.lingviserver.uploader.entities.Upload;
import com.lingvi.lingviserver.commons.entities.primary.StorageFile;
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
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class UploaderService {
    private LocalStorageConfig localStorageConfig;
    private StorageFileRepository storageFileRepository;

    private List<Upload> uploads = new CopyOnWriteArrayList<>();

    public UploaderService(LocalStorageConfig localStorageConfig, StorageFileRepository storageFileRepository) {
        this.localStorageConfig = localStorageConfig;
        this.storageFileRepository = storageFileRepository;
    }

    public ResponseEntity createUpload(String meta, long length, HttpServletRequest httpServletRequest) {
        Map<String, String> metaMap = convertUploadMetaToMap(meta);
        Upload upload = new Upload(metaMap.get("filename"), length);

        String fileName = upload.getId();
        if (upload.getOriginalFileName() != null) fileName += "." + Utils.getExtension(upload.getOriginalFileName());
        upload.setFileName(fileName);

        uploads.add(upload);

        try {
            return ResponseEntity.created(new URI(Utils.getRootUrl(httpServletRequest) + "/uploader/" + upload.getId())).header("Tus-Resumable", "1.0.0").build();
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

    public ResponseEntity proceedUpload(String uploadId, HttpServletRequest httpServletRequest) {
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

            StorageFile storageFile = new StorageFile();
            storageFile.setSize(upload.getOffset());
            storageFile.setOriginalFileName(upload.getOriginalFileName());


            //save file to remote
            storageFile.setRootPath(Utils.getRootUrl(httpServletRequest));
            storageFile.setRelativePath("/storage/" + upload.getFileName());

            storageFileRepository.save(storageFile);

            upload.setStorageFile(storageFile);

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

        System.out.println("offset:" + upload.getOffset());
        return ResponseEntity.ok().header("Upload-Offset", String.valueOf(upload.getOffset())).header("Upload-Length", String.valueOf(upload.getLength())).build();
    }

    public ResponseEntity deleteUpload(String uploadId) {
        Upload upload = uploads.stream().filter(u -> u.getId().equals(uploadId)).findFirst().orElse(null);
        if (upload == null) throw new ApiError("Upload not found", HttpStatus.NOT_FOUND);
        try {
            Files.delete(Paths.get(localStorageConfig.getPath() + "/" + upload.getFileName()));
            uploads.remove(upload);
        } catch (IOException e) {
            throw new ApiError("Error occurred while deleting upload " + uploadId, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    public StorageFile getFileFromUpload(String uploadId) {
        Upload upload = uploads.stream().filter(u -> u.getId().equals(uploadId)).findFirst().orElse(null);
        if (upload == null) throw new ApiError("Upload not found", HttpStatus.NOT_FOUND);
        if (upload.getStorageFile() == null) throw new ApiError("Storage file not found", HttpStatus.NOT_FOUND);
        return upload.getStorageFile();
    }
}
