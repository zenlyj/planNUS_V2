package com.orbital.planNUS;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.orbital.planNUS.nusmods.NUSModsBot;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class PlanNusApplication {

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	NUSModsBot nusModsBot() {
		return new NUSModsBot();
	}

	public static void main(String[] args) {
		SpringApplication.run(PlanNusApplication.class, args);
	}

}
