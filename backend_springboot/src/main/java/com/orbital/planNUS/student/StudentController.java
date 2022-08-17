package com.orbital.planNUS.student;

import static com.orbital.planNUS.HTTPStatusCode.*;
import com.orbital.planNUS.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/student")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudent();
    }

    @PostMapping("/register")
    public UserResponse registerStudent(@RequestBody Student student) {
        UserResponse userResponse = new UserResponse();
        try {
            studentService.registerStudent(student);
            userResponse.setStatus(OK);
            userResponse.setMessage(String.format("%s successfully registered!", student.getUserName()));
        } catch (Exception e) {
            userResponse.setStatus(BadRequest);
            userResponse.setMessage(e.getMessage());
        } finally {
            return userResponse;
        }
    }

    @PostMapping("/authenticate")
    public UserResponse authenticateStudent(@RequestBody Student student) {
        UserResponse userResponse = new UserResponse();
        try {
            Student studentDB = studentService.authenticateStudent(student);
            userResponse.setStatus(OK);
            userResponse.setMessage(String.format("%s successfully authenticated!", student.getUserName()));
            userResponse.setData(studentDB.toJSONString());
        } catch (Exception e) {
            userResponse.setStatus(Unauthorized);
            userResponse.setMessage(e.getMessage());
        } finally {
            return userResponse;
        }
    }
}
