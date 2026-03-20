package in.payflow.payflowAPI.service;

import org.springframework.stereotype.Service;

import in.payflow.payflowAPI.entity.LinkedAccount;
import in.payflow.payflowAPI.entity.User;

@Service
public class BankAccountService {
	public LinkedAccount getActiveAccount(User user) {
		return user.getLinkedAccounts().stream().
				filter(acc -> "ACTIVE".equals(acc.getStatus()))
				.findFirst().orElseThrow(() -> new RuntimeException("No active bank account found"));
	}
}
