package in.payflow.payflowAPI.state;


public enum UpiState{
    CREATE_UPI,   // No UPI ID exists
    SET_PIN,      // UPI exists but PIN not set
    READY         // UPI ID + PIN both present
}
