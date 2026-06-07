package com.example.attendance.service;

import java.util.*;
import org.springframework.stereotype.Service;

import com.example.attendance.entity.Attendance;
import com.example.attendance.entity.Lecture;
import com.example.attendance.repository.AttendanceRepository;
import com.example.attendance.repository.LectureRepository;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final LectureRepository lectureRepository;

    public AttendanceService(AttendanceRepository attendanceRepository,
                             LectureRepository lectureRepository) {
        this.attendanceRepository = attendanceRepository;
        this.lectureRepository = lectureRepository;
    }

    // ================= BASIC =================

    public List<Lecture> getLecturesByStudent(String rollNo) {
        return lectureRepository.findLecturesByStudentRollNo(rollNo);
    }

    public List<Attendance> getAttendanceByStudentAndLecture(String rollNo, String lectureId) {
        return attendanceRepository.findByRollNoAndLectureId(rollNo, lectureId);
    }

    public List<Attendance> getAttendanceByRollNo(String rollNo) {
        return attendanceRepository.findByRollNo(rollNo);
    }

    public List<Attendance> getAttendanceByLecture(String lectureId) {
        return attendanceRepository.findByLectureId(lectureId);
    }

 // ================= ANALYTICS =================

 // ✅ Convert raw query to proper JSON-ready structure
 public List<Map<String, Object>> getStudentAttendance() {

     List<Object[]> rawData = attendanceRepository.studentAttendancePercentage();
     List<Map<String, Object>> result = new ArrayList<>();

     for (Object[] row : rawData) {

         Map<String, Object> student = new HashMap<>();
         student.put("rollNo", row[0]);
         student.put("name", row[1]);
         student.put("attendance", ((Number) row[2]).doubleValue());

         result.add(student);
     }

     return result;
 }

 public Long getTotalLectures() {
     return attendanceRepository.totalLectures();
 }

 // ✅ DEFaulters (<75%)
 public List<Map<String, Object>> getTopDefaulters() {

     List<Map<String, Object>> allStudents = getStudentAttendance();
     List<Map<String, Object>> defaulters = new ArrayList<>();

     for (Map<String, Object> student : allStudents) {

         double attendance = (double) student.get("attendance");

         if (attendance < 75.0) {
             defaulters.add(student);
         }
     }

     // Sort lowest attendance first
     defaulters.sort(Comparator.comparing(
             s -> (Double) s.get("attendance")
     ));

     return defaulters;
 }

}
