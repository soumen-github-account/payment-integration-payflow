package in.payflow.payflowAPI.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "transactions")
public class Transaction {
	@Id
	private String id;
	
	private String transactionId;
	private String idempotencyKey;
	
	private double amount;
	private String currency;
	private String status;
	
	private Party sender;
	private Party receiver;
	
	private Instant initiatedAt;
	private Instant completedAt;
	
	private String failureReason;
	private int riskScore;
	private String channel;
	private String app;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	public String getIdempotencyKey() {
		return idempotencyKey;
	}
	public void setIdempotencyKey(String idempotencyKey) {
		this.idempotencyKey = idempotencyKey;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Party getSender() {
		return sender;
	}
	public void setSender(Party sender) {
		this.sender = sender;
	}
	public Party getReceiver() {
		return receiver;
	}
	public void setReceiver(Party receiver) {
		this.receiver = receiver;
	}
	public Instant getInitiatedAt() {
		return initiatedAt;
	}
	public void setInitiatedAt(Instant initiatedAt) {
		this.initiatedAt = initiatedAt;
	}
	public Instant getCompletedAt() {
		return completedAt;
	}
	public void setCompletedAt(Instant completedAt) {
		this.completedAt = completedAt;
	}
	public String getFailureReason() {
		return failureReason;
	}
	public void setFailureReason(String failureReason) {
		this.failureReason = failureReason;
	}
	public int getRiskScore() {
		return riskScore;
	}
	public void setRiskScore(int riskScore) {
		this.riskScore = riskScore;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public String getApp() {
		return app;
	}
	public void setApp(String app) {
		this.app = app;
	}
	
	
}
