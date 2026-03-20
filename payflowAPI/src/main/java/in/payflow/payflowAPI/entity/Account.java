package in.payflow.payflowAPI.entity;

import java.util.List;

public class Account {
	private String accountId;
    private String name;
    private String accountNumber;
    private String ifscCode;
    private String mobileNumber;
    private String upiPin;
    private Double balance;
    private String status;
    private List<UpiProfile> upiProfiles;
	public List<UpiProfile> getUpiProfiles() {
		return upiProfiles;
	}
	public void setUpiProfiles(List<UpiProfile> upiProfiles) {
		this.upiProfiles = upiProfiles;
	}
	public String getAccountId() {
		return accountId;
	}
	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getIfscCode() {
		return ifscCode;
	}
	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getUpiPin() {
		return upiPin;
	}
	public void setUpiPin(String upiPin) {
		this.upiPin = upiPin;
	}
	public Double getBalance() {
		return balance;
	}
	public void setBalance(Double balance) {
		this.balance = balance;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
    
}
