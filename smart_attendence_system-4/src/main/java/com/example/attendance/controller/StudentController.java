package com.example.attendance.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.attendance.entity.Student;
import com.example.attendance.security.JwtUtil;
import com.example.attendance.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;
    private final JwtUtil jwtUtil;   // ✅ ADD THIS

    // ✅ Constructor injection
    public StudentController(StudentService studentService, JwtUtil jwtUtil) {
        this.studentService = studentService;
        this.jwtUtil = jwtUtil;
    }

    // 🔐 STUDENT LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {

        // 1️⃣ Validate student
        Student student = studentService.login(
                data.get("mobile"),
                data.get("password")
        );

        // 2️⃣ Generate JWT
        String token = jwtUtil.generateToken(
                student.getMobile(),
                "STUDENT"
        );

        // 3️⃣ Response
        return ResponseEntity.ok(
            Map.of(
                "role", "STUDENT",
                "student", student,
                "token", token
            )
        );
    }

    // LIST
    @GetMapping("/list")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // ADD
    @PostMapping("/add")
    public ResponseEntity<?> addStudent(@RequestBody Student s) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.addStudent(s));
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody Student s) {
        return ResponseEntity.ok(studentService.updateStudent(id, s));
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Deleted Successfully");
    }
}
