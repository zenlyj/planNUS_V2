package com.orbital.planNUS.nusmods;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.orbital.planNUS.diary.Diary;
import com.orbital.planNUS.diary.DiaryService;
import com.orbital.planNUS.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.orbital.planNUS.nusmods.SemesterCalendar.getSemesterOneDates;

public class NUSModsBot {
    private String baseUrl = "https://api.nusmods.com/v2/";
    private String academicYear = "2022-2023";
    private int semesterNum = 1;

    public void fillLessonData(List<Lesson> lessons) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Lesson> multiDayLessons = new ArrayList<>();
        for (Lesson lesson : lessons) {
            String module = lesson.getModuleCode();
            URL url = new URL(String.format("%s%s/modules/%s.json", baseUrl, academicYear, module));
            String response = fetchData(url);
            ArrayNode timetable = getTimetable(objectMapper, response);
            int workload = getWorkLoad(objectMapper, response);
            boolean isFilled = false;
            for (int i = 0; i < timetable.size(); i++) {
                JsonNode lessonNode = timetable.get(i);
                String lessonId = lessonNode.get("classNo").asText();
                String lessonType = lessonNode.get("lessonType").asText();
                if (lesson.getLessonType().equals(lessonType) && lesson.getLessonId().equals(lessonId)) {
                    fillData(lessonNode, lesson, isFilled, workload, multiDayLessons);
                    isFilled = true;
                }
            }
        }
        lessons.addAll(multiDayLessons);
    }

    private String fetchData(URL url) throws Exception {
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        if (con.getResponseCode() != 200) {
            throw new Exception("Error fetching data from NUSMods");
        }
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        con.disconnect();
        return response.toString();
    }

    private int getWorkLoad(ObjectMapper objectMapper, String response) throws Exception {
        JsonNode node = objectMapper.readTree(response);
        ArrayNode workloadNode = (ArrayNode) node.get("workload");
        int workload = 0;
        for (int i = 0; i < workloadNode.size(); i++) {
            workload += Integer.parseInt(workloadNode.get(i).asText());
        }
        return workload;
    }

    private ArrayNode getTimetable(ObjectMapper objectMapper, String response) throws Exception {
        JsonNode node = objectMapper.readTree(response);
        ArrayNode semesterData = (ArrayNode) node.get("semesterData");
        JsonNode data = semesterData.get(semesterNum-1);
        ArrayNode timetable = (ArrayNode) data.get("timetable");
        return timetable;
    }

    private void fillData(JsonNode lessonNode, Lesson lesson, boolean isFilled, int workload, List<Lesson> multiDayLessons) {
        String startTime = lessonNode.get("startTime").asText();
        String endTime = lessonNode.get("endTime").asText();
        String day = lessonNode.get("day").asText();
        if (isFilled) {
            Lesson additional = new Lesson(lesson);
            additional.setStartTime(startTime);
            additional.setEndTime(endTime);
            additional.setDay(day);
            multiDayLessons.add(additional);
        } else {
            List<Integer> weeks = getWeeks(lessonNode);
            lesson.setStartTime(startTime);
            lesson.setEndTime(endTime);
            lesson.setWorkloadHours(workload);
            lesson.setWeeks(weeks);
            lesson.setDay(day);
        }
    }

    private List<Integer> getWeeks(JsonNode node) {
        ArrayNode weeks = (ArrayNode) node.get("weeks");
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < weeks.size(); i++) {
            res.add(Integer.parseInt(weeks.get(i).asText()));
        }
        return res;
    }
}
