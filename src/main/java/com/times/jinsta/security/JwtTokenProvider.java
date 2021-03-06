package com.times.jinsta.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret}")
    private String jwtSecret;
    // 토큰 5분
    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    //토큰 생성
    public String generateToken(Authentication authentication){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                    .setSubject(Long.toString(userPrincipal.getId())) //데이터 userid만
                    .setIssuedAt(new Date()) // 발행일자
                    .setExpiration(expiryDate) // 유효 시간
                    .signWith(SignatureAlgorithm.HS512, jwtSecret) //암호화 알고리즘
                    .compact();
    }

    // 토큰에서 정보 추출(userid 추출)
    public Long getUserIdFromJWT(String token){
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();

        return Long.parseLong(claims.getSubject());
    }

    // 토큰의 유효성 확인
    public boolean validateToken(String authToken){
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        }catch (SignatureException e){
            logger.error("Invalid JWT signature");
        }catch (MalformedJwtException e){
            logger.error("Invalid JWT token");
        }catch (ExpiredJwtException e){
            logger.error("Expired JWT token");
        }catch (UnsupportedJwtException e){
            logger.error("Unsupported JWT token");
        }catch (IllegalArgumentException e){
            logger.error("JWT claims string is empty");
        }
        return false;
    }
}
