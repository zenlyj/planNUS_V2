package com.orbital.planNUS.diary;

import com.orbital.planNUS.deadline.Deadline;
import com.orbital.planNUS.task.Task;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table
public class Diary {
    @Id
    @SequenceGenerator(
            name = "diary_sequence",
            sequenceName = "diary_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "diary_sequence"
    )

    private Long id;
    private Long studentId;
    private LocalDate date;
    private String note;
    @OneToMany(mappedBy = "diary", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();
    @OneToMany(mappedBy="diary", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Deadline> deadlines = new ArrayList<>();

    public Diary() {}


    public Diary(Long studentId, LocalDate date, String note) {
        this.studentId = studentId;
        this.date = date;
        this.note = note;
    }

    public Diary(Long id, Long studentId, LocalDate date, String note, List<Task> tasks, List<Deadline> deadlines) {
        this.id = id;
        this.studentId = studentId;
        this.date = date;
        this.note = note;
        this.tasks = tasks;
        this.deadlines = deadlines;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<Deadline> getDeadlines() {
        return deadlines;
    }

    public void setDeadlines(List<Deadline> deadlines) {
        this.deadlines = deadlines;
    }

    public String toJSONString() {
        List<String> jsonTasks = tasks.stream()
                .map(task -> task.toJSONString())
                .collect(Collectors.toList());

        List<String> jsonDeadlines = deadlines.stream()
                .map(deadline -> deadline.toJSONString())
                .collect(Collectors.toList());

        return String.format("{ " +
                "\"id\": %d, " +
                "\"studentId\": %d, " +
                "\"date\": \"%s\", " +
                "\"note\": \"%s\", " +
                        "\"tasks\": %s, " +
                        "\"deadlines\": %s " +
                "}",
                id, studentId, date, note, jsonTasks, jsonDeadlines
        );
    }

    @Override
    public String toString() {
        return "Diary{" +
                "id=" + id +
                ", studentId=" + studentId +
                ", date=" + date +
                ", note='" + note + '\'' +
                '}';
    }
}
