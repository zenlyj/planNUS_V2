package com.orbital.planNUS.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks(Long studentId) {
        return taskRepository.findTaskByStudentId(studentId);
    }

    public void addNewTask(Task task) {
        taskRepository.save(task);
    }

    public Task deleteTask(Long id) throws Exception {
        Optional<Task> task = taskRepository.findTaskById(id);
        if (task.isEmpty()) {
            throw new Exception("No such task!");
        }
        taskRepository.deleteById(id);
        return task.get();
    }

    public void updateTask(Long id, Task task) throws Exception {
        String name = task.getName();
        String module = task.getModule();
        String description = task.getDescription();
        String timeFrom = task.getTimeFrom();
        String timeTo = task.getTimeTo();
        LocalDate date = task.getDate();
        Boolean isCompleted = task.getIsCompleted();
        Optional<Task> search = taskRepository.findTaskById(id);
        if (search.isEmpty()) {
            throw new Exception("No such task!");
        }
        taskRepository.updateTask(name, module, description, timeFrom, timeTo, date, isCompleted, id);
    }
}
