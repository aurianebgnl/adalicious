package com.ada.adalicious.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // autoriser le front local
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // inclut PATCH !
                .allowedHeaders("*")
                .allowCredentials(true)
                .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials");
    }
}
