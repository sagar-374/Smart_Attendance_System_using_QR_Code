package com.example.attendance.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth

            	    // 🔓 PUBLIC
            	    .requestMatchers(
            	        "/",
            	        "/api/auth/**",
            	        "/student/login",
            	        "/faculty/login",
            	        "/api/qr/**"
            	    ).permitAll()

            	    // 👨‍🏫 ADMIN + FACULTY (FULL STUDENT ACCESS)
            	    .requestMatchers(
            	        "/student/add",
            	        "/student/list",
            	        "/student/update/**",
            	        "/student/delete/**"
            	    ).hasAnyRole("ADMIN", "FACULTY")

            	    // 👑 ADMIN ONLY (FACULTY MANAGEMENT)
            	    .requestMatchers(
            	        "/faculty/add",
            	        "/faculty/deletefaculty/**"
            	    ).hasRole("ADMIN")

            	    // 👨‍🏫 FACULTY + ADMIN
            	    .requestMatchers(
            	        "/api/lecture/**",
            	        "/api/attendance/lecture/**",
            	        "/api/attendance/pdf/lecture/**"
            	    ).hasAnyRole("FACULTY", "ADMIN")

            	 // 🎓 STUDENT ONLY
            	    .requestMatchers(
            	        "/api/attendance/mark",
            	        "/api/attendance/student/**",
            	        "/api/attendance/lectures/student/**",
            	        "/api/attendance/pdf/student/**"
            	    ).hasRole("STUDENT")

            	    .anyRequest().authenticated()
            	)



            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:4050"));
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization","Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
