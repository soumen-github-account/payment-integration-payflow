package in.payflow.payflowAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import in.payflow.payflowAPI.dto.ApiResponse;
import in.payflow.payflowAPI.entity.Bank;

@Service
public class PinService {

    @Autowired
    private MongoTemplate mongoTemplate;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ApiResponse createUpiPin(String mobileNumber, String pin) {
    	// Validate PIN length (basic validation)
        if (pin == null || pin.length() != 4) {
            return new ApiResponse(false, "UPI PIN must be 4 digits");
        }

        Query query = new Query(
                Criteria.where("accounts.mobileNumber").is(mobileNumber)
        );

        Bank bank = mongoTemplate.findOne(query, Bank.class);

        if (bank == null) {
            return new ApiResponse(false, "Account not found");
        }

        String existingPin = bank.getAccounts().stream()
                .filter(a -> mobileNumber.equals(a.getMobileNumber()))
                .map(a -> a.getUpiPin())
                .findFirst()
                .orElse(null);

        if (existingPin != null && !existingPin.isEmpty()) {
            return new ApiResponse(false, "UPI PIN already set");
        }

        // 🔐 Hash the PIN
        String hashedPin = passwordEncoder.encode(pin);

        Update update = new Update()
                .set("accounts.$.upiPin", hashedPin);

        mongoTemplate.updateFirst(query, update, Bank.class);

        return new ApiResponse(true, "UPI PIN set successfully");
        
    }
}
