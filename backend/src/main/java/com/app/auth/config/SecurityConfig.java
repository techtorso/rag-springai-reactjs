package com.app.auth.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.app.auth.security.JwtAuthFilter;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;
    
    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	
    	System.out.println("Filter Chain - Kishore");
    	http
        .cors(Customizer.withDefaults())

        .csrf(csrf -> csrf.disable())

        .authorizeHttpRequests(auth -> auth

            // OPTIONS
            .requestMatchers(
                HttpMethod.OPTIONS,
                "/**"
            ).permitAll()

            // PUBLIC APIs
            .requestMatchers(
                "/api/auth/**"
            ).permitAll()

            // ADMIN APIs
            .requestMatchers(
                "/api/admin/**"
            ).hasRole("ADMIN")

            // RAG APIs
            .requestMatchers(
                "/api/rag/**"
            ).authenticated()

            // EVERYTHING ELSE
            .anyRequest().authenticated()
        )

        .sessionManagement(session ->
            session.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS
            )
        )

            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            ).addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            
            .exceptionHandling(ex -> ex
                    .authenticationEntryPoint((req, res, ex1) -> {
                        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    })
                    .accessDeniedHandler((req, res, ex2) -> {
                        res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    })
            );
//        System.out.println("Authentication set: " + SecurityContextHolder.getContext().getAuthentication());

        return http.build();
    }
    
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(allowedOrigins));
//        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}