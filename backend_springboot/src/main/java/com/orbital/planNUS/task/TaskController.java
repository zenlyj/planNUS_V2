package com.orbital.planNUS.task;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.orbital.planNUS.ResponseBody;
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
    public ResponseEntity<ResponseBody> getAllTasks(@RequestParam Long studentId) {
        ResponseBody responseBody = new ResponseBody();
        responseBody.setStatus(OK);
        responseBody.setMessage("Successfully retrieved tasks!");
        List<String> jsonTasks = taskService.getAllTasks(studentId)
                        .stream()
                        .map(task -> task.toJSONString())
                        .collect(Collectors.toList());
        responseBody.setData(jsonTasks.toString());
        return ResponseEntity.ok().body(responseBody);
    }

    @GetMapping("/workload/expected")
    public ResponseEntity<ResponseBody> getExpectedWorkload(@RequestParam Long studentId) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            Map<String, Integer> expectedWorkloads = taskService.getExpectedWorkloads(studentId);
            responseBody.setStatus(OK);
            responseBody.setData(new ObjectMapper().writeValueAsString(expectedWorkloads));
        } catch(RuntimeException e) {
            res = ResponseEntity.badRequest();
            responseBody.setStatus(BadRequest);
            responseBody.setMessage(e.getMessage());
        } finally {
            return res.body(responseBody);
        }
    }

    @GetMapping("/workload/completed")
    public ResponseEntity<ResponseBody> getCompletedWorkload(@RequestParam Long studentId) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            Map<String, List<Integer>> completedWorkloads = taskService.getCompletedWorkloads(studentId);
            responseBody.setStatus(OK);
            responseBody.setData(new ObjectMapper().writeValueAsString(completedWorkloads));
        } catch(RuntimeException e) {
            res = ResponseEntity.badRequest();
            responseBody.setStatus(BadRequest);
            responseBody.setMessage(e.getMessage());
        } finally {
            return res.body(responseBody);
        }
    }

    @GetMapping("/workload/plotted")
    public ResponseEntity<ResponseBody> getPlottedWorkload(@RequestParam Long studentId) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            Map<String, List<Integer>> plottedWorkloads = taskService.getPlottedWorkloads(studentId);
            responseBody.setStatus(OK);
            responseBody.setData(new ObjectMapper().writeValueAsString(plottedWorkloads));
        } catch(RuntimeException e) {
            res = ResponseEntity.badRequest();
            responseBody.setStatus(BadRequest);
            responseBody.setMessage(e.getMessage());
        } finally {
            return res.body(responseBody);
        }
    }

    @PostMapping
    public ResponseEntity<ResponseBody> addNewTask(@RequestBody Task task) {
        ResponseBody responseBody = new ResponseBody();
        taskService.addNewTask(task);
        responseBody.setStatus(OK);
        responseBody.setMessage("Successfully added task!");
        responseBody.setData(task.toJSONString());
        return ResponseEntity.ok().body(responseBody);
    }

    @DeleteMapping
    public ResponseEntity<ResponseBody> deleteTask(@RequestParam Long id) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            Task deletedTask = taskService.deleteTask(id);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully deleted task!");
            responseBody.setData(deletedTask.toJSONString());
        } catch (Exception e) {
            responseBody.setStatus(BadRequest);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }

    @PutMapping
    public ResponseEntity<ResponseBody> updateTask(@RequestParam Long id, @RequestBody Task task) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            taskService.updateTask(id, task);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully updated task!");
        } catch (Exception e) {
            responseBody.setStatus(BadRequest);
            responseBody.setMessage(e.getLocalizedMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }

    @PostMapping("/import")
    public ResponseEntity<ResponseBody> importTasks(@RequestParam Long studentId, @RequestParam String link) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            taskService.importTasks(studentId, link);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully imported tasks");
        } catch (Exception e) {
            responseBody.setStatus(BadRequest);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }
}
