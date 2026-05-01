package com.example.attendance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.attendance.entity.Student;

public interface StudentRepository extends JpaRepository<Student,Long> {
	
	Optional<Student> findByMobileAndPassword(String mobile, String password);

}
