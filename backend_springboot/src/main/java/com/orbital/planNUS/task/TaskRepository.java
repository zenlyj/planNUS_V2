package com.orbital.planNUS.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.studentId=?1")
    List<Task> findTaskByStudentId(Long studentId);

    @Query("SELECT t FROM Task t WHERE t.id=?1")
    Optional<Task> findTaskById(Long id);

    @Modifying
    @Query("UPDATE Task t" +
            " SET t.name=?1," +
            "t.module=?2," +
            "t.description=?3," +
            "t.timeFrom=?4," +
            "t.timeTo=?5," +
            "t.week=?6," +
            "t.isCompleted=?7" +
            " WHERE t.id = ?8")
    Integer updateTask(String name, String module, String description, int timeFrom, int timeTo, int week, boolean isCompleted, Long id);
}
