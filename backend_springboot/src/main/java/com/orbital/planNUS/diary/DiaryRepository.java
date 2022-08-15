package com.orbital.planNUS.diary;

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
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    @Query("SELECT d FROM Diary d WHERE d.studentId=?1")
    public List<Diary> findDiaryEntriesByStudentId(Long studentId);

    @Query("SELECT d FROM Diary d WHERE d.id=?1")
    public Optional<Diary> findDiaryEntryById(Long id);

    @Query("SELECT d from Diary d WHERE d.studentId=?1 AND d.date=?2")
    public Optional<Diary> findStudentDiaryEntryByDate(Long studentId, LocalDate date);

    @Modifying
    @Query("UPDATE Diary d" +
            " SET d.note=?1" +
            " WHERE d.id=?2")
    public void updateDiaryEntry(String note, Long id);
}
