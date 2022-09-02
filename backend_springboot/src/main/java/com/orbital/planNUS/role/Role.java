package com.orbital.planNUS.role;

import com.orbital.planNUS.student.Student;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table
public class Role {
    @Id
    @SequenceGenerator(
            name = "role_sequence",
            sequenceName = "role_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "role_sequence"
    )

    private Long id;
    private String name;

    @OneToMany(mappedBy="role", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Student> students = new ArrayList<>();

    public Role() {}

    public Role(String name) {
        this.name = name;
    }

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public String toJSONString() {
        List<String> usernames = this.students.stream()
                .map(student -> student.getUserName())
                .collect(Collectors.toList());
        return String.format("{ \"id\": \"%d\", \"name\": \"%s\", \"students\": \"%s\"}", this.id, this.name, usernames);
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", students=" + students +
                '}';
    }
}
