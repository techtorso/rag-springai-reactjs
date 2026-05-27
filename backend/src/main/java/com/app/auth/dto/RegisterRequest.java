package com.app.auth.dto;

import com.app.auth.model.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegisterRequest {
	
	
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
    private String email;
    
	@NotBlank(message = "Password is required")
	
	
	@Pattern(
	        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
	        message = "Password must contain uppercase, lowercase, number, special character and minimum 8 characters"
	    )
//    @Size(min = 8, message = "Password must be at least 8 characters")
	private String password;
	
	
    private Role role;
    private String comfirmPassword;
    
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getComfirmPassword() {
		return comfirmPassword;
	}
	public void setComfirmPassword(String comfirmPassword) {
		this.comfirmPassword = comfirmPassword;
	}
 
	
}