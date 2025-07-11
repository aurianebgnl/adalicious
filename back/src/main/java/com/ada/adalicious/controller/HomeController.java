package com.ada.adalicious.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET})
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Bienvenue sur l'API Adalicious");
    }
    
    @GetMapping("/api")
    public ResponseEntity<String> api() {
        return ResponseEntity.ok("API Adalicious - Endpoints disponibles : /api/images/upload");
    }
}