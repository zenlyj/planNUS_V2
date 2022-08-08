package com.orbital.planNUS.deadline;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DeadlineService {
    private final DeadlineRepository deadlineRepository;

    @Autowired
    public DeadlineService(DeadlineRepository deadlineRepository) {
        this.deadlineRepository = deadlineRepository;
    }

    public List<Deadline> getStudentDeadlines(Long studentId) {
        return deadlineRepository.findDeadlinesByStudentId(studentId);
    }

    public void addNewDeadline(Deadline deadline) {
        deadlineRepository.save(deadline);
    }

    public Deadline deleteDeadline(Long id) throws Exception {
        Optional<Deadline> search = deadlineRepository.findDeadlineById(id);
        if (search.isEmpty()) {
            throw new Exception("No such deadline!");
        }
        deadlineRepository.deleteById(id);
        return search.get();
    }

    public void updateDeadline(Long id, Deadline deadline) throws Exception {
        String name = deadline.getName();
        String module = deadline.getModule();
        LocalDate date = deadline.getDeadline();
        String description = deadline.getDescription();
        Optional<Deadline> search = deadlineRepository.findDeadlineById(id);
        if (search.isEmpty()) {
            throw new Exception("No such deadline!");
        }
        deadlineRepository.updateDeadline(name, module, date, description, id);
    }
}
