package in.payflow.payflowAPI.dto;

public class BalanceResponse {
    private String bankName;
    private Double balance;

    public BalanceResponse(String bankName, Double balance) {
        this.bankName = bankName;
        this.balance = balance;
    }

    public String getBankName() {
        return bankName;
    }

    public Double getBalance() {
        return balance;
    }
}
