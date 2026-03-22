package in.payflow.payflowAPI.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import in.payflow.payflowAPI.dto.SearchAccountResponse;
import in.payflow.payflowAPI.dto.SearchUserResponse;
import in.payflow.payflowAPI.entity.Account;
import in.payflow.payflowAPI.entity.Bank;
import in.payflow.payflowAPI.entity.LinkedAccount;
import in.payflow.payflowAPI.entity.UpiProfile;
import in.payflow.payflowAPI.entity.User;
import org.springframework.data.mongodb.core.query.*;


@Service
public class UpiService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void createUpiProfile(String mobileNumber) {

        Query query = new Query(
                Criteria.where("accounts.mobileNumber").is(mobileNumber)
        );

        Bank bank = mongoTemplate.findOne(query, Bank.class);

        if (bank == null) {
            throw new RuntimeException("No bank account linked");
        }

        Account account = bank.getAccounts().stream()
                .filter(a -> mobileNumber.equals(a.getMobileNumber()))
                .findFirst()
                .orElseThrow();

        boolean alreadyExists = account.getUpiProfiles() != null &&
                account.getUpiProfiles().stream()
                        .anyMatch(u -> "PayFlow".equals(u.getApp()));

        if (alreadyExists) {
            throw new RuntimeException("UPI already exists for PayFlow");
        }

        String upiId = generateUpiId(account.getName(), "payflow");

        UpiProfile profile = new UpiProfile();
        profile.setUpiId(upiId);
        profile.setApp("PayFlow");
        profile.setActive(true);

        Update update = new Update()
                .push("accounts.$.upiProfiles", profile);

        mongoTemplate.updateFirst(query, update, Bank.class);
        
        LinkedAccount linkedAccount = buildLinkedAccount(account, upiId, bank);

        // Push LinkedAccount into User
        addLinkedAccountToUser(mobileNumber, linkedAccount);
    }
    
    private LinkedAccount buildLinkedAccount(Account account, String upiId, Bank bank) {

        LinkedAccount linkedAccount = new LinkedAccount();
        linkedAccount.setAccountId(account.getAccountId());
        linkedAccount.setName(account.getName());
        linkedAccount.setBankName(bank.getBankName());
        linkedAccount.setAccountNumber(account.getAccountNumber());
        linkedAccount.setIfscCode(account.getIfscCode());
        linkedAccount.setMobileNumber(account.getMobileNumber());
        linkedAccount.setUpiId(upiId);
        linkedAccount.setBalance(account.getBalance());
        linkedAccount.setStatus("ACTIVE");

        return linkedAccount;
    }
    
    private void addLinkedAccountToUser(String mobileNumber, LinkedAccount linkedAccount) {

        Query userQuery = new Query(
                Criteria.where("mobileNumber").is(mobileNumber)
        );

        Update update = new Update()
                .push("linkedAccounts", linkedAccount);

        mongoTemplate.updateFirst(userQuery, update, User.class);
    }

    private String generateUpiId(String name, String handle) {
        int random = 1000 + new Random().nextInt(9000);
        return name.toLowerCase().replaceAll("\\s+", "")
                + random + "@" + handle;
    }
    
