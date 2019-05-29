package com.lingvi.lingviserver.video.utils.ffmpeg;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HLSResult {
    private String masterPlaylistPath;
    private List<HLSEntry> hlsEntryList;

    public HLSResult(String masterPlaylistPath, List<HLSEntry> hlsEntryList) {
        this.masterPlaylistPath = masterPlaylistPath;
        this.hlsEntryList = hlsEntryList;
    }

    public HLSResult() {
    }

    public String getMasterPlaylistPath() {
        return masterPlaylistPath;
    }

    public void setMasterPlaylistPath(String masterPlaylistPath) {
        this.masterPlaylistPath = masterPlaylistPath;
    }

    public List<HLSEntry> getHlsEntryList() {
        return hlsEntryList;
    }

    public void setHlsEntryList(List<HLSEntry> hlsEntryList) {
        this.hlsEntryList = hlsEntryList;
    }
}
