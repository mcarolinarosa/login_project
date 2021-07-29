package com.example.login_app.controller;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.io.ByteArrayInputStream;
import java.util.Base64;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoginController {
	@Autowired
	private UserService userService;

	@PostMapping(value = "/api/registry", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createUser(@RequestParam(name = "image", required = false) MultipartFile file,
			@RequestParam("name") String name, @RequestParam("email") String email,
			@RequestParam("password") String password, @RequestParam("passwordRepeat") String repeatPassword)
			throws SerialException, SQLException, IOException {

		String image = null;

		if (file != null) {

			Base64.Encoder base64Encoder = Base64.getEncoder().withoutPadding();
			image = base64Encoder.encodeToString(file.getBytes());
		}

		User newUser = new User(name, email, password, image);
		newUser = userService.createUser(newUser, repeatPassword);

		return ResponseEntity.ok(newUser);
	}

	@PostMapping(value = "/api/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> loginUser(@RequestBody LoginDTO user) {
		UserDTO loggedUser = userService.verifyUser(user);
		return ResponseEntity.ok(loggedUser);
	}

	@PutMapping(value = "/api/edit_profile/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> editUser(@PathVariable("userId") final Long userId,
			@RequestParam(name = "image", required = false) MultipartFile file, @RequestParam("name") String name)
			throws SerialException, SQLException, IOException {
		String image = null;

		if (file != null) {

			Base64.Encoder base64Encoder = Base64.getEncoder().withoutPadding();
			image = base64Encoder.encodeToString(file.getBytes());
		}
		UserDTO updatedUser = new UserDTO(name, image);
		updatedUser = userService.editUser(userId, updatedUser);
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
