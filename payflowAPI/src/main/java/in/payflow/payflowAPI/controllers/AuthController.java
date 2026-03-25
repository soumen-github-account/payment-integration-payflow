package in.payflow.payflowAPI.controllers;

import in.payflow.payflowAPI.service.AuthService;

import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"https://payment-integration-payflow.vercel.app", "http://localhost:5173"}, allowCredentials="true")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Sending OTP
    @PostMapping("/send-otp")
    public Map<String, String> sendOtp(@RequestBody Map<String, String> requestBody) {
        String mobile = requestBody.get("mobile");
        authService.sendOtp(mobile);
        return Map.of("message", "OTP sent successfully");
    }

    // Verifying OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> requestBody) {
        String token = authService.verifyOtp(requestBody.get("mobile"), requestBody.get("otp"));
        
        ResponseCookie cookie = ResponseCookie.from("token", token)
        						.httpOnly(true)
        						.secure(true)
        						.path("/")
        						.maxAge(60 * 60 * 24)
        						.sameSite("None")
        						.build();
        
        return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body(Map.of("message", "Login Success"));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {

        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body("Logged out");
    }
}
