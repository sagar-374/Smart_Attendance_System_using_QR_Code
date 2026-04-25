//package com.example.attendance.entity;
//
//import org.springframework.stereotype.Component;
//
//@Component
//public class JwtUtil {
//
//    private static final String SECRET = "attendance_secret";
//
//    public static String generateToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 300000)) // 5 min
//                .signWith(SignatureAlgorithm.HS256, SECRET)
//                .compact();
//    }
//
//    public static String validateToken(String token) {
//        return Jwts.parser()
//                .setSigningKey(SECRET)
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }
//}
