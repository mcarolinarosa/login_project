package com.example.login_app.repository;

import java.util.List;
import java.util.Optional;

import com.example.login_app.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findAll();

    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);

    @Query(nativeQuery = true, value = "SELECT count(*) FROM user WHERE email =:email")
    long checkIfEmailExists(String email);
}