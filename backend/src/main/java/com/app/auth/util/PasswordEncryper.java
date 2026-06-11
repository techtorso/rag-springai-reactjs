package com.app.auth.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncryper {
	public static void main(String args[]) {
		System.out.println(new BCryptPasswordEncoder().encode("Apple@123a"));
	}

}
