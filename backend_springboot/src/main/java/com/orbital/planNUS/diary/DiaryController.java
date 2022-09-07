package com.orbital.planNUS.diary;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.orbital.planNUS.ResponseBody;
import com.orbital.planNUS.exception.ServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import static org.springframework.http.HttpStatus.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/diary")
public class DiaryController {
    private final DiaryService diaryService;
    private final ObjectMapper objectMapper;

    @Autowired
    public DiaryController(DiaryService diaryService, ObjectMapper objectMapper) {
        this.diaryService = diaryService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<ResponseBody> getStudentDiary(Long studentId) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully retrieved diary entries");
            List<String> jsonDiary = new ArrayList<>();
            for (Diary diary : diaryService.getStudentDiaryEntries(studentId)) {
                jsonDiary.add(objectMapper.writeValueAsString(diary));
            }
            responseBody.setData(jsonDiary.toString());
        } catch(Exception e) {
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
        } finally {
            return res.body(responseBody);
        }
    }

    @GetMapping(value = "/{date}")
    public ResponseEntity<ResponseBody> getsertStudentDiary(Long studentId, @PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            Diary diary = diaryService.getsertStudentDiaryByDate(studentId, date);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully retrieved diary entry");
            responseBody.setData(objectMapper.writeValueAsString(diary));
        } catch(Exception e) {
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
        } finally {
            return res.body(responseBody);
        }
    }

    @PostMapping
    public ResponseEntity<ResponseBody> addNewDiaryEntry(@RequestBody Diary diary) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            diaryService.addNewDiaryEntry(diary);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully added diary entry!");
            responseBody.setData(objectMapper.writeValueAsString(diary));
        } catch(Exception e) {
            responseBody.setStatus(INTERNAL_SERVER_ERROR);
            res = ResponseEntity.status(INTERNAL_SERVER_ERROR);
        }
        return res.body(responseBody);
    }

    @DeleteMapping
    public ResponseEntity<ResponseBody> deleteDiaryEntry(@RequestParam Long id) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            Diary deletedDiaryEntry = diaryService.deleteDiaryEntry(id);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully deleted diary entry!");
            responseBody.setData(objectMapper.writeValueAsString(deletedDiaryEntry));
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
    public ResponseEntity<ResponseBody> updateDiaryEntry(@RequestParam Long id, @RequestBody Diary diary) {
        ResponseEntity.BodyBuilder res = ResponseEntity.ok();
        ResponseBody responseBody = new ResponseBody();
        try {
            diaryService.updateDiaryEntry(id, diary);
            responseBody.setStatus(OK);
            responseBody.setMessage("Successfully updated diary!");
        } catch (ServerException e) {
            responseBody.setStatus(NOT_FOUND);
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
