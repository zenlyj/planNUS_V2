package com.orbital.planNUS.nusmods;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ShareLinkParser {
    private URL link;
    private Map<String, String> lessonTypeShortToFull = new HashMap<>() {{
        put("LEC", "Lecture");
        put("TUT", "Tutorial");
        put("LAB", "Laboratory");
        put("SEC", "Sectional Teaching");
    }};

    public ShareLinkParser(String link) throws MalformedURLException {
        this.link = new URL(link);
    }

    public List<Lesson> parse() {
        String params = link.getQuery();
        String[] modules = params.split("&");
        List<Lesson> moduleDetails = new ArrayList<>();
        for (int i = 0; i < modules.length; i++) {
            String module = modules[i];
            moduleDetails.addAll(getModuleDetails(module));
        }
        return moduleDetails;
    }

    private List<Lesson> getModuleDetails(String module) {
        String[] split = module.split("=");
        String moduleCode = split[0];
        String moduleClasses = split[1];
        List<Lesson> moduleDetails = new ArrayList<>();

        String[] lessons = moduleClasses.split(",");
        for (int i = 0; i < lessons.length; i++) {
            split = lessons[i].split(":");
            String lessonType = lessonTypeShortToFull.get(split[0]);
            String lessonId = split[1];
            moduleDetails.add(new Lesson(moduleCode, lessonType, lessonId));
        }
        return moduleDetails;
    }
}
