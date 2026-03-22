package in.payflow.payflowAPI.dto;

public class SearchUserRequest {
	private String mobileNumber;
	private String bankName; 
	
    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
    
}
