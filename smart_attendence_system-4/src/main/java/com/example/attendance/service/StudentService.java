package com.example.attendance.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.attendance.entity.Student;
import com.example.attendance.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    // LOGIN
    public Student login(String mobile, String password) {
        return repo.findByMobileAndPassword(mobile.trim(), password.trim())
                .orElseThrow(() -> new RuntimeException("Invalid student credentials"));
    }

    // GET ALL
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    // ADD
    public Student addStudent(Student s) {
        return repo.save(s);
    }

    // UPDATE
    public Student updateStudent(Long id, Student s) {
        Student existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (s.getName() != null && !s.getName().isEmpty())
            existing.setName(s.getName());

        if (s.getMobile() != null && !s.getMobile().isEmpty())
            existing.setMobile(s.getMobile());

        if (s.getEmail() != null && !s.getEmail().isEmpty())
            existing.setEmail(s.getEmail());

        if (s.getDepartment() != null && !s.getDepartment().isEmpty())
            existing.setDepartment(s.getDepartment());

        return repo.save(existing);
    }

    // DELETE
    public void deleteStudent(Long id) {
        if (!repo.existsById(id))
            throw new RuntimeException("Student not found");

        repo.deleteById(id);
    }
}
