package in.payflow.payflowAPI.entity;

public class UpiApp {
    private String app;
    private String upiId;
    private String linkedAccountId;
    private boolean active;
    private String qrPayload;
	public String getApp() {
		return app;
	}
	public void setApp(String app) {
		this.app = app;
	}
	public String getUpiId() {
		return upiId;
	}
	public void setUpiId(String upiId) {
		this.upiId = upiId;
	}
	public String getLinkedAccountId() {
		return linkedAccountId;
	}
	public void setLinkedAccountId(String linkedAccountId) {
		this.linkedAccountId = linkedAccountId;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public String getQrPayload() {
		return qrPayload;
	}
	public void setQrPayload(String qrPayload) {
		this.qrPayload = qrPayload;
	}
    
    
}
