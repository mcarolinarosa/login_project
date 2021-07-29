package com.example.login_app.service;

import java.util.List;
import java.util.Map;

import com.example.login_app.dto.LoginDTO;
import com.example.login_app.dto.UserDTO;
import com.example.login_app.model.User;
import com.example.login_app.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {

        return userRepository.save(user);
    }

    public UserDTO verifyUser(LoginDTO user) {
        User userLogin = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User Id not found: " + user.getEmail()));

        if (!user.verifyLogin(userLogin, user))
            throw new RuntimeException("Wrong Email or Password!");

        return new UserDTO(userLogin);

    }

    public UserDTO editUser(Long userId, UserDTO user) {
        User userToEdit = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Id not found: " + userId));

        userToEdit = user.updateUser(userToEdit);

        userToEdit = userRepository.save(userToEdit);
        return new UserDTO(userToEdit);
    }

    public UserDTO changePassword(Long userId, Map<String, String> params) {
        User userToEdit = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Id not found: " + userId));

        String oldPassword = params.get("password");
        String newPassword = params.get("newPassword");
        String repeatPassword = params.get("passwordRepeat");

        if (!oldPassword.equals(userToEdit.getPassword())) {
            throw new RuntimeException("The old password is incorrect!");
        }

        if (!repeatPassword.equals(newPassword)) {
            throw new RuntimeException("The new password does not match the repeated!");
        }

        userToEdit.setPassword(newPassword);

        userToEdit = userRepository.save(userToEdit);
        return new UserDTO(userToEdit);
    }

    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User Id not found: " + userId));
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

}
