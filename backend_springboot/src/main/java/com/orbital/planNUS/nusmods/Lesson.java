package com.orbital.planNUS.nusmods;

import com.orbital.planNUS.diary.Diary;

import java.util.List;

public class Lesson {
    private String moduleCode;
    private String lessonType;
    private String lessonId;
    private int workloadHours;
    private String startTime;
    private String endTime;
    private List<Integer> weeks;
    private String day;

    public Lesson(String moduleCode, String lessonType, String lessonId) {
        this.moduleCode = moduleCode;
        this.lessonType = lessonType;
        this.lessonId = lessonId;
        this.workloadHours = 0;
    }

    public Lesson(Lesson lesson) {
        this.moduleCode = lesson.getModuleCode();
        this.lessonType = lesson.getLessonType();
        this.lessonId = lesson.getLessonId();
        this.workloadHours = lesson.getWorkloadHours();
        this.weeks = lesson.getWeeks();
    }

    public String getModuleCode() {
        return moduleCode;
    }

    public void setModuleCode(String moduleCode) {
        this.moduleCode = moduleCode;
    }

    public String getLessonType() {
        return lessonType;
    }

    public void setLessonType(String lessonType) {
        this.lessonType = lessonType;
    }

    public String getLessonId() {
        return lessonId;
    }

    public void setLessonId(String lessonId) {
        this.lessonId = lessonId;
    }

    public int getWorkloadHours() {
        return workloadHours;
    }

    public void setWorkloadHours(int workloadHours) {
        this.workloadHours = workloadHours;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public List<Integer> getWeeks() {
        return weeks;
    }

    public void setWeeks(List<Integer> weeks) {
        this.weeks = weeks;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    @Override
    public String toString() {
        return "Lesson{" +
                "moduleCode='" + moduleCode + '\'' +
                ", lessonType='" + lessonType + '\'' +
                ", lessonId='" + lessonId + '\'' +
                ", workloadHours=" + workloadHours +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", weeks=" + weeks +
                ", day='" + day + '\'' +
                '}';
    }
}
