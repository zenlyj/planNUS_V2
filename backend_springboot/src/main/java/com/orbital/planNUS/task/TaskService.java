package com.orbital.planNUS.task;

import com.orbital.planNUS.diary.Diary;
import com.orbital.planNUS.diary.DiaryService;
import com.orbital.planNUS.nusmods.Lesson;
import com.orbital.planNUS.nusmods.NUSModsBot;
import com.orbital.planNUS.nusmods.SemesterCalendar;
import com.orbital.planNUS.nusmods.ShareLinkParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private DiaryService diaryService;

    @Autowired
    public TaskService(TaskRepository taskRepository, DiaryService diaryService) {
        this.taskRepository = taskRepository;
        this.diaryService = diaryService;
    }

    public List<Task> getAllTasks(Long studentId) {
        return taskRepository.findTaskByStudentId(studentId);
    }

    public void addNewTask(Task task) {
        taskRepository.saveAndFlush(task);
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

    public void importTasks(Long studentId, String link) throws Exception {
        ShareLinkParser parser = new ShareLinkParser(link);
        NUSModsBot bot = new NUSModsBot();
        List<Lesson> lessons = parser.parse();
        bot.fillLessonData(lessons);
        taskRepository.deleteAllInBatch();
        List<Task> lessonTasks = new ArrayList<>();
        for (Lesson lesson : lessons) {
            lessonTasks.addAll(lessonToTasks(studentId, lesson));
        }
        taskRepository.saveAllAndFlush(lessonTasks);
    }

    private List<Task> lessonToTasks(Long studentId, Lesson lesson) {
        Map<String, Integer> dayNameToIndex = new HashMap<>() {{
            put("Monday", 0);
            put("Tuesday", 1);
            put("Wednesday", 2);
            put("Thursday", 3);
            put("Friday", 4);
            put("Saturday", 5);
            put("Sunday", 6);
        }};
        List<Task> tasks = new ArrayList<>();
        List<Integer> weeks = lesson.getWeeks();
        String day = lesson.getDay();
        int dayIndex = dayNameToIndex.get(day);
        List<List<LocalDate>> dates = SemesterCalendar.getSemesterOneDates();
        for (Integer week : weeks) {
            LocalDate date = dates.get(week-1).get(dayIndex);
            Diary diary = diaryService.getsertStudentDiaryByDate(1L, date);
            Task task = new Task(
                    studentId,
                    lesson.getModuleCode() + " " + lesson.getLessonType(),
                    lesson.getModuleCode(),
                    "",
                    lesson.getStartTime(),
                    lesson.getEndTime(),
                    date,
                    false,
                    diary
            );
            tasks.add(task);
        }
        return tasks;
    }
}
