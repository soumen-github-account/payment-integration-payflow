package in.payflow.payflowAPI.service;

import in.payflow.payflowAPI.entity.User;
import in.payflow.payflowAPI.entity.UserSession;
import in.payflow.payflowAPI.repository.UserRepository;
import in.payflow.payflowAPI.repository.UserSessionRepository;
import in.payflow.payflowAPI.util.JwtUtil;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserSessionRepository sessionRepository;
    private final SmsService smsService;
    private final JwtUtil jwtUtil;
    
    public AuthService(UserRepository userRepository,
                       UserSessionRepository sessionRepository,
                       SmsService smsService, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.smsService = smsService;
        this.jwtUtil = jwtUtil;
    }

    // ================= SEND OTP =================
    public void sendOtp(String mobile) {

        if (mobile == null || !mobile.matches("\\d{10}")) {
            throw new RuntimeException("Invalid mobile number");
        }

        smsService.sendOtp("+91" + mobile); // Twilio requires country code
    }

    // ================= VERIFY OTP =================
    public String verifyOtp(String mobile, String otp) {

        boolean verified = smsService.verifyOtp("+91" + mobile, otp);

        if (!verified) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        // Create user if not exists
        User user = userRepository.findByMobileNumber(mobile)
                .orElseGet(() -> {
                    User u = new User();
                    u.setMobileNumber(mobile);
                    u.setKycStatus("PENDING");
                    u.setCreatedAt(Instant.now());
                    u.setName("");
                    u.setLinkedAccounts(null);
                    return userRepository.save(u);
                });

        // Deactivate previous session
//        sessionRepository.findByMobileNumberAndActiveTrue(mobile)
//                .ifPresent(session -> {
//                    session.setActive(false);
//                    sessionRepository.save(session);
//                });

        // Create new session
//        UserSession session = new UserSession();
//        session.setMobileNumber(mobile);
//        session.setActive(true);
//        session.setLoginTime(Instant.now());
//        session.setToken(UUID.randomUUID().toString());
//
//        sessionRepository.save(session);

//        return session.getToken();
        return jwtUtil.generateToken(mobile);
    }
}
