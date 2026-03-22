package in.payflow.payflowAPI.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import in.payflow.payflowAPI.dto.ChatHistoryResponse;
import in.payflow.payflowAPI.entity.Account;
import in.payflow.payflowAPI.entity.Bank;
import in.payflow.payflowAPI.entity.Transaction;
import in.payflow.payflowAPI.entity.UpiProfile;
import in.payflow.payflowAPI.repository.BankRepository;

@Service
public class TransactionService {

    @Autowired
    private BankRepository bankRepository;

    @Autowired
    private MongoTemplate mongoTemplate; // ✅ REQUIRED

    public ChatHistoryResponse getChatHistory(String myMobile, String otherMobile) {

        // 🔹 Step 1: Get other user account
        Account otherAccount = null;
        Bank otherBank = null;

        outer:
        for (Bank bank : bankRepository.findAll()) {
            for (Account acc : bank.getAccounts()) {
                if (acc.getMobileNumber().equals(otherMobile)) {
                    otherAccount = acc;
                    otherBank = bank;
                    break outer;
                }
            }
        }

        if (otherAccount == null) {
            throw new RuntimeException("User not found");
        }

        // 🔹 Step 2: Get ACTIVE UPI ID
        String activeUpiId = null;

        if (otherAccount.getUpiProfiles() != null) {
            for (UpiProfile profile : otherAccount.getUpiProfiles()) {
                if (profile.isActive()) {
                    activeUpiId = profile.getUpiId();
                    break;
                }
            }
        }

        // fallback (optional)
        if (activeUpiId == null) {
            activeUpiId = "Not Available";
        }

        // 🔹 Step 3: Get transactions
        Query query = new Query(new Criteria().orOperator(

                // me → him
                new Criteria().andOperator(
                        Criteria.where("sender.mobileNumber").is(myMobile),
                        Criteria.where("receiver.mobileNumber").is(otherMobile)
                ),

                // him → me
                new Criteria().andOperator(
                        Criteria.where("sender.mobileNumber").is(otherMobile),
                        Criteria.where("receiver.mobileNumber").is(myMobile)
                )
        ));

        query.with(Sort.by(Sort.Direction.ASC, "initiatedAt"));

        List<Transaction> transactions =
                mongoTemplate.find(query, Transaction.class); // ✅ FIXED

        // 🔹 Step 4: Build response
        ChatHistoryResponse response = new ChatHistoryResponse();
        response.setName(otherAccount.getName());
        response.setBankName(otherBank.getBankName());
        response.setUpiId(activeUpiId); // ✅ ACTIVE UPI
        response.setMobileNumber(otherAccount.getMobileNumber());
        response.setTransactions(transactions);

        return response;
    }
    
    public List<Transaction> getUserTransactions(String mobileNumber){
    	Query query = new Query(new Criteria().orOperator(
    			Criteria.where("sender.mobileNumber").is(mobileNumber),
    			Criteria.where("receiver.mobileNumber").is(mobileNumber)
    			));
    	query.with(Sort.by(Sort.Direction.DESC, "initiatedAt"));
    	
    	return mongoTemplate.find(query, Transaction.class);
    }
}