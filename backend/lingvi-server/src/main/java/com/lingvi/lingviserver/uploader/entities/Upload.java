package com.lingvi.lingviserver.uploader.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lingvi.lingviserver.commons.entities.primary.StorageFile;

import java.io.OutputStream;
import java.util.Date;
import java.util.UUID;

public class Upload {
    private String id;
    private String originalFileName;
    private String fileName;
    private long offset;
    private long length;
    private Date creationDate;
    private StorageFile storageFile = null;
    private boolean needed = true;
    @JsonIgnore
    private OutputStream outputStream = null;

    public Upload(String originalFileName) {
        this.id = UUID.randomUUID().toString();
        this.originalFileName = originalFileName;
        this.offset = 0;
        this.creationDate = new Date();
    }

    public Upload(String originalFileName, long length) {
        this.id = UUID.randomUUID().toString();
        this.originalFileName = originalFileName;
        this.offset = 0;
        this.creationDate = new Date();
        this.length = length;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public long getOffset() {
        return offset;
    }

    public void setOffset(long offset) {
        this.offset = offset;
    }

    public boolean isNeeded() {
        return needed;
    }

    public void setNeeded(boolean needed) {
        this.needed = needed;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public long getLength() {
        return length;
    }

    public void setLength(long length) {
        this.length = length;
    }

    public StorageFile getStorageFile() {
        return storageFile;
    }

    public void setStorageFile(StorageFile storageFile) {
        this.storageFile = storageFile;
    }

    public OutputStream getOutputStream() {
        return outputStream;
    }

    public void setOutputStream(OutputStream outputStream) {
        this.outputStream = outputStream;
    }
}
