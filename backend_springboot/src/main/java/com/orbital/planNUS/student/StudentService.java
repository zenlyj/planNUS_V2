package com.orbital.planNUS.student;

import com.orbital.planNUS.exception.ServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService implements UserDetailsService {
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public StudentService(StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    public void registerStudent(Student student) throws ServerException {
        boolean studentExists = studentRepository
                .findStudentByUsername(student.getUserName())
                .isPresent();
        if (studentExists) {
            throw new ServerException("Username is taken!");
        }
        String encodedPassword = passwordEncoder.encode(student.getPassword());
        student.setPassword(encodedPassword);
        studentRepository.save(student);
    }

    public Student getStudent(String username) throws ServerException {
        Optional<Student> search = studentRepository.findStudentByUsername(username);
        if (search.isEmpty()) {
            throw new ServerException("No such student!");
        }
        return search.get();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Student> search = studentRepository.findStudentByUsername(username);
        if (search.isEmpty()) {
            throw new UsernameNotFoundException("User not found in database");
        }
        Student student = search.get();
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(student.getRole().getName()));
        return new User(student.getUserName(), student.getPassword(), authorities);
    }
}
