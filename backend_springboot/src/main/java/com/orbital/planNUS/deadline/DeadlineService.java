package com.orbital.planNUS.deadline;

import com.orbital.planNUS.diary.Diary;
import com.orbital.planNUS.diary.DiaryService;
import com.orbital.planNUS.exception.ServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DeadlineService {
    private final DeadlineRepository deadlineRepository;
    private final DiaryService diaryService;

    @Autowired
    public DeadlineService(DeadlineRepository deadlineRepository, DiaryService diaryService) {
        this.deadlineRepository = deadlineRepository;
        this.diaryService = diaryService;
    }

    public List<Deadline> getStudentDeadlines(Long studentId) {
        return deadlineRepository.findDeadlinesByStudentId(studentId);
    }

    public void addNewDeadline(Deadline deadline) {
        deadline.setDiary(diaryService.getsertStudentDiaryByDate(deadline.getStudentId(), deadline.getDeadline()));
        deadlineRepository.saveAndFlush(deadline);
    }

    public Deadline deleteDeadline(Long id) throws ServerException {
        Optional<Deadline> search = deadlineRepository.findDeadlineById(id);
        if (search.isEmpty()) {
            throw new ServerException("No such deadline!");
        }
        deadlineRepository.deleteById(id);
        deadlineRepository.flush();
        return search.get();
    }

    public void updateDeadline(Long id, Deadline deadline) throws ServerException {
        String name = deadline.getName();
        String module = deadline.getModule();
        LocalDate date = deadline.getDeadline();
        String description = deadline.getDescription();
        Diary diary = diaryService.getsertStudentDiaryByDate(deadline.getStudentId(), date);
        Optional<Deadline> search = deadlineRepository.findDeadlineById(id);
        if (search.isEmpty()) {
            throw new ServerException("No such deadline!");
        }
        deadlineRepository.updateDeadline(name, module, date, description, diary, id);
        deadlineRepository.flush();
    }
}
