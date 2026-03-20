package in.payflow.payflowAPI.dto;

public class CreateUpiPinRequest {
	private String mobileNumber;
    private String upiPin;
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
    
    
}
