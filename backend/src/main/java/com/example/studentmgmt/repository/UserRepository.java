package com.example.studentmgmt.repository;
import org.springframework.stereotype.Repository;

import com.example.studentmgmt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByUsernameAndPassword(String username, String password);

}

