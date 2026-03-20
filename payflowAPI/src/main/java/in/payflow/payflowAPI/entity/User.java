package in.payflow.payflowAPI.entity;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
	@Id
	private String id;
	
	private String name;
	private String email;
	
	@Indexed(unique = true)
	private String mobileNumber;
	private String kycStatus;
	
	private Instant createdAt;
	
	private List<LinkedAccount> linkedAccounts;
//	private List<UpiApp> enabledUpiApps;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getKycStatus() {
		return kycStatus;
	}
	public void setKycStatus(String kycStatus) {
		this.kycStatus = kycStatus;
	}
	public Instant getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
	public List<LinkedAccount> getLinkedAccounts() {
		return linkedAccounts;
	}
	public void setLinkedAccounts(List<LinkedAccount> linkedAccounts) {
		this.linkedAccounts = linkedAccounts;
	}
//	public List<UpiApp> getEnabledUpiApps() {
//		return enabledUpiApps;
//	}
//	public void setEnabledUpiApps(List<UpiApp> enabledUpiApps) {
//		this.enabledUpiApps = enabledUpiApps;
//	}
	
}
