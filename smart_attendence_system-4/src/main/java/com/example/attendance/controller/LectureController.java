package com.example.attendance.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.attendance.entity.Lecture;
import com.example.attendance.service.LectureService;

@RestController
@RequestMapping("/api/lecture")
@CrossOrigin(origins = "http://localhost:4050")
public class LectureController {

    private final LectureService lectureService;

    public LectureController(LectureService lectureService) {
        this.lectureService = lectureService;
    }

    // ================= START LECTURE =================
    @PostMapping("/start")
    public ResponseEntity<?> startLecture(@RequestBody Lecture lecture) {
        try {
            Lecture startedLecture = lectureService.startLecture(lecture);
            return ResponseEntity.ok(startedLecture);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ================= END LECTURE =================
    @PostMapping("/end/{id}")
    public ResponseEntity<?> endLecture(@PathVariable int id) {
        try {
            Lecture endedLecture = lectureService.endLecture(id);
            return ResponseEntity.ok(endedLecture);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ================= GET SINGLE LECTURE =================
    @GetMapping("/{id}")
    public ResponseEntity<?> getLecture(@PathVariable int id) {
        try {
            Lecture lecture = lectureService.getLecture(id);
            return ResponseEntity.ok(lecture);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ================= GET ALL LECTURES =================
    @GetMapping("/all")
    public ResponseEntity<List<Lecture>> getAllLectures() {
        return ResponseEntity.ok(lectureService.getAllLectures());
    }
}
