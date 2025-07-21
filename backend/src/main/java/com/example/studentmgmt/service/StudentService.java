package com.example.studentmgmt.service;

import com.example.studentmgmt.model.Student;
import com.example.studentmgmt.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student addStudent(Student student) {
        try {
            System.out.println("Saving student: " + student);
            return repository.save(student);
        } catch (Exception e) {
            System.err.println("Error saving student: " + e.getMessage());
            return null;
        }
    }


    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }


    public List<Student> searchStudents(String keyword) {
        return repository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrCourseContainingIgnoreCaseOrPhoneContainingIgnoreCase(
                keyword, keyword, keyword , keyword
        );
    }
    public Student getStudentById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
    }

}
