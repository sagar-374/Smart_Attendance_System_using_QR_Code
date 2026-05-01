package com.example.demo.dto;

import java.time.LocalDateTime;

import com.example.attendance.entity.LectureStatus;

public class AttendanceResponseDTO {

    private Long id;
    private String rollNo;
    private String name;
    private String lectureId;
    private String lectureTitle;
    private LectureStatus status;   // ✅ ADD THIS
    private LocalDateTime markedAt;

    public AttendanceResponseDTO(Long id,
                                 String rollNo,
                                 String name,
                                 String lectureId,
                                 String lectureTitle,
                                 LocalDateTime markedAt) {

        this.id = id;
        this.rollNo = rollNo;
        this.name = name;
        this.lectureId = lectureId;
        this.lectureTitle = lectureTitle;
        this.status = status;
        this.markedAt = markedAt;
    }

    public Long getId() { return id; }
    public String getRollNo() { return rollNo; }
    public String getName() { return name; }
    public String getLectureId() { return lectureId; }
    public String getLectureTitle() { return lectureTitle; }
    public LectureStatus getStatus() { return status; }   // ✅ ADD THIS
    public LocalDateTime getMarkedAt() { return markedAt; }
}
