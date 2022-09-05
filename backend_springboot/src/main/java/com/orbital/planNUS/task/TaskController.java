package com.orbital.planNUS.task;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.orbital.planNUS.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.orbital.planNUS.HTTPStatusCode.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/task")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public UserResponse getAllTasks(@RequestParam Long studentId) {
        UserResponse userResponse = new UserResponse();
        userResponse.setStatus(OK);
        userResponse.setMessage("Successfully retrieved tasks!");
        List<String> jsonTasks = taskService.getAllTasks(studentId)
                        .stream()
                        .map(task -> task.toJSONString())
                        .collect(Collectors.toList());
        userResponse.setData(jsonTasks.toString());
        return userResponse;
    }

    @GetMapping("/workload/expected")
    public ResponseEntity getExpectedWorkload(@RequestParam Long studentId) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        UserResponse userResponse = new UserResponse();
        try {
            Map<String, Integer> expectedWorkloads = taskService.getExpectedWorkloads(studentId);
            userResponse.setStatus(OK);
            userResponse.setData(new ObjectMapper().writeValueAsString(expectedWorkloads));
        } catch(RuntimeException e) {
            res = ResponseEntity.badRequest();
            userResponse.setStatus(BadRequest);
            userResponse.setMessage(e.getMessage());
        } finally {
            return res.body(userResponse);
        }
    }

    @GetMapping("/workload/completed")
    public ResponseEntity getCompletedWorkload(@RequestParam Long studentId) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        UserResponse userResponse = new UserResponse();
        try {
            Map<String, List<Integer>> expectedWorkloads = taskService.getCompletedWorkloads(studentId);
            userResponse.setStatus(OK);
            userResponse.setData(new ObjectMapper().writeValueAsString(expectedWorkloads));
        } catch(RuntimeException e) {
            res = ResponseEntity.badRequest();
            userResponse.setStatus(BadRequest);
            userResponse.setMessage(e.getMessage());
        } finally {
            return res.body(userResponse);
        }
    }

    @PostMapping
    public UserResponse addNewTask(@RequestBody Task task) {
        UserResponse userResponse = new UserResponse();
        taskService.addNewTask(task);
        userResponse.setStatus(OK);
        userResponse.setMessage("Successfully added task!");
        userResponse.setData(task.toJSONString());
        return userResponse;
    }

    @DeleteMapping
    public UserResponse deleteTask(@RequestParam Long id) {
        UserResponse userResponse = new UserResponse();
        try {
            Task deletedTask = taskService.deleteTask(id);
            userResponse.setStatus(OK);
            userResponse.setMessage("Successfully deleted task!");
            userResponse.setData(deletedTask.toJSONString());
        } catch (Exception e) {
            userResponse.setStatus(BadRequest);
            userResponse.setMessage(e.getMessage());
        } finally {
            return userResponse;
        }
    }

    @PutMapping
    public UserResponse updateTask(@RequestParam Long id, @RequestBody Task task) {
        UserResponse userResponse = new UserResponse();
        try {
            taskService.updateTask(id, task);
            userResponse.setStatus(OK);
            userResponse.setMessage("Successfully updated task!");
        } catch (Exception e) {
            userResponse.setStatus(BadRequest);
            userResponse.setMessage(e.getLocalizedMessage());
        } finally {
            return userResponse;
        }
    }

    @PostMapping("/import")
    public UserResponse importTasks(@RequestParam Long studentId, @RequestParam String link) {
        UserResponse userResponse = new UserResponse();
        try {
            taskService.importTasks(studentId, link);
            userResponse.setStatus(OK);
            userResponse.setMessage("Successfully imported tasks");
        } catch (Exception e) {
            userResponse.setStatus(BadRequest);
            userResponse.setMessage(e.getMessage());
        } finally {
            return userResponse;
        }
    }
}
