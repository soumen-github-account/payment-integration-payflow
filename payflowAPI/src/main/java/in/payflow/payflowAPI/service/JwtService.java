package in.payflow.payflowAPI.service;

import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtService {
	private static final String SECRET = "PAYFLOW_1234";
	public String generateToken(String mobile) {
		return Jwts.builder().setSubject(mobile)
				.setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
	}
}
