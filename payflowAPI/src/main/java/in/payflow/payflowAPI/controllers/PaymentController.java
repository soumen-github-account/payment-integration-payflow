package in.payflow.payflowAPI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.payflow.payflowAPI.dto.BalanceCheckRequest;
import in.payflow.payflowAPI.dto.TransferRequest;
import in.payflow.payflowAPI.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;
	
	@PostMapping("/transfer")
	public ResponseEntity<?>  transfer(@RequestBody TransferRequest request){
		String response = paymentService.transferMoney(request);
        return ResponseEntity.ok(response);
	}
	
	@PostMapping("/balance")
	public ResponseEntity<?> getBalance(@RequestBody BalanceCheckRequest request) {
	    try {
	        Double balance = paymentService.checkBalance(request);
	        return ResponseEntity.ok(balance);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}
}
