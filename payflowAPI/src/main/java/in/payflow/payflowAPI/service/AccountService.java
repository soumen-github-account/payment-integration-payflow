package in.payflow.payflowAPI.service;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import in.payflow.payflowAPI.entity.Bank;
import in.payflow.payflowAPI.entity.LinkedAccount;

@Service
public class AccountService {

    private final MongoTemplate mongoTemplate;

    public AccountService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Bank getAccountByMobile(String mobileNumber) {
    	Query query = new Query(
    		    Criteria.where("accounts.mobileNumber").is(mobileNumber)
    		);

    		Bank bank = mongoTemplate.findOne(query, Bank.class);
    		return bank;
    }
}