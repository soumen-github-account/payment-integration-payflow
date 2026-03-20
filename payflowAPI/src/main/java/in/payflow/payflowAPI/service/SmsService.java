
package in.payflow.payflowAPI.service;

public interface SmsService {
    void sendOtp(String mobileNumber);
    boolean verifyOtp(String mobileNumber, String otp);
}
