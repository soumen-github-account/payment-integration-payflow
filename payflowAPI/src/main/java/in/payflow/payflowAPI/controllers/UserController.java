package in.payflow.payflowAPI.controllers;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.payflow.payflowAPI.entity.User;
import in.payflow.payflowAPI.repository.UserRepository;
import in.payflow.payflowAPI.util.JwtUtil;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "https://payment-integration-payflow.vercel.app", allowCredentials="true")
public class UserController {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public UserController(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }
    
    @GetMapping("/profile")
    public User getProfile(@CookieValue(value = "token", required = false) String token) {

        System.out.println("TOKEN: " + token);

        if (token == null) {
            throw new RuntimeException("Token missing");
        }

        try {
            String mobile = jwtUtil.extractMobile(token);
            System.out.println("MOBILE: " + mobile);

            return userRepository.findByMobileNumber(mobile)
                    .orElseThrow(() -> new RuntimeException("User not found"));

        } catch (Exception e) {
            e.printStackTrace(); // 🔥 IMPORTANT
            throw new RuntimeException("JWT error");
        }
    }
    
   }