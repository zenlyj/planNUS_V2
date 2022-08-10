package com.orbital.planNUS.task;

import javax.persistence.*;
import java.time.LocalDate;

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
    private String name;
    private String module;
    private String description;
    private String timeFrom;
    private String timeTo;
    private LocalDate date;
    private Boolean isCompleted;

    public Task() {}

    public Task(Long id, Long studentId, String name, String module, String description, String timeFrom, String timeTo, LocalDate date, Boolean isCompleted) {
        this.id = id;
        this.studentId = studentId;
        this.name = name;
        this.module = module;
        this.description = description;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.date = date;
        this.isCompleted = isCompleted;
    }


    public Task(Long studentId, String name, String module, String description, String timeFrom, String timeTo, LocalDate date, Boolean isCompleted) {
        this.studentId = studentId;
        this.name = name;
        this.module = module;
        this.description = description;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.date = date;
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

    public String getTimeFrom() {
        return timeFrom;
    }

    public void setTimeFrom(String timeFrom) {
        this.timeFrom = timeFrom;
    }

    public String getTimeTo() {
        return timeTo;
    }

    public void setTimeTo(String timeTo) {
        this.timeTo = timeTo;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(Boolean completed) {
        isCompleted = completed;
    }

    public String toJSONString() {
        return String.format("{" +
                "\"id\": \"%d\", " +
                "\"studentId\": \"%d\", " +
                "\"name\": \"%s\", " +
                "\"module\": \"%s\", " +
                "\"description\": \"%s\", " +
                "\"timeFrom\": \"%s\", " +
                "\"timeTo\": \"%s\", " +
                "\"date\": \"%s\", " +
                "\"isCompleted\": \"%b\"" +
                "}",
                id, studentId, name, module, description, timeFrom, timeTo, date.toString(), isCompleted);
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", studentId=" + studentId +
                ", name='" + name + '\'' +
                ", module='" + module + '\'' +
                ", description='" + description + '\'' +
                ", timeFrom=" + timeFrom +
                ", timeTo=" + timeTo +
                ", date=" + date.toString() +
                ", isCompleted=" + isCompleted +
                '}';
    }
}
