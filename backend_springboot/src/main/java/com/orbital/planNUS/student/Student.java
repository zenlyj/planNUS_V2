package com.orbital.planNUS.student;

import com.orbital.planNUS.role.Role;

import javax.persistence.*;

@Entity
@Table
public class Student {
    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )

    private Long id;
    private String userName;
    private String password;

    @ManyToOne
    @JoinColumn(name = "role")
    private Role role;

    public Student() {}

    public Student(Long id, String userName, String password) {
        this.id = id;
        this.userName = userName;
        this.password = password;
    }


    public Student(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String toJSONString() {
        return String.format("{ \"id\": \"%d\", \"userName\": \"%s\", \"role\": \"%s\"}", this.id, this.userName, this.role.getName());
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + userName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
