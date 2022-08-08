package com.orbital.planNUS.diary;

import javax.persistence.*;
import java.time.LocalDate;

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

    public Diary() {}


    public Diary(Long studentId, LocalDate date, String note) {
        this.studentId = studentId;
        this.date = date;
        this.note = note;
    }


    public Diary(Long id, Long studentId, LocalDate date, String note) {
        this.id = id;
        this.studentId = studentId;
        this.date = date;
        this.note = note;
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

    public String toJSONString() {
        return String.format("{ " +
                "\"id\": %d, " +
                "\"studentId\": %d, " +
                "\"date\": %s, " +
                "\"note\": %s " +
                "}",
                id, studentId, date, note
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
