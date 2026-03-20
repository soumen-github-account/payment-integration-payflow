package in.payflow.payflowAPI.service;

import com.twilio.exception.ApiException;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Service
public class TwilioSmsService implements SmsService {

    @Value("${twilio.verify.service.sid}")
    private String verifyServiceSid;

    @Override
    public void sendOtp(String mobileNumber) {
        Verification.creator(
                verifyServiceSid,
                formatMobile(mobileNumber),
                "sms"
        ).create();
    }

    @Override
    public boolean verifyOtp(String mobileNumber, String otp) {

        VerificationCheck check = VerificationCheck
                .creator(verifyServiceSid)
                .setTo(formatMobile(mobileNumber))
                .setCode(otp)
                .create();

        return "approved".equalsIgnoreCase(check.getStatus());
    }

    private String formatMobile(String mobile) {
        return mobile.startsWith("+") ? mobile : "+91" + mobile;
    }
}
