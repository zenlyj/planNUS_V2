package com.orbital.planNUS.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    public void registerStudent(Student student) throws Exception {
        boolean studentExists = studentRepository
                .findStudentByUsername(student.getUserName())
                .isPresent();
        if (studentExists) {
            throw new Exception("Student already exists!");
        }
        String encodedPassword = new BCryptPasswordEncoder().encode(student.getPassword());
        studentRepository.save(new Student(student.getUserName(), encodedPassword));
    }

    public Student authenticateStudent(Student student) throws Exception {
        Optional<Student> search = studentRepository.findStudentByUsername(student.getUserName());
        if (search.isEmpty()) {
            throw new Exception("No such user!");
        }
        Student studentDB = search.get();
        if (!new BCryptPasswordEncoder().matches(student.getPassword(), studentDB.getPassword())) {
            throw new Exception("Incorrect password!");
        }
        return studentDB;
    }
}
