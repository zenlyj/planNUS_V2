package com.orbital.planNUS.deadline;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table
public class Deadline {
    @Id
    @SequenceGenerator(
            name = "deadline_sequence",
            sequenceName = "deadline_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "deadline_sequence"
    )

    private Long id;
    private Long studentId;
    private String name;
    private String module;
    private LocalDate deadline;
    private String description;

    public Deadline() {}

    public Deadline(Long id, Long studentId, String name, String module, LocalDate deadline, String description) {
        this.id = id;
        this.studentId = studentId;
        this.name = name;
        this.module = module;
        this.deadline = deadline;
        this.description = description;
    }


    public Deadline(Long studentId, String name, String module, LocalDate deadline, String description) {
        this.studentId = studentId;
        this.name = name;
        this.module = module;
        this.deadline = deadline;
        this.description = description;
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

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String toJSONString() {
        return String.format("{" +
                "\"id\": \"%d\", " +
                "\"studentId\": \"%d\", " +
                "\"name\": \"%s\", " +
                "\"module\": \"%s\", " +
                "\"deadline\": \"%s\", " +
                "\"description\": \"%s\"" +
                "}",
                id, studentId, name, module, deadline, description);
    }

    @Override
    public String toString() {
        return "Deadline{" +
                "id=" + id +
                ", studentId=" + studentId +
                ", name='" + name + '\'' +
                ", module='" + module + '\'' +
                ", deadline=" + deadline +
                ", description='" + description + '\'' +
                '}';
    }
}
