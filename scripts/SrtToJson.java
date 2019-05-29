import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

public class SrtToJson {

    private static String[] SRT_TAGS = {"<i>", "</i>", "<b>", "</b>", "<font>", "</font"};

    public static void main(String[] args) {
        String srtFilePath = args[0];
        String jsonFilePath = args[1].endsWith(".json") ? args[1] : args[1] + ".json";
        List<String> jsonObjects = new LinkedList<>();
        try(BufferedReader reader = new BufferedReader(new FileReader(srtFilePath)); BufferedWriter writer = new BufferedWriter(new FileWriter(jsonFilePath))) {
            List<String> lines = reader.lines().collect(Collectors.toList());
            Iterator<String> iterator = lines.iterator();
            while (iterator.hasNext()) {
                String id = iterator.next();
                String[] times = iterator.next().split("-->");
                List<String> content = new LinkedList<>();
                String next;
                while (iterator.hasNext() && !(next = iterator.next()).equals("")) {
                    if(next.contains("\"")) {
                        next = next.replace("\"", "\\\"");
                    }

                    //check srt for html tags and remove them
                    for(String tag: SRT_TAGS) {
                        if(next.contains(tag)) next = next.replace(tag, "");
                    }

                    content.add(wrapWithQuotes(next));
                }
                jsonObjects.add(createJsonObject(id, times, content));
            }

            writer.write(new String(createJsonArray(jsonObjects).getBytes("utf-8")));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static String createJsonObject(String id, String[] times, List<String> content) {
        return "{" +
                wrapWithQuotes("id") + ":" + wrapWithQuotes(id) + "," +
                wrapWithQuotes("start") + ":" + wrapWithQuotes(timeToSeconds(times[0])) + "," +
                wrapWithQuotes("end") + ":" + wrapWithQuotes(timeToSeconds(times[1])) + "," +
                wrapWithQuotes("content") + ":" + createJsonArray(content) +
                "}";
    }

    private static String wrapWithQuotes(String str) {
        return "\"" + str + "\"";
    }

    private static String createJsonArray(List<String> array) {
        return "[" + String.join(", ", array) + "]";
    }

    private static String timeToSeconds(String time) {
        String[] splitTimes = time.split(":");
        return String.valueOf(Double.parseDouble(splitTimes[0].trim()) * 60 * 60 + Double.parseDouble(splitTimes[1].trim()) * 60 + Double.parseDouble(splitTimes[2].replace(",", ".").trim()));
    }
}
