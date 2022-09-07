package com.orbital.planNUS.task;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.orbital.planNUS.ResponseBody;
import com.orbital.planNUS.exception.ServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/task")
public class TaskController {
    private final TaskService taskService;
    private final ObjectMapper objectMapper;

    @Autowired
    public TaskController(TaskService taskService, ObjectMapper objectMapper) {
        this.taskService = taskService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<ResponseBody> getAllTasks(@RequestParam Long studentId) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully retrieved tasks!");
            List<String> jsonTasks = new ArrayList<>();
            for (Task task : taskService.getAllTasks(studentId)) {
                jsonTasks.add(objectMapper.writeValueAsString(task));
            }
            responseBody.setData(jsonTasks.toString());
        } catch (Exception e) {
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
            responseBody.setMessage(e.getMessage());
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
        } finally {
               return res.body(responseBody);
        }
    }

    @GetMapping("/workload/expected")
    public ResponseEntity<ResponseBody> getExpectedWorkload(@RequestParam Long studentId) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            Map<String, Integer> expectedWorkloads = taskService.getExpectedWorkloads(studentId);
            responseBody.setStatus(OK);
            responseBody.setData(objectMapper.writeValueAsString(expectedWorkloads));
        } catch(RuntimeException e) {
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
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
            responseBody.setData(objectMapper.writeValueAsString(completedWorkloads));
        } catch(RuntimeException e) {
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
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
            responseBody.setData(objectMapper.writeValueAsString(plottedWorkloads));
        } catch(RuntimeException e) {
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
        } finally {
            return res.body(responseBody);
        }
    }

    @PostMapping
    public ResponseEntity<ResponseBody> addNewTask(@RequestBody Task task) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            taskService.addNewTask(task);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully added task!");
            responseBody.setData(objectMapper.writeValueAsString(task));
        } catch(Exception e) {
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
        } finally {
            return res.body(responseBody);
        }
    }

    @DeleteMapping
    public ResponseEntity<ResponseBody> deleteTask(@RequestParam Long id) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            Task deletedTask = taskService.deleteTask(id);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully deleted task!");
            responseBody.setData(objectMapper.writeValueAsString(deletedTask));
        } catch (ServerException e) {
            responseBody.setStatus(NOT_FOUND);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.status(NOT_FOUND);
        } catch (Exception e) {
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
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
        } catch (ServerException e) {
            responseBody.setStatus(NOT_FOUND);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.status(NOT_FOUND);
        } catch (Exception e) {
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
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
        } catch (ServerException e) {
            responseBody.setStatus(BAD_REQUEST);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } catch (Exception e) {
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
        } finally {
            return res.body(responseBody);
        }
    }
}
