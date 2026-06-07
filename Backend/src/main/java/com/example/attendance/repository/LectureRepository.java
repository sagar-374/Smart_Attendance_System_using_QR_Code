package com.example.attendance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.attendance.entity.Lecture;
import com.example.attendance.entity.LectureStatus;

public interface LectureRepository extends JpaRepository<Lecture, Integer> {

    // ================= FIND BY CUSTOM LECTURE ID =================
    Optional<Lecture> findByLectureId(String lectureId);

    // ================= FIND BY LECTURE ID + STATUS =================
    Optional<Lecture> findByLectureIdAndStatus(String lectureId, LectureStatus status);

    // ================= FIND ALL BY STATUS =================
    List<Lecture> findByStatus(LectureStatus status);

    // ================= GET LECTURES ATTENDED BY STUDENT =================
    @Query("""
        SELECT DISTINCT l 
        FROM Lecture l
        JOIN Attendance a ON l.lectureId = a.lectureId
        WHERE a.rollNo = :rollNo
    """)
    List<Lecture> findLecturesByStudentRollNo(@Param("rollNo") String rollNo);
}
