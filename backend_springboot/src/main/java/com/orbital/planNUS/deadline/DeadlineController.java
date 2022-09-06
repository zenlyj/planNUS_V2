package com.orbital.planNUS.deadline;

import com.orbital.planNUS.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.orbital.planNUS.HTTPStatusCode.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/deadline")
public class DeadlineController {
    private final DeadlineService deadlineService;

    @Autowired
    public DeadlineController(DeadlineService deadlineService) {
        this.deadlineService = deadlineService;
    }

    @GetMapping
    public ResponseEntity<ResponseBody> getStudentDeadlines(@RequestParam Long studentId) {
        ResponseBody responseBody = new ResponseBody();
        responseBody.setStatus(OK);
        responseBody.setMessage("Successfully retrieved deadlines!");
        List<String> jsonDeadlines = deadlineService.getStudentDeadlines(studentId)
                .stream()
                .map(deadline -> deadline.toJSONString())
                .collect(Collectors.toList());
        responseBody.setData(jsonDeadlines.toString());
        return ResponseEntity.ok().body(responseBody);
    }

    @PostMapping
    public ResponseEntity<ResponseBody> addNewDeadline(@RequestBody Deadline deadline) {
        ResponseBody responseBody = new ResponseBody();
        deadlineService.addNewDeadline(deadline);
        responseBody.setStatus(OK);
        responseBody.setMessage("Successfully added deadline!");
        responseBody.setData(deadline.toJSONString());
        return ResponseEntity.ok().body(responseBody);
    }

    @DeleteMapping
    public ResponseEntity<ResponseBody> deleteDeadline(@RequestParam Long id) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            Deadline deletedDeadline = deadlineService.deleteDeadline(id);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully deleted deadline!");
            responseBody.setData(deletedDeadline.toJSONString());
        } catch (Exception e) {
            responseBody.setStatus(BadRequest);
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
            responseBody.setStatus(BadRequest);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }
}
