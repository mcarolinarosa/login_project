package com.example.login_app.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.example.login_app.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {

    public LoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public LoginDTO(User user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String password;

    public boolean verifyLogin(User userLogin, LoginDTO user) {
        return userLogin.getPassword().equals(user.getPassword());
    }

}
