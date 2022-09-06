package com.orbital.planNUS.student;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.orbital.planNUS.ResponseBody;
import com.orbital.planNUS.role.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/student")
public class StudentController {
    private final StudentService studentService;
    private final RoleService roleService;
    private final ObjectMapper objectMapper;

    @Autowired
    public StudentController(StudentService studentService, RoleService roleService, ObjectMapper objectMapper) {
        this.studentService = studentService;
        this.roleService = roleService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<ResponseBody> getAllStudents() {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully retrieved students");
            List<String> jsonStudents = new ArrayList<>();
            for (Student student : studentService.getAllStudent()) {
                jsonStudents.add(objectMapper.writeValueAsString(student));
            }
            responseBody.setData(jsonStudents.toString());
        } catch(Exception e) {
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
        } finally {
            return res.body(responseBody);
        }
    }

    @GetMapping(value = "/{username}")
    public ResponseEntity<ResponseBody> getStudent(@PathVariable("username") String username) {
        ResponseBody responseBody = new ResponseBody();
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        try {
            Student student = studentService.getStudent(username);
            responseBody.setStatus(OK);
            responseBody.setData(objectMapper.writeValueAsString(student));
        } catch (Exception e) {
            responseBody.setStatus(BAD_REQUEST);
            res = ResponseEntity.badRequest();
            responseBody.setMessage(e.getMessage());
        } finally {
            return res.body(responseBody);
        }
    }

    @GetMapping("/token/verify")
    public ResponseEntity<ResponseBody> checkExpiry(String token) {
        ResponseBody responseBody = new ResponseBody();
        responseBody.setStatus(OK);
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        boolean isExpired = false;
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            verifier.verify(token);
        } catch (TokenExpiredException tokenExpiredException) {
            isExpired = true;
        } catch (JWTVerificationException ex) {
            responseBody.setStatus(BAD_REQUEST);
            res = ResponseEntity.badRequest();
        }
        responseBody.setData(String.format("{ \"isExpired\": %b }", isExpired));
        return res.body(responseBody);
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refreshToken = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String username = decodedJWT.getSubject();
                Student student = studentService.getStudent(username);
                String accessToken = JWT.create()
                        .withSubject(student.getUserName())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", List.of(student.getRole().getName()))
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", accessToken);
                tokens.put("refresh_token", refreshToken);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception e) {
                response.setHeader("error", e.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", e.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseBody> registerStudent(@RequestBody Student student) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            student.setRole(roleService.getStudentRole());
            studentService.registerStudent(student);
            responseBody.setStatus(OK);
            responseBody.setMessage(String.format("%s successfully registered!", student.getUserName()));
        } catch (Exception e) {
            responseBody.setStatus(BAD_REQUEST);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }
}
