package com.example.login_app.controller;

import java.util.List;
import java.util.Map;

import com.example.login_app.dto.LoginDTO;
import com.example.login_app.dto.UserDTO;
import com.example.login_app.model.User;
import com.example.login_app.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoginController {
	@Autowired
	private UserService userService;

	@PostMapping(value = "/api/registry", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createUser(@RequestBody User user) {
		User newUser = userService.createUser(user);
		return ResponseEntity.ok(newUser);
	}

	@PostMapping(value = "/api/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> loginUser(@RequestBody LoginDTO user) {
		UserDTO loggedUser = userService.verifyUser(user);
		return ResponseEntity.ok(loggedUser);
	}

	@PutMapping(value = "/api/edit_profile/{userId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> editUser(@PathVariable("userId") final Long userId, @RequestBody UserDTO user) {
		UserDTO updatedUser = userService.editUser(userId, user);
		return ResponseEntity.ok(updatedUser);
	}

	@PutMapping(value = "/api/change_pass/{userId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> changePassword(@PathVariable("userId") final Long userId,
			@RequestBody Map<String, String> params) {
		UserDTO updatedUser = userService.changePassword(userId, params);
		return ResponseEntity.ok(updatedUser);
	}

	@GetMapping(value = "/api/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getUserById(@PathVariable("userId") final Long userId) {
		User newUser = userService.findUserById(userId);
		return ResponseEntity.ok(newUser);
	}

	@GetMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getAllUsers() {
		List<User> allUsers = userService.findAllUsers();
		return ResponseEntity.ok(allUsers);
	}
}
