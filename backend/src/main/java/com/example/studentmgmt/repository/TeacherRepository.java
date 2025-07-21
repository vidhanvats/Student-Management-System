package com.example.studentmgmt.repository;

import com.example.studentmgmt.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
