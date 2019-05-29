package com.lingvi.lingviserver.commons.entities.primary;

import javax.persistence.*;

@Entity
public class StorageFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String originalFileName;

    @Column
    private String rootPath;

    @Column
    private String relativePath;

    @Column
    private Long size;

    public String getPath() {
        return rootPath + relativePath;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getRootPath() {
        return rootPath;
    }

    public void setRootPath(String rootPath) {
        this.rootPath = rootPath;
    }

    public String getRelativePath() {
        return relativePath;
    }

    public void setRelativePath(String relativePath) {
        this.relativePath = relativePath;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    @Override
    public String toString() {
        return "StorageFile{" +
                "id=" + id +
                ", originalFileName='" + originalFileName + '\'' +
                ", rootPath='" + rootPath + '\'' +
                ", relativePath='" + relativePath + '\'' +
                ", size=" + size +
                '}';
    }
}
