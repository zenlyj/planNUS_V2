package com.orbital.planNUS.diary;

import com.orbital.planNUS.exception.ServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DiaryService {
    private final DiaryRepository diaryRepository;

    @Autowired
    public DiaryService(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    public List<Diary> getStudentDiaryEntries(Long studentId) {
        return diaryRepository.findDiaryEntriesByStudentId(studentId);
    }

    public Diary getsertStudentDiaryByDate(Long studentId, LocalDate date) {
        Optional<Diary> search = diaryRepository.findStudentDiaryEntryByDate(studentId, date);
        if (search.isPresent()) {
            return search.get();
        }
        Diary newDiary = new Diary(studentId, date, "");
        diaryRepository.save(newDiary);
        return newDiary;
     }

    public void addNewDiaryEntry(Diary diary) {
        diaryRepository.save(diary);
    }

    public Diary deleteDiaryEntry(Long id) throws ServerException {
        Optional<Diary> search = diaryRepository.findDiaryEntryById(id);
        if (search.isEmpty()) {
            throw new ServerException("No such diary entry!");
        }
        diaryRepository.deleteById(id);
        return search.get();
    }

    public void updateDiaryEntry(Long id, Diary diary) throws ServerException {
        String note = diary.getNote();
        Optional<Diary> search = diaryRepository.findDiaryEntryById(id);
        if (search.isEmpty()) {
            throw new ServerException("No such diary entry!");
        }
        diaryRepository.updateDiaryEntry(note, id);
    }
}
