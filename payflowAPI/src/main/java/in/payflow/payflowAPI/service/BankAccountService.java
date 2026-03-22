package in.payflow.payflowAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.payflow.payflowAPI.dto.BankVerifyRequest;
import in.payflow.payflowAPI.dto.BankVerifyResponse;
import in.payflow.payflowAPI.entity.Account;
import in.payflow.payflowAPI.entity.Bank;
import in.payflow.payflowAPI.entity.LinkedAccount;
import in.payflow.payflowAPI.entity.User;
import in.payflow.payflowAPI.repository.BankRepository;

@Service
public class BankAccountService {
	@Autowired
	private BankRepository bankRepository;
	
	public LinkedAccount getActiveAccount(User user) {
		return user.getLinkedAccounts().stream().
				filter(acc -> "ACTIVE".equals(acc.getStatus()))
				.findFirst().orElseThrow(() -> new RuntimeException("No active bank account found"));
	}
	
	public Object verifyBankAccount(BankVerifyRequest request) {
	    for (Bank bank : bankRepository.findAll()) {
	        for (Account acc : bank.getAccounts()) {

	            if (acc.getAccountNumber().equals(request.getAccountNumber()) &&
	                acc.getIfscCode().equals(request.getIfscCode())) {

	                return new BankVerifyResponse(
	                    acc.getName(),
	                    acc.getAccountNumber(),
	                    acc.getIfscCode(),
	                    bank.getBankName()
	                );
	            }
	        }
	    }

	    return "Account not found";
	}
}