//    public SearchUserResponse searchUserByMobile(String mobileNumber) {
//
//	    Query query = new Query(
//	            Criteria.where("accounts.mobileNumber").is(mobileNumber)
//	    );
//	
//	    Bank bank = mongoTemplate.findOne(query, Bank.class);
//	
//	    if (bank == null) {
//	        SearchUserResponse response = new SearchUserResponse(true);
//	        response.setRegistered(false);
//	        response.setMessage("User not found");
//	        return response;
//	    }
//	
//	    // Get matched account
//	    Account account = bank.getAccounts().stream()
//	            .filter(a -> mobileNumber.equals(a.getMobileNumber()))
//	            .findFirst()
//	            .orElse(null);
//	
//	    if (account == null) {
//	        SearchUserResponse response = new SearchUserResponse(true);
//	        response.setRegistered(false);
//	        response.setMessage("Account not found");
//	        return response;
//	    }
//	
//	    // Check UPI profiles
//	    if (account.getUpiProfiles() == null || account.getUpiProfiles().isEmpty()) {
//	        SearchUserResponse response = new SearchUserResponse(true);
//	        response.setRegistered(true);
//	        response.setHasUpi(false);
//	        response.setMessage("No UPI profile linked");
//	        return response;
//	    }
//	
//	    // Take first active UPI
//	    UpiProfile profile = account.getUpiProfiles().stream()
//	            .filter(UpiProfile::isActive)
//	            .findFirst()
//	            .orElse(account.getUpiProfiles().get(0));
//	
//	    // Build response
//	    SearchUserResponse response = new SearchUserResponse(true);
//	    response.setRegistered(true);
//	    response.setHasUpi(true);
//	    response.setName(account.getName());
//	    response.setMobileNumber(account.getMobileNumber());
//	    response.setUpiId(profile.getUpiId());
//	    response.setBankName(bank.getBankName());
//	
//	    return response;
//	}
    public SearchUserResponse searchUserByMobile(String mobileNumber, String bankName) {

        Query query = new Query(
                Criteria.where("bankName").is(bankName)
                        .and("accounts")
                        .elemMatch(Criteria.where("mobileNumber").is(mobileNumber))
        );

        Bank bank = mongoTemplate.findOne(query, Bank.class);

        // No account in THIS bank
        if (bank == null) {
            SearchUserResponse response = new SearchUserResponse(true);
            response.setRegistered(false);
            response.setMessage("No account found in selected bank");
            return response;
        }

        Account account = bank.getAccounts().stream()
                .filter(a -> mobileNumber.equals(a.getMobileNumber()))
                .findFirst()
                .orElse(null);

        if (account == null) {
            SearchUserResponse response = new SearchUserResponse(true);
            response.setRegistered(false);
            return response;
        }

        SearchUserResponse response = new SearchUserResponse(true);
        response.setRegistered(true);
        response.setHasUpi(account.getUpiProfiles() != null && !account.getUpiProfiles().isEmpty());
        response.setHasPin(account.getUpiPin() != null);
        response.setName(account.getName());
        response.setMobileNumber(account.getMobileNumber());
        response.setBankName(bank.getBankName());

        if (response.isHasUpi()) {
            UpiProfile profile = account.getUpiProfiles().stream()
                    .filter(UpiProfile::isActive)
                    .findFirst()
                    .orElse(account.getUpiProfiles().get(0));

            response.setUpiId(profile.getUpiId());
        }

        return response;
    }
    public SearchAccountResponse seachUserByAccount(String accountNo, String ifscCode) {
    	Query query = new Query(
    			Criteria.where("accounts.accountNumber").is(accountNo)
    			.and("accounts.ifscCode").is(ifscCode)
    	);
    	
    	Bank bank = mongoTemplate.findOne(query, Bank.class);
//    	System.out.print(bank.getBankName()+" "+ bank.getBankId());
 	
    	if(bank == null) {
    		SearchAccountResponse response = new SearchAccountResponse();
    		response.setSuccess(false);
    		response.setMessage("Account not found");
    		return response;
    	}
    	
    	// find matching account
    	Account account = bank.getAccounts().stream()
    						.filter(a -> accountNo.equals(a.getAccountNumber())
    								&& ifscCode.equals(a.getIfscCode()))
    						.findFirst()
    						.orElse(null);
    	
    	if(account == null) {
    		SearchAccountResponse response = new SearchAccountResponse();
    		response.setSuccess(false);
    		response.setMessage("Account not found");
    		return response;
    	}
    	
    	SearchAccountResponse response = new SearchAccountResponse();
    	response.setSuccess(true);
    	response.setBankName(bank.getBankName());
    	response.setHolderName(account.getName());
    	response.setAccountNo(account.getAccountNumber());
    	response.setIfsc(account.getIfscCode());
    	
    	return response;
    }
    
}
