package com.orbital.planNUS.diary;

import com.orbital.planNUS.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static com.orbital.planNUS.HTTPStatusCode.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/diary")
public class DiaryController {
    private final DiaryService diaryService;

    @Autowired
    public DiaryController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    @GetMapping
    public ResponseEntity<ResponseBody> getStudentDiary(Long studentId) {
        ResponseBody responseBody = new ResponseBody();
        responseBody.setStatus(OK);
        responseBody.setMessage("Successfully retrieved diary entries");
        List<String> jsonDiary = diaryService.getStudentDiaryEntries(studentId)
                .stream()
                .map(diary -> diary.toJSONString())
                .collect(Collectors.toList());
        responseBody.setData(jsonDiary.toString());
        return ResponseEntity.ok().body(responseBody);
    }

    @GetMapping(value = "/{date}")
    public ResponseEntity<ResponseBody> getsertStudentDiary(Long studentId, @PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        ResponseBody responseBody = new ResponseBody();
        Diary diary = diaryService.getsertStudentDiaryByDate(studentId, date);
        responseBody.setStatus(OK);
        responseBody.setMessage("Successfully retrieved diary entry");
        responseBody.setData(diary.toJSONString());
        return ResponseEntity.ok().body(responseBody);
    }

    @PostMapping
    public ResponseEntity<ResponseBody> addNewDiaryEntry(@RequestBody Diary diary) {
        ResponseBody responseBody = new ResponseBody();
        diaryService.addNewDiaryEntry(diary);
        responseBody.setStatus(OK);
        responseBody.setMessage("Successfully added diary entry!");
        responseBody.setData(diary.toJSONString());
        return ResponseEntity.ok().body(responseBody);
    }

    @DeleteMapping
    public ResponseEntity<ResponseBody> deleteDiaryEntry(@RequestParam Long id) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            Diary deletedDiaryEntry = diaryService.deleteDiaryEntry(id);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully deleted diary entry!");
            responseBody.setData(deletedDiaryEntry.toJSONString());
        } catch (Exception e) {
            responseBody.setStatus(BadRequest);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }

    @PutMapping
    public ResponseEntity<ResponseBody> updateDiaryEntry(@RequestParam Long id, @RequestBody Diary diary) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            diaryService.updateDiaryEntry(id, diary);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully updated diary!");
        } catch (Exception e) {
            responseBody.setStatus(BadRequest);
            responseBody.setMessage(e.getMessage());
            res = ResponseEntity.badRequest();
        } finally {
            return res.body(responseBody);
        }
    }
}
