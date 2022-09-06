package com.orbital.planNUS.deadline;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.orbital.planNUS.ResponseBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/deadline")
public class DeadlineController {
    private final DeadlineService deadlineService;
    private final ObjectMapper objectMapper;

    @Autowired
    public DeadlineController(DeadlineService deadlineService, ObjectMapper objectMapper) {
        this.deadlineService = deadlineService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<ResponseBody> getStudentDeadlines(@RequestParam Long studentId) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully retrieved deadlines!");
            List<String> jsonDeadlines = new ArrayList<>();
            for (Deadline deadline : deadlineService.getStudentDeadlines(studentId)) {
                jsonDeadlines.add(objectMapper.writeValueAsString(deadline));
            }
            responseBody.setData(jsonDeadlines.toString());
        } catch(Exception e) {
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
        } finally {
            return res.body(responseBody);
        }
    }

    @PostMapping
    public ResponseEntity<ResponseBody> addNewDeadline(@RequestBody Deadline deadline) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            deadlineService.addNewDeadline(deadline);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully added deadline!");
            responseBody.setData(objectMapper.writeValueAsString(deadline));
        } catch(Exception e) {
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
        } finally {
            return res.body(responseBody);
        }
    }

    @DeleteMapping
    public ResponseEntity<ResponseBody> deleteDeadline(@RequestParam Long id) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            Deadline deletedDeadline = deadlineService.deleteDeadline(id);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully deleted deadline!");
            responseBody.setData(objectMapper.writeValueAsString(deletedDeadline));
        } catch (Exception e) {
            responseBody.setStatus(BAD_REQUEST);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }

    @PutMapping
    public ResponseEntity<ResponseBody> updateDeadline(@RequestParam Long id, @RequestBody Deadline deadline) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            deadlineService.updateDeadline(id, deadline);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully updated deadline!");
        } catch (Exception e) {
            responseBody.setStatus(BAD_REQUEST);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }
}
