package in.payflow.payflowAPI.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.payflow.payflowAPI.dto.BankVerifyRequest;
import in.payflow.payflowAPI.dto.ChatHistoryResponse;
import in.payflow.payflowAPI.dto.ErrorResponse;
import in.payflow.payflowAPI.entity.Account;
import in.payflow.payflowAPI.entity.Bank;
import in.payflow.payflowAPI.entity.LinkedAccount;
import in.payflow.payflowAPI.entity.Transaction;
import in.payflow.payflowAPI.entity.UpiProfile;
import in.payflow.payflowAPI.service.AccountService;
import in.payflow.payflowAPI.service.BankAccountService;
import in.payflow.payflowAPI.service.TransactionService;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = {"https://payment-integration-payflow.vercel.app", "http://localhost:5173"}, allowCredentials="true")
public class AccountController {
	private final TransactionService transactionService;
    private final MongoTemplate mongoTemplate;
    @Autowired
    private BankAccountService bankAccountService;


    public AccountController(MongoTemplate mongoTemplate, TransactionService transactionService) {
        this.mongoTemplate = mongoTemplate;
        this.transactionService = transactionService;
    }
    

    @GetMapping("/{mobileNumber}")
	public ResponseEntity<?> getUserDetails(@PathVariable String mobileNumber) {
	
	    Query query = new Query(
	            Criteria.where("accounts.mobileNumber").is(mobileNumber)
	    );
	
	    Bank bank = mongoTemplate.findOne(query, Bank.class);
	
	    if (bank == null) {
	        return ResponseEntity.status(200)
	                .body(new ErrorResponse(false, "User not found"));
	    }
	
	    Account account = bank.getAccounts().stream()
	            .filter(acc -> mobileNumber.equals(acc.getMobileNumber()))
	            .findFirst()
	            .orElse(null);
	
	    if (account == null) {
	        return ResponseEntity.status(404)
	                .body(new ErrorResponse(false, "Account not found"));
	    }
	
	    String upiId = null;
	    boolean isUpiActive = false;
	
	    if (account.getUpiProfiles() != null) {
	        for (UpiProfile profile : account.getUpiProfiles()) {
	            if (profile.isActive()) {
	                upiId = profile.getUpiId();
	                isUpiActive = true;
	                break;
	            }
	        }
	    }
	
	    Map<String, Object> response = new HashMap<>();
	    response.put("success", true);
	    response.put("name", account.getName());
	    response.put("bankName", bank.getBankName());
	    response.put("upiId", upiId);
	    response.put("upiActive", isUpiActive);
	    response.put("mobileNumber", account.getMobileNumber());
	
	    return ResponseEntity.ok(response);
	}
    
    @GetMapping("/chat")
    public ChatHistoryResponse getChat(
            @RequestParam String myMobile,
            @RequestParam String otherMobile) {

        return transactionService.getChatHistory(myMobile, otherMobile);
    }
    
    @PostMapping("/check-upi")
    public ResponseEntity<?> checkUpiForContacts(@RequestBody List<String> mobileNumbers) {

        List<Map<String, Object>> result = new ArrayList<>();

        for (String mobile : mobileNumbers) {

            Query query = new Query(
                    Criteria.where("accounts.mobileNumber").is(mobile)
            );

            Bank bank = mongoTemplate.findOne(query, Bank.class);

            boolean isUpiActive = false;
            String upiId = null;
            String name = null;

            if (bank != null) {
                Account account = bank.getAccounts().stream()
                        .filter(acc -> mobile.equals(acc.getMobileNumber()))
                        .findFirst()
                        .orElse(null);

                if (account != null) {
                    name = account.getName();

                    if (account.getUpiProfiles() != null) {
                        for (UpiProfile profile : account.getUpiProfiles()) {
                            if (profile.isActive()) {
                                isUpiActive = true;
                                upiId = profile.getUpiId();
                                break;
                            }
                        }
                    }
                }
            }

            Map<String, Object> userData = new HashMap<>();
            userData.put("mobileNumber", mobile);
            userData.put("name", name);
            userData.put("upiId", upiId);
            userData.put("upiActive", isUpiActive);

            result.add(userData);
        }

        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/transactions/{mobile}")
    public ResponseEntity<?> getTransactions(@PathVariable String mobile){
    	List<Transaction> transactions = transactionService.getUserTransactions(mobile);
    	return ResponseEntity.ok(transactions);
    }
    @PostMapping("/verify-account")
    public Object verifyAccount(@RequestBody BankVerifyRequest request) {
        return bankAccountService.verifyBankAccount(request);
    }
}