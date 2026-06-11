package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;


@EnableAsync
@SpringBootApplication
public class ProductionGradeRagAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductionGradeRagAppApplication.class, args);
	}

}
