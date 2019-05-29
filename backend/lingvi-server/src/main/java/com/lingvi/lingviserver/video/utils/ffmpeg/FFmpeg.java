package com.lingvi.lingviserver.video.utils.ffmpeg;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class FFmpeg {

    private String localStoragePath;

    public FFmpeg(String localStoragePath) {
        this.localStoragePath = Paths.get(localStoragePath).toString();
    }


    public Info getInfo(String filePath) {
        Info info = new Info();

        Process process;
        try {
            String[] cmd = {"ffmpeg", "-i", Paths.get(filePath).toString()};
            process = Runtime.getRuntime().exec(cmd);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            List<String> lines = new LinkedList<>();

            String nextLine;
            while ((nextLine = reader.readLine()) != null) {
                lines.add(nextLine);
            }

            info.setFfmpegOutput(lines);
            for (String line: lines) {
                if (line.startsWith("    Stream")) {
                    Stream stream = new Stream();
                    stream.setOriginalString(line.trim());
                    stream.setOrder(getStreamOrder(stream.getOriginalString()));
                    info.getStreams().add(stream);
                }

                if (line.startsWith("  Duration")) {
                    for (String item: line.trim().split(",")) {
                        String[] split = item.split(":", 2);
                        split[0] = split[0].trim();
                        split[1] = split[1].trim();
                        if (split[0].equals("Duration")) {
                            info.setDuration(split[1]);
                            info.setDurationInSeconds(durationToSeconds(split[1]));
                        }
                        if (split[0].equals("bitrate")) info.setBitrate(split[1]);
                    }
                }
            }

            int exitVal = process.waitFor();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        return info;
    }

    private int getStreamOrder(String stream) {
        stream = stream.substring(10);
        System.out.println(stream);
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < stream.length(); i++) {
            if (Character.isDigit(stream.charAt(i))) {
                result.append(stream.charAt(i));
            } else {
                break;
            }
        }

        return Integer.parseInt(result.toString());
    }

    public String convertToMP4(String filePath, String outputFile, List<Stream> selectedStreams, ProgressCallback progressCallback) {
        List<String> cmd = new LinkedList<>(Arrays.asList("ffmpeg", "-i", Paths.get(filePath).toString()));
        for (Stream stream: selectedStreams) {
            cmd.add("-map");
            cmd.add("0:" + stream.getOrder());
        }
        cmd.addAll(Arrays.asList("-c:a", "aac", "-c:v", "libx264", "-s", "hd720", Paths.get(outputFile).toString()));
        Process process = null;
        try {
            process = Runtime.getRuntime().exec(cmd.toArray(new String[0]));
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()));

            String line;
            while ((line = reader.readLine()) != null) {
                if (line.startsWith("frame")) {
                    progressCallback.progressUpdate(durationToSeconds(getEncodingProgress(line)));
                }
            }

            process.waitFor();
            return outputFile;
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String getEncodingProgress(String line) {
        int startI = line.indexOf("time");
        StringBuilder result = new StringBuilder();
        for (int i = startI; i < line.length(); i++) {
            if (line.charAt(i) == '=') {
                i++;
                while (line.charAt(i) != ' ') {
                    result.append(line.charAt(i));
                    i++;
                }
                break;
            }
        }
        return result.toString();
    }

    public HLSResult convertToHls(String filePath, String outputDir, ProgressCallback progressCallback) throws IOException {
        Path path = Paths.get(outputDir);
        if (Files.exists(path)) {
            deleteDirectoryStream(path);
        }

        HLSEntry hls360 = HLSEntry.biuld360p();
        HLSEntry hls480 = HLSEntry.biuld480p();
        HLSEntry hls720 = HLSEntry.biuld720p();

        List<HLSEntry> hlsEntries = new LinkedList<>(Arrays.asList(hls360, hls480, hls720));

        Files.createDirectories(Paths.get(path.toString() + "/" + hls360.getPath()));
        Files.createDirectories(Paths.get(path.toString() + "/" + hls480.getPath()));
        Files.createDirectories(Paths.get(path.toString() + "/" + hls720.getPath()));

        List<String> cmd = new LinkedList<>(Arrays.asList("ffmpeg", "-i", Paths.get(filePath).toString()));

        for (HLSEntry hlsEntry: hlsEntries) {
            cmd.addAll(Arrays.asList("-start_number", "0", "-hls_time", "10", "-hls_list_size", "0", "-f", "hls", "-g", "48", "-keyint_min", "48", "-b:v", hlsEntry.getBitrate(), "-maxrate", hlsEntry.getMaxRate(), "-bufsize", hlsEntry.getBuffSize()));
            cmd.addAll(Arrays.asList("-s", hlsEntry.getResolution(), "-c:v", "libx264", path.resolve(Paths.get(hlsEntry.getPath())).toString()));
        }

        Process process = null;
        try {
            process = Runtime.getRuntime().exec(cmd.toArray(new String[0]));
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()));

            String line;
            while ((line = reader.readLine()) != null) {
                if (line.startsWith("frame")) {
                    progressCallback.progressUpdate(durationToSeconds(getEncodingProgress(line)));
                }
            }

            process.waitFor();

            Path masterPath = Files.createFile(path.resolve(Paths.get("master.m3u8")));
            Files.write(masterPath, constructMasterPlaylist(hlsEntries));

            return new HLSResult(masterPath.toString(), hlsEntries);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        return null;
    }

    private void deleteDirectoryStream(Path path) throws IOException {
        Files.walk(path)
                .sorted(Comparator.reverseOrder())
                .map(Path::toFile)
                .forEach(File::delete);
    }

    private List<String> constructMasterPlaylist(List<HLSEntry> hlsEntries) {
        List<String> result = new LinkedList<>();
        result.add("#EXTM3U");
        result.add("#EXT-X-VERSION:3");
        for (HLSEntry hlsEntry: hlsEntries) {
            result.add("#EXT-X-STREAM-INF:BANDWIDTH=" + hlsEntry.getBitrate() + ",RESOLUTION=" + hlsEntry.getResolution());
            result.add(hlsEntry.getPath());
        }

        return result;
    }

    private int durationToSeconds(String duration) {
        String[] split = duration.split(":");
        return Integer.parseInt(split[0]) * 60 * 60 + Integer.parseInt(split[1]) * 60 + (int)Math.round(Double.parseDouble(split[2]));

    }
}
