package com.example.attendance.controller;

import com.example.attendance.entity.Attendance;
import com.example.attendance.entity.Lecture;
import com.example.attendance.entity.LectureStatus;
import com.example.attendance.repository.AttendanceRepository;
import com.example.attendance.repository.LectureRepository;
import com.example.attendance.service.AttendancePdfService;
import com.example.demo.dto.AttendanceReportDTO;
import com.example.demo.dto.AttendanceRequest;
import com.example.demo.dto.AttendanceResponseDTO;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    private final LectureRepository lectureRepo;
    private final AttendanceRepository attendanceRepo;
    private final AttendancePdfService pdfService;

    public AttendanceController(LectureRepository lectureRepo,
                                AttendanceRepository attendanceRepo,
                                AttendancePdfService pdfService) {
        this.lectureRepo = lectureRepo;
        this.attendanceRepo = attendanceRepo;
        this.pdfService = pdfService;
    }

    // ================= MARK ATTENDANCE =================
    @PostMapping("/mark")
    public String markAttendance(@RequestBody AttendanceRequest req) {

        Lecture lecture = lectureRepo.findByLectureId(req.getLectureId())
                .orElseThrow(() -> new RuntimeException("Lecture not found"));

        if (lecture.getStatus() != LectureStatus.STARTED)
            throw new RuntimeException("Lecture not active");


        if (!lecture.getQrToken().equals(req.getToken()))
            throw new RuntimeException("Invalid QR token");

        if (attendanceRepo.existsByLectureIdAndRollNo(
                req.getLectureId(), req.getRollNo()))
            throw new RuntimeException("Attendance already marked");

        Attendance att = new Attendance();
        att.setLectureId(req.getLectureId());
        att.setRollNo(req.getRollNo());
        att.setName(req.getName());
        att.setStatus("PRESENT");
        att.setMarkedAt(LocalDateTime.now());

        attendanceRepo.save(att);

        return "Attendance Marked Successfully";
    }

    // ================= HISTORY BY LECTURE =================
    @GetMapping("/lecture/{lectureId}")
    public List<AttendanceResponseDTO> getByLecture(@PathVariable String lectureId) {

        Lecture lecture = lectureRepo.findByLectureId(lectureId).orElse(null);
        String title = lecture != null ? lecture.getTitle() : "N/A";

        return attendanceRepo.findByLectureId(lectureId)
                .stream()
                .map(att -> new AttendanceResponseDTO(
                        att.getId(),
                        att.getRollNo(),
                        att.getName(),
                        att.getLectureId(),
                        title,
                        att.getMarkedAt()
                ))
                .collect(Collectors.toList());
    }

    // ================= LECTURES BY STUDENT =================
    @GetMapping("/lectures/student/{rollNo}")
    public List<Lecture> getLecturesByStudent(@PathVariable String rollNo) {
        return lectureRepo.findLecturesByStudentRollNo(rollNo);
    }

    // ================= ALL ATTENDANCE =================
    @GetMapping("/all")
    public List<AttendanceResponseDTO> getAllAttendance() {

        Map<String, String> lectureMap = lectureRepo.findAll()
                .stream()
                .collect(Collectors.toMap(
                        Lecture::getLectureId,
                        Lecture::getTitle
                ));

        return attendanceRepo.findAll()
                .stream()
                .map(att -> new AttendanceResponseDTO(
                        att.getId(),
                        att.getRollNo(),
                        att.getName(),
                        att.getLectureId(),
                        lectureMap.getOrDefault(att.getLectureId(), "N/A"),
                        att.getMarkedAt()
                ))
                .collect(Collectors.toList());
    }

    // ================= STUDENT HISTORY =================
    @GetMapping("/student/{rollNo}")
    public List<Attendance> getAttendanceByStudent(@PathVariable String rollNo) {
        return attendanceRepo.findByRollNo(rollNo);
    }

    // ================= STUDENT + LECTURE =================
    @GetMapping("/student/{rollNo}/lecture/{lectureId}")
    public List<Attendance> getAttendanceByStudentAndLecture(
            @PathVariable String rollNo,
            @PathVariable String lectureId) {

        return attendanceRepo.findByRollNoAndLectureId(rollNo, lectureId);
    }

    // ================= ANALYTICS =================
    @GetMapping("/analytics")
    public Map<String, Object> getAnalytics() {

        List<Object[]> data = attendanceRepo.studentAttendancePercentage();
        Long totalLectures = attendanceRepo.totalLectures();

        List<Map<String, Object>> studentAttendance = new ArrayList<>();

        for (Object[] row : data) {
            Map<String, Object> student = new HashMap<>();
            student.put("rollNo", row[0]);
            student.put("name", row[1]);
            student.put("attendance", ((Number) row[2]).doubleValue());
            studentAttendance.add(student);
        }

        List<Map<String, Object>> topDefaulters = studentAttendance.stream()
                .filter(s -> (Double) s.get("attendance") < 75.0)
                .sorted(Comparator.comparing(s -> (Double) s.get("attendance")))
                .limit(5)
                .collect(Collectors.toList());

        return Map.of(
                "totalLectures", totalLectures,
                "studentAttendance", studentAttendance,
                "topDefaulters", topDefaulters
        );
    }

    // ================= REPORTS =================
    @GetMapping("/reports")
    public List<AttendanceReportDTO> getReports() {

        return attendanceRepo.studentAttendancePercentage()
                .stream()
                .map(d -> new AttendanceReportDTO(
                        (String) d[0],
                        (String) d[1],
                        ((Number) d[2]).doubleValue()
                ))
                .collect(Collectors.toList());
    }

    // ================= PDF BY LECTURE =================
    @GetMapping("/pdf/lecture/{lectureId}")
    public void downloadLecturePdf(
            @PathVariable String lectureId,
            HttpServletResponse response) throws Exception {

        response.setContentType("application/pdf");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=attendance_" + lectureId + ".pdf"
        );

        pdfService.generatePdf(
                attendanceRepo.findByLectureId(lectureId),
                response
        );
    }

    // ================= PDF BY STUDENT =================
    @GetMapping("/pdf/student/{rollNo}")
    public void downloadStudentPdf(
            @PathVariable String rollNo,
            HttpServletResponse response) throws Exception {

        response.setContentType("application/pdf");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=attendance_" + rollNo + ".pdf"
        );

        pdfService.generatePdf(
                attendanceRepo.findByRollNo(rollNo),
                response
        );
    }
}
