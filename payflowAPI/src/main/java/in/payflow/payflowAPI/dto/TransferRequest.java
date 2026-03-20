package in.payflow.payflowAPI.dto;

public class TransferRequest {
	private String senderMobile;
    private String receiverMobile; // for mobile transfer

    private String receiverAccountNumber; // for bank transfer
    private String receiverIfsc;

    private Double amount;
    private String pin;

    private String transferType; // MOBILE / BANK

	public String getSenderMobile() {
		return senderMobile;
	}

	public void setSenderMobile(String senderMobile) {
		this.senderMobile = senderMobile;
	}

	public String getReceiverMobile() {
		return receiverMobile;
	}

	public void setReceiverMobile(String receiverMobile) {
		this.receiverMobile = receiverMobile;
	}

	public String getReceiverAccountNumber() {
		return receiverAccountNumber;
	}

	public void setReceiverAccountNumber(String receiverAccountNumber) {
		this.receiverAccountNumber = receiverAccountNumber;
	}

	public String getReceiverIfsc() {
		return receiverIfsc;
	}

	public void setReceiverIfsc(String receiverIfsc) {
		this.receiverIfsc = receiverIfsc;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public String getTransferType() {
		return transferType;
	}

	public void setTransferType(String transferType) {
		this.transferType = transferType;
	}
    
    
}