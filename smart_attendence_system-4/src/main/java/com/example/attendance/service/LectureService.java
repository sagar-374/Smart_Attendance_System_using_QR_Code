package com.example.attendance.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.attendance.entity.Lecture;
import com.example.attendance.entity.LectureStatus;
import com.example.attendance.repository.LectureRepository;

@Service
public class LectureService {

    private final LectureRepository lectureRepo;

    public LectureService(LectureRepository lectureRepo) {
        this.lectureRepo = lectureRepo;
    }

    // ================= START LECTURE =================
    public Lecture startLecture(Lecture lecture) {

        // 🔥 Prevent duplicate running lecture
        lectureRepo.findAll().stream()
                .filter(l -> l.getLectureId().equals(lecture.getLectureId())
                        && l.getStatus() == LectureStatus.STARTED)
                .findAny()
                .ifPresent(l -> {
                    throw new RuntimeException("Lecture already started");
                });

        lecture.setStatus(LectureStatus.STARTED);

        // 🔥 ALWAYS generate QR token
        lecture.setQrToken(UUID.randomUUID().toString());

        lecture.setCreatedAt(LocalDateTime.now());
        lecture.setEndedAt(null);

        return lectureRepo.save(lecture);
    }

    // ================= GET SINGLE =================
    public Lecture getLecture(int id) {
        return lectureRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Lecture not found"));
    }

    // ================= GET ALL =================
    public List<Lecture> getAllLectures() {
        return lectureRepo.findAll();
    }

    // ================= END LECTURE =================
    public Lecture endLecture(int id) {

        Lecture lecture = lectureRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Lecture not found"));

        if (lecture.getStatus() == LectureStatus.ENDED) {
            throw new RuntimeException("Lecture already ended");
        }

        lecture.setStatus(LectureStatus.ENDED);

        // ❌ DO NOT SET NULL (Important)
        // lecture.setQrToken(null);   <-- REMOVE THIS LINE

        lecture.setEndedAt(LocalDateTime.now());

        return lectureRepo.save(lecture);
    }
}
