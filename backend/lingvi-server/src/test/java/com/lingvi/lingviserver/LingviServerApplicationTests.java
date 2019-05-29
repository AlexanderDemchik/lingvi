package com.lingvi.lingviserver;

import com.lingvi.lingviserver.video.utils.ffmpeg.FFmpeg;
import com.lingvi.lingviserver.video.utils.ffmpeg.Info;
import com.lingvi.lingviserver.video.utils.ffmpeg.ProgressCallback;
import com.lingvi.lingviserver.video.utils.ffmpeg.Stream;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.Arrays;

@RunWith(SpringRunner.class)
//@SpringBootTest(classes = {})
public class LingviServerApplicationTests {

    @Test
    public void contextLoads() throws IOException {

        FFmpeg ffmpeg = new FFmpeg("D:");
//        Stream stream1 = new Stream();
//        stream1.setOrder(0);
//        Stream stream2 = new Stream();
//        stream1.setOrder(1);
//        ffmpeg.convertToMP4("D:\\Avengers.Infinity.War.2018.BDRip.720.selezen.mkv", Arrays.asList(stream1, stream2), value -> {
//            System.out.println(value);
//        });
//        ffmpeg.convertToHls("D:\\Avengers.Infinity.War.2018.BDRip.720.selezen.mkv", "avengers", (value) -> {
//            System.out.println(value);
//        });
//        System.out.println(Paths.get("D:/Avengers.Infinity.War.2018.BDRip.720.selezen.mkv").toString());

    }

}

