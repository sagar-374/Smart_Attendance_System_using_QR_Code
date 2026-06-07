package com.example.attendance.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendance.entity.Faculty;
import com.example.attendance.security.JwtUtil;
import com.example.attendance.service.FacultyService;


@RestController
@RequestMapping("/faculty")
@CrossOrigin(origins = "*")
public class FacultyController {

    private final FacultyService facultyService;
    private final JwtUtil jwtUtil;
    public FacultyController(FacultyService facultyService, JwtUtil jwtUtil) {
        this.facultyService = facultyService;
        this.jwtUtil = jwtUtil;
    }


    // FACULTY LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {

        try {
            Faculty faculty = facultyService.login(
                data.get("mobile"),
                data.get("password")
            );

            String token = jwtUtil.generateToken(
                faculty.getMobile(),
                "FACULTY"
            );

            return ResponseEntity.ok(
                Map.of(
                    "token", token,
                    "role", "FACULTY",
                    "faculty", faculty
                )
            );

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }

    // LIST
    @GetMapping("/list")
    public ResponseEntity<List<Faculty>> getFacultyList() {
        return ResponseEntity.ok(facultyService.getAllFaculty());
    }

    // ADD
    @PostMapping("/add")
    public ResponseEntity<?> addFaculty(@RequestBody Faculty faculty) {
        try {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(facultyService.addFaculty(faculty));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    // UPDATE
    @PutMapping("/updatefaculty/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Faculty f) {
        try {
            Faculty updated = facultyService.updateFaculty(id, f);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // DELETE
    @DeleteMapping("/deletefaculty/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            facultyService.deleteFaculty(id);
            return ResponseEntity.ok("Deleted Successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
