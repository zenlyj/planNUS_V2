package com.orbital.planNUS.diary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void addNewDiaryEntry(Diary diary) {
        diaryRepository.save(diary);
    }

    public Diary deleteDiaryEntry(Long id) throws Exception {
        Optional<Diary> search = diaryRepository.findDiaryEntryById(id);
        if (search.isEmpty()) {
            throw new Exception("No such diary entry!");
        }
        diaryRepository.deleteById(id);
        return search.get();
    }

    public void updateDiaryEntry(Long id, Diary diary) throws Exception {
        String note = diary.getNote();
        Optional<Diary> search = diaryRepository.findDiaryEntryById(id);
        if (search.isEmpty()) {
            throw new Exception("No such diary entry!");
        }
        diaryRepository.updateDiaryEntry(note, id);
    }
}
