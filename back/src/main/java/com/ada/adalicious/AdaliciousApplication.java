package com.ada.adalicious;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class AdaliciousApplication {

	public static void main(String[] args) {
		// Charger les variables d'environnement depuis .env
        Dotenv dotenv = Dotenv.configure().load();
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
		// lance l'aplicaiton
		SpringApplication.run(AdaliciousApplication.class, args);
		System.out.println("Adalicious is running...");
	}

}
