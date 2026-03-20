package in.payflow.payflowAPI.service;

import org.springframework.stereotype.Service;

import in.payflow.payflowAPI.dto.BalanceCheckRequest;
import in.payflow.payflowAPI.dto.TransferRequest;
import in.payflow.payflowAPI.entity.Account;
import in.payflow.payflowAPI.entity.Bank;
import in.payflow.payflowAPI.entity.Party;
import in.payflow.payflowAPI.entity.Transaction;
import in.payflow.payflowAPI.repository.BankRepository;
import in.payflow.payflowAPI.repository.TransactionRepository;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;


@Service
public class PaymentService {
	@Autowired
	private BankRepository bankRepository;
	
	@Autowired
    private TransactionRepository transactionRepository;
	
	public String transferMoney(TransferRequest request) {
		Account sender = null;
		Account receiver = null;
		Bank senderBank = null;
		Bank receiverBank = null;
		for(Bank bank : bankRepository.findAll()) {
			for(Account acc : bank.getAccounts()) {
				if(acc.getMobileNumber().equals(request.getSenderMobile())) {
					sender = acc;
					senderBank = bank;
					break;
				}
			}
		}
		
		if(sender == null) {
			return "Sender Not found";
		}
		
		if(!sender.getUpiPin().equals(request.getPin())) {
			return "invalid PIN";
		}
		
		if(sender.getBalance() < request.getAmount()) {
			return "Insufficient Balance";
		}
		
		for(Bank bank : bankRepository.findAll()) {
			for(Account acc : bank.getAccounts()) {
				// Mobile Transfer
				if("MOBILE".equals(request.getTransferType()) && 
						acc.getMobileNumber().equals(request.getReceiverMobile())) {
					receiver = acc;
					receiverBank = bank;
				}
				// Bank Transfer
				if("BANK".equals(request.getTransferType()) && 
						acc.getAccountNumber().equals(request.getReceiverAccountNumber()) && 
						acc.getIfscCode().equals(request.getReceiverIfsc())) {
					receiver = acc;
					receiverBank = bank;
				}
			}
		}
		
		if(receiver == null) {
			return "Receiver not found";
		}
		
		sender.setBalance(sender.getBalance() - request.getAmount());
		receiver.setBalance(receiver.getBalance() + request.getAmount());
		
		bankRepository.save(senderBank);
		bankRepository.save(receiverBank);
		
		Transaction txn = new Transaction();
		txn.setTransactionId(UUID.randomUUID().toString());
		txn.setAmount(request.getAmount());
		txn.setCurrency("INR");
		txn.setStatus("SUCCESS");
		txn.setInitiatedAt(Instant.now());
		txn.setCompletedAt(Instant.now());
		
		Party senderParty = new Party();
        senderParty.setName(sender.getName());
        senderParty.setAccountNumber(sender.getAccountNumber());

        Party receiverParty = new Party();
        receiverParty.setName(receiver.getName());
        receiverParty.setAccountNumber(receiver.getAccountNumber());

		txn.setSender(senderParty);
		txn.setReceiver(senderParty);
		
		transactionRepository.save(txn);
		
		return "Transaction Successful";
		
	}
	
	public Double checkBalance(BalanceCheckRequest request) {
		Account userAccount = null;
		
		for(Bank bank : bankRepository.findAll()) {
			for(Account acc : bank.getAccounts()) {
				if(acc.getMobileNumber().equals(request.getMobileNumber())) {
					userAccount = acc;
					break;
				}
			}
		}
		
		if(userAccount == null) {
			throw new RuntimeException("Account not found");
		}
		
		if (!userAccount.getUpiPin().equals(request.getPin())) {
	        throw new RuntimeException("Invalid PIN");
	    }
		
		return userAccount.getBalance();
	}
}
