package com.orbital.planNUS.task;

import javax.persistence.*;

@Entity
@Table
public class Task {
    @Id
    @SequenceGenerator(
            name = "task_sequence",
            sequenceName = "task_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "task_sequence"
    )

    private Long id;
    private Long studentId;
    private Long diaryId;
    private String name;
    private String module;
    private String description;
    private int timeFrom;
    private int timeTo;
    private int week;
    private boolean isCompleted;

    public Task() {}

    public Task(Long id, Long studentId, Long diaryId, String name, String module, String description, int timeFrom, int timeTo, int week, boolean isCompleted) {
        this.id = id;
        this.studentId = studentId;
        this.diaryId = diaryId;
        this.name = name;
        this.module = module;
        this.description = description;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.week = week;
        this.isCompleted = isCompleted;
    }


    public Task(Long studentId, Long diaryId, String name, String module, String description, int timeFrom, int timeTo, int week, boolean isCompleted) {
        this.studentId = studentId;
        this.diaryId = diaryId;
        this.name = name;
        this.module = module;
        this.description = description;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.week = week;
        this.isCompleted = isCompleted;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getDiaryId() {
        return diaryId;
    }

    public void setDiaryId(Long diaryId) {
        this.diaryId = diaryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getTimeFrom() {
        return timeFrom;
    }

    public void setTimeFrom(int timeFrom) {
        this.timeFrom = timeFrom;
    }

    public int getTimeTo() {
        return timeTo;
    }

    public void setTimeTo(int timeTo) {
        this.timeTo = timeTo;
    }

    public int getWeek() {
        return week;
    }

    public void setWeek(int week) {
        this.week = week;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public String toJSONString() {
        return String.format("{" +
                "\"id\": \"%d\", " +
                "\"studentId\": \"%d\", " +
                "\"diaryId\": \"%d\", " +
                "\"name\": \"%s\", " +
                "\"module\": \"%s\", " +
                "\"description\": \"%s\", " +
                "\"timeFrom\": \"%d\", " +
                "\"timeTo\": \"%d\", " +
                "\"week\": \"%d\", " +
                "\"isCompleted\": \"%b\"" +
                "}",
                id, studentId, diaryId, name, module, description, timeFrom, timeTo, week, isCompleted);
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", studentId=" + studentId +
                ", diaryId=" + diaryId +
                ", name='" + name + '\'' +
                ", module='" + module + '\'' +
                ", description='" + description + '\'' +
                ", timeFrom=" + timeFrom +
                ", timeTo=" + timeTo +
                ", week=" + week +
                ", isCompleted=" + isCompleted +
                '}';
    }
}
