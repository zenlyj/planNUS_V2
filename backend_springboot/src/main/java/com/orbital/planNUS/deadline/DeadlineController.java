package com.orbital.planNUS.deadline;

import com.orbital.planNUS.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
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
    public UserResponse getStudentDeadlines(@RequestParam Long studentId) {
        UserResponse userResponse = new UserResponse();
        userResponse.setStatus(OK);
        userResponse.setMessage("Successfully retrieved deadlines!");
        List<String> jsonDeadlines = deadlineService.getStudentDeadlines(studentId)
                .stream()
                .map(deadline -> deadline.toJSONString())
                .collect(Collectors.toList());
        userResponse.setData(jsonDeadlines.toString());
        return userResponse;
    }

    @PostMapping
    public UserResponse addNewDeadline(@RequestBody Deadline deadline) {
        UserResponse userResponse = new UserResponse();
        deadlineService.addNewDeadline(deadline);
        userResponse.setStatus(OK);
        userResponse.setMessage("Successfully added deadline!");
        userResponse.setData(deadline.toJSONString());
        return userResponse;
    }

    @DeleteMapping
    public UserResponse deleteDeadline(@RequestParam Long id) {
        UserResponse userResponse = new UserResponse();
        try {
            Deadline deletedDeadline = deadlineService.deleteDeadline(id);
            userResponse.setStatus(OK);
            userResponse.setMessage("Successfully deleted deadline!");
            userResponse.setData(deletedDeadline.toJSONString());
        } catch (Exception e) {
            userResponse.setStatus(BadRequest);
            userResponse.setMessage(e.getMessage());
        } finally {
            return userResponse;
        }
    }

    @PutMapping
    public UserResponse updateDeadline(@RequestParam Long id, @RequestBody Deadline deadline) {
        UserResponse userResponse = new UserResponse();
        try {
            deadlineService.updateDeadline(id, deadline);
            userResponse.setStatus(OK);
            userResponse.setMessage("Successfully updated deadline!");
        } catch (Exception e) {
            userResponse.setStatus(BadRequest);
            userResponse.setMessage(e.getMessage());
        } finally {
            return userResponse;
        }
    }
}
