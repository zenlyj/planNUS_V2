package com.orbital.planNUS.deadline;

import com.orbital.planNUS.diary.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface DeadlineRepository extends JpaRepository<Deadline, Long> {
    @Query("SELECT d FROM Deadline d WHERE d.studentId=?1 ORDER BY d.deadline DESC")
    public List<Deadline> findDeadlinesByStudentId(Long studentId);

    @Query("SELECT d FROM Deadline d WHERE d.id=?1")
    public Optional<Deadline> findDeadlineById(Long id);

    @Modifying
    @Query("UPDATE Deadline d" +
            " SET d.name=?1," +
            "d.module=?2," +
            "d.deadline=?3," +
            "d.description=?4," +
            "d.diary=?5" +
            " WHERE d.id=?6")
    public void updateDeadline(String name, String module, LocalDate deadline, String description, Diary diary, Long id);
}
