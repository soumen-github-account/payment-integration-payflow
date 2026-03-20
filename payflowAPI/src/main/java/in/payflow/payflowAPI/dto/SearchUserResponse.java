package in.payflow.payflowAPI.dto;

public class SearchUserResponse {
	private boolean success;
    private boolean registered;
    private boolean hasUpi;
    private String name;
    private String upiId;
    private String message;
    private String bankName;
    private String mobileNumber;

    public SearchUserResponse(boolean success) {
        this.success = success;
    }

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public boolean isRegistered() {
		return registered;
	}

	public void setRegistered(boolean registered) {
		this.registered = registered;
	}

	public boolean isHasUpi() {
		return hasUpi;
	}

	public void setHasUpi(boolean hasUpi) {
		this.hasUpi = hasUpi;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUpiId() {
		return upiId;
	}

	public void setUpiId(String upiId) {
		this.upiId = upiId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
    
    
}
