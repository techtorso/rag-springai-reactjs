//package com.app.auth.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.app.auth.dto.RegisterRequest;
//import com.app.auth.model.User;
//import com.app.auth.service.AuthService;
//
//
//
//@RestController
//@RequestMapping("api/admin")
//public class AdminController {
//	
//	@Autowired
//    private AuthService authService;
//	
//	
//	@PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
//        return ResponseEntity.ok(authService.register(req));
//    }
//	
////	@GetMapping("/users")
////	public ResponseEntity<List<User>>  users() {
////        return ResponseEntity.ok(authService.getUsers());
////    }
//}