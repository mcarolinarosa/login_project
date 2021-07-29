package com.example.login_app.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

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
public class UserDTO {

    public UserDTO(String name, String email, String image) {
        this.name = name;
        this.email = email;
        this.image = image;
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.image = user.getImage();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // @Convert(converter = AttributeEncryptor.class)
    @Column(nullable = false, unique = true)
    private String email;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private String image;

    public User updateUser(User user) {

        user.setName(this.name);
        user.setImage(this.image);

        return user;
    }

}
