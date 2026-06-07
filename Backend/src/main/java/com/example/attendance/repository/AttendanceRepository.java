package com.example.attendance.repository;

import com.example.attendance.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    boolean existsByLectureIdAndRollNo(String lectureId, String rollNo);

    List<Attendance> findByLectureId(String lectureId);

    List<Attendance> findByRollNo(String rollNo);

    List<Attendance> findByRollNoAndLectureId(String rollNo, String lectureId);

    // ✅ CORRECT ATTENDANCE %
    @Query("""
        SELECT s.rollNo,
               s.name,
               COALESCE(
                   (
                       COUNT(CASE WHEN a.status = 'PRESENT' THEN 1 END) * 100.0
                       /
                       NULLIF((SELECT COUNT(l) FROM Lecture l), 0)
                   ),
                   0
               )
        FROM Student s
        LEFT JOIN Attendance a ON s.rollNo = a.rollNo
        GROUP BY s.rollNo, s.name
    """)
    List<Object[]> studentAttendancePercentage();

    @Query("SELECT COUNT(l) FROM Lecture l")
    Long totalLectures();
}
