package com.app.auth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.auth.dto.RegisterRequest;
import com.app.auth.model.UpdateRoleRequest;
import com.app.auth.model.User;
import com.app.auth.service.AdminUserService;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    @PostMapping
    public ResponseEntity<User> createUser(
            @RequestBody RegisterRequest request) {
    	System.out.println("Create User - Kishore");
        return ResponseEntity.ok(
                adminUserService.createUser(request));
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
    	System.out.println("Get Users - Kishore");
        return ResponseEntity.ok(
                adminUserService.getAllUsers());
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<User> updateRole(
            @PathVariable Long id,
            @RequestBody UpdateRoleRequest request) {
    	System.out.println("In or Out");
        return ResponseEntity.ok(
    
                adminUserService.updateRole(
                        id,
                        request.getRole()));
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<User> disableUser(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                adminUserService.disableUser(id));
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<User> enableUser(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                adminUserService.enableUser(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        adminUserService.deleteUser(id);

        return ResponseEntity.ok(
                "User deleted successfully");
    }
}