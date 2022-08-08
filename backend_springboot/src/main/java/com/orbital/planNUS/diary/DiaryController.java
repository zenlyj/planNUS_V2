package com.orbital.planNUS.diary;

import com.orbital.planNUS.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.orbital.planNUS.HTTPStatusCode.*;

@RestController
@RequestMapping(path = "api/diary")
public class DiaryController {
    private final DiaryService diaryService;

    @Autowired
    public DiaryController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    @GetMapping
    public UserResponse getStudentDiary(Long studentId) {
        UserResponse userResponse = new UserResponse();
        diaryService.getStudentDiaryEntries(studentId);
        userResponse.setStatus(OK);
        userResponse.setMessage("Successfully retrieved diary entries");
        List<String> jsonDiary = diaryService.getStudentDiaryEntries(studentId)
                .stream()
                .map(diary -> diary.toJSONString())
                .collect(Collectors.toList());
        userResponse.setData(jsonDiary.toString());
        return userResponse;
    }

    @PostMapping
    public UserResponse addNewDiaryEntry(@RequestBody Diary diary) {
        UserResponse userResponse = new UserResponse();
        diaryService.addNewDiaryEntry(diary);
        userResponse.setStatus(OK);
        userResponse.setMessage("Successfully added diary entry!");
        userResponse.setData(diary.toJSONString());
        return userResponse;
    }

    @DeleteMapping
    public UserResponse deleteDiaryEntry(@RequestParam Long id) {
        UserResponse userResponse = new UserResponse();
        try {
            Diary deletedDiaryEntry = diaryService.deleteDiaryEntry(id);
            userResponse.setStatus(OK);
            userResponse.setMessage("Successfully deleted diary entry!");
            userResponse.setData(deletedDiaryEntry.toJSONString());
        } catch (Exception e) {
            userResponse.setStatus(BadRequest);
            userResponse.setMessage(e.getMessage());
        } finally {
            return userResponse;
        }
    }

    @PutMapping
    public UserResponse updateDiaryEntry(@RequestParam Long id, @RequestBody Diary diary) {
        UserResponse userResponse = new UserResponse();
        try {
            diaryService.updateDiaryEntry(id, diary);
            userResponse.setStatus(OK);
            userResponse.setMessage("Successfully updated diary!");
        } catch (Exception e) {
            userResponse.setStatus(BadRequest);
            userResponse.setMessage(e.getMessage());
        } finally {
            return userResponse;
        }
    }
}
