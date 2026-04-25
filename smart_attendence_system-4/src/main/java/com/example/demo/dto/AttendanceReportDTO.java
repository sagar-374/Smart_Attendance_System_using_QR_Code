package com.example.demo.dto;

public class AttendanceReportDTO {

    private String rollNo;
    private String name;
    private double attendancePercentage;

    public AttendanceReportDTO(String rollNo, String name, double attendancePercentage) {
        this.rollNo = rollNo;
        this.name = name;
        this.attendancePercentage = attendancePercentage;
    }

    public String getRollNo() { return rollNo; }
    public String getName() { return name; }
    public double getAttendancePercentage() { return attendancePercentage; }
}
