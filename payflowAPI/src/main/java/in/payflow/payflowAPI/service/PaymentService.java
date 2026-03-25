package in.payflow.payflowAPI.service;

import org.springframework.stereotype.Service;

import in.payflow.payflowAPI.dto.BalanceCheckRequest;
import in.payflow.payflowAPI.dto.BalanceResponse;
import in.payflow.payflowAPI.dto.TransferRequest;
import in.payflow.payflowAPI.entity.Account;
import in.payflow.payflowAPI.entity.Bank;
import in.payflow.payflowAPI.entity.Party;
import in.payflow.payflowAPI.entity.Transaction;
import in.payflow.payflowAPI.entity.UpiProfile;
import in.payflow.payflowAPI.repository.BankRepository;
import in.payflow.payflowAPI.repository.TransactionRepository;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class PaymentService {
	@Autowired
	private BankRepository bankRepository;
	
	@Autowired
    private TransactionRepository transactionRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private String getActiveUpiId(Account account) {
	    if (account.getUpiProfiles() == null) return null;

	    for (UpiProfile upi : account.getUpiProfiles()) {
	        if (upi.isActive()) {
	            return upi.getUpiId();
	        }
	    }
	    return null; // no active UPI
	}
	
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
		
		if(!passwordEncoder.matches(request.getPin(), sender.getUpiPin())) {
		    return "Invalid PIN";
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
		System.out.println("Transfer Type: " + request.getTransferType());
		System.out.println("Receiver Acc No: " + request.getReceiverAccountNumber());
		System.out.println("Receiver IFSC: " + request.getReceiverIfsc());
		
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
        senderParty.setMobileNumber(sender.getMobileNumber());
        senderParty.setBankName(senderBank.getBankName());
        senderParty.setUpiId(getActiveUpiId(sender));
        
        Party receiverParty = new Party();
        receiverParty.setName(receiver.getName());
        receiverParty.setAccountNumber(receiver.getAccountNumber());
        receiverParty.setMobileNumber(receiver.getMobileNumber());
        receiverParty.setBankName(receiverBank.getBankName());
        receiverParty.setUpiId(getActiveUpiId(sender));
        
        txn.setSender(senderParty);
        txn.setReceiver(receiverParty);
		
		transactionRepository.save(txn);
		
		return "Transaction Successful";
		
	}
	
	public BalanceResponse checkBalance(BalanceCheckRequest request) {
		Account userAccount = null;
		String bankName = null;

		for(Bank bank : bankRepository.findAll()) {
			for(Account acc : bank.getAccounts()) {
				if(acc.getMobileNumber().equals(request.getMobileNumber())) {
					userAccount = acc;
					bankName = bank.getBankName();
					break;
				}
			}
		}
		
		if(userAccount == null) {
			throw new RuntimeException("Account not found");
		}
		
//		if (!userAccount.getUpiPin().equals(request.getPin())) {
//	        throw new RuntimeException("Invalid PIN");
//	    }
		if(!passwordEncoder.matches(request.getPin(), userAccount.getUpiPin())) {
		    throw new RuntimeException("Invalid PIN");
		}
		
		 return new BalanceResponse(bankName, userAccount.getBalance());
	}
}
