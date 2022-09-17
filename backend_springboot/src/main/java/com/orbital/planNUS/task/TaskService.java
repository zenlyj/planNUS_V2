package com.orbital.planNUS.task;

import com.orbital.planNUS.diary.Diary;
import com.orbital.planNUS.diary.DiaryService;
import com.orbital.planNUS.exception.ServerException;
import com.orbital.planNUS.nusmods.Lesson;
import com.orbital.planNUS.nusmods.NUSModsBot;
import com.orbital.planNUS.nusmods.SemesterCalendar;
import com.orbital.planNUS.nusmods.ShareLinkParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@Slf4j
public class TaskService {
    private final TaskRepository taskRepository;
    private DiaryService diaryService;
    private NUSModsBot nusModsBot;

    @Autowired
    public TaskService(TaskRepository taskRepository, DiaryService diaryService, NUSModsBot nusModsBot) {
        this.taskRepository = taskRepository;
        this.diaryService = diaryService;
        this.nusModsBot = nusModsBot;
    }

    public List<Task> getAllTasks(Long studentId) {
        return taskRepository.findTaskByStudentId(studentId);
    }

    public Map<String, Integer> getExpectedWorkloads(Long studentId) throws RuntimeException {
        List<String> modules = getModules(studentId);
        List<Integer> workloads = nusModsBot.mapModuleToWorkload(modules);
        Map<String, Integer> expectedWorkloads = new HashMap<>();
        for (int i = 0; i < workloads.size(); i++) {
            expectedWorkloads.put(modules.get(i), workloads.get(i));
        }
        return expectedWorkloads;
    }

    public Map<String, List<Integer>> getCompletedWorkloads(Long studentId) throws RuntimeException{
        List<Task> tasks = getAllTasks(studentId);
        Map<String, List<Integer>> completedWorkloads = new HashMap<>();
        for (Task task : tasks) {
            List<Integer> completedInModule = completedWorkloads.getOrDefault(task.getModule(),
                    new ArrayList<>(Collections.nCopies(13, 0)));
            completedWorkloads.put(task.getModule(), completedInModule);
            if (!task.getIsCompleted()) continue;
            int duration = (Integer.parseInt(task.getTimeTo()) - Integer.parseInt(task.getTimeFrom())) / 100;
            int week = getWeek(task);
            Integer completedInWeek = completedInModule.get(week);
            completedInModule.set(week, completedInWeek+duration);
            completedWorkloads.put(task.getModule(), completedInModule);
        }
        return completedWorkloads;
    }

    public Map<String, List<Integer>> getPlottedWorkloads(Long studentId) throws RuntimeException{
        List<Task> tasks = getAllTasks(studentId);
        Map<String, List<Integer>> plottedWorkloads = new HashMap<>();
        for (Task task : tasks) {
            List<Integer> plottedInModule = plottedWorkloads.getOrDefault(task.getModule(),
                    new ArrayList<>(Collections.nCopies(13, 0)));
            plottedWorkloads.put(task.getModule(), plottedInModule);
            int duration = (Integer.parseInt(task.getTimeTo()) - Integer.parseInt(task.getTimeFrom())) / 100;
            int week = getWeek(task);
            Integer plottedInWeek = plottedInModule.get(week);
            plottedInModule.set(week, plottedInWeek+duration);
            plottedWorkloads.put(task.getModule(), plottedInModule);
        }
        return plottedWorkloads;
    }

    public void addNewTask(Task task) throws ServerException {
        validateTask(task);
        task.setDiary(diaryService.getsertStudentDiaryByDate(task.getStudentId(), task.getDate()));
        taskRepository.saveAndFlush(task);
    }

    public Task deleteTask(Long id) throws ServerException {
        Optional<Task> task = taskRepository.findTaskById(id);
        if (task.isEmpty()) {
            throw new ServerException("No such task!");
        }
        taskRepository.deleteById(id);
        taskRepository.flush();
        return task.get();
    }

    public void updateTask(Long id, Task task) throws ServerException {
        validateTask(task);
        String name = task.getName();
        String module = task.getModule();
        String description = task.getDescription();
        String timeFrom = task.getTimeFrom();
        String timeTo = task.getTimeTo();
        LocalDate date = task.getDate();
        Boolean isCompleted = task.getIsCompleted();
        Optional<Task> search = taskRepository.findTaskById(id);
        if (search.isEmpty()) {
            throw new ServerException("No such task!");
        }
        taskRepository.updateTask(name, module, description, timeFrom, timeTo, date, isCompleted, id);
        taskRepository.flush();
    }

    public void importTasks(Long studentId, String link) throws Exception {
        ShareLinkParser parser = new ShareLinkParser(link);
        List<Lesson> lessons = parser.parse();
        new NUSModsBot().fillLessonData(lessons);
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
            Diary diary = diaryService.getsertStudentDiaryByDate(studentId, date);
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

    private List<String> getModules(Long studentId) {
        return taskRepository.findModuleByStudentId(studentId);
    }

    private int getWeek(Task task) {
        List<List<LocalDate>> dates = SemesterCalendar.getSemesterOneDates();
        for (int i = 0; i < dates.size(); i++) {
             List<LocalDate> weekDates = dates.get(i);
             if (weekDates.contains(task.getDate())) {
                 return i;
             }
        }
        return -1;
    }

    private void validateTask(Task task) throws ServerException {
        try {
            Integer.parseInt(task.getTimeFrom());
            Integer.parseInt(task.getTimeTo());
        } catch (NumberFormatException e) {
            throw new ServerException("Time is not in 24hr format!");
        }
        if (task.getTimeTo().compareTo(task.getTimeFrom()) <= 0) {
            throw new ServerException("Start time must be before end time!");
        }
        if (task.getTimeFrom().compareTo("0800") < 0 || task.getTimeTo().compareTo("2100") > 0) {
            throw new ServerException("Timespan is out of timetable range!");
        }
        List<Task> currentTasks = taskRepository.findTaskByDate(task.getStudentId(), task.getDate());
        Collections.sort(currentTasks, Comparator.comparing(Task::getTimeFrom));
        for (Task t : currentTasks) {
            if (task.getTimeFrom().compareTo(t.getTimeFrom()) >= 0) {
                continue;
            }
            if (task.getTimeTo().compareTo(t.getTimeFrom()) > 0) {
                throw new ServerException("Task timespan overlaps with another task!");
            }
        }
    }
}
