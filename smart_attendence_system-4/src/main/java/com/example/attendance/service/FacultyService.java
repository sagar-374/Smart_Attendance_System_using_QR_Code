package com.example.attendance.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.attendance.entity.Faculty;
import com.example.attendance.repository.FacultyRepository;

@Service
public class FacultyService {

    private final FacultyRepository repo;

    public FacultyService(FacultyRepository repo) {
        this.repo = repo;
    }

    // LOGIN
    public Faculty login(String mobile, String password) {
        return repo.findByMobileAndPassword(mobile.trim(), password.trim())
                .orElseThrow(() -> new RuntimeException("Invalid mobile or password"));
    }

    // GET ALL
    public List<Faculty> getAllFaculty() {
        return repo.findAll();
    }

    // ADD (FIXED)
    public Faculty addFaculty(Faculty faculty) {

        // ✅ Generate Faculty Code
        String code = "FAC-" + UUID.randomUUID()
                .toString()
                .substring(0, 6)
                .toUpperCase();

        faculty.setFacultyCode(code);

        return repo.save(faculty);
    }

    // UPDATE
    public Faculty updateFaculty(Long id, Faculty f) {
        Faculty existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        if (f.getName() != null && !f.getName().isEmpty())
            existing.setName(f.getName());

        if (f.getMobile() != null && !f.getMobile().isEmpty())
            existing.setMobile(f.getMobile());

        if (f.getEmail() != null && !f.getEmail().isEmpty())
            existing.setEmail(f.getEmail());

        if (f.getDepartment() != null && !f.getDepartment().isEmpty())
            existing.setDepartment(f.getDepartment());

        return repo.save(existing);
    }

    // DELETE
    public void deleteFaculty(Long id) {
        if (!repo.existsById(id))
            throw new RuntimeException("Faculty not found");

        repo.deleteById(id);
    }
}
