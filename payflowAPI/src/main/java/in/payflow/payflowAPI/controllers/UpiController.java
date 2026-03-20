package in.payflow.payflowAPI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.payflow.payflowAPI.dto.ApiResponse;
import in.payflow.payflowAPI.dto.CreateUpiPinRequest;
import in.payflow.payflowAPI.dto.SearchAccountRequest;
import in.payflow.payflowAPI.dto.SearchAccountResponse;
import in.payflow.payflowAPI.dto.SearchUserRequest;
import in.payflow.payflowAPI.dto.SearchUserResponse;
import in.payflow.payflowAPI.service.PinService;
import in.payflow.payflowAPI.service.UpiService;


@RestController
@RequestMapping("/api/upi")
public class UpiController {

    @Autowired
    private UpiService upiService;

    @Autowired
    private PinService pinService;

    // STEP 1: Create UPI Profile
    @PostMapping("/create-profile")
    public ResponseEntity<ApiResponse> createUpi(@RequestParam String mobile) {

        upiService.createUpiProfile(mobile);
        return ResponseEntity.ok(
                new ApiResponse(true, "UPI profile created")
        );
    }

    // STEP 2: Create UPI PIN
    @PostMapping("/create-pin")
    public ResponseEntity<ApiResponse> createPin(
            @RequestBody CreateUpiPinRequest request) {

        pinService.createUpiPin(
                request.getMobileNumber(),
                request.getUpiPin()
        );

        ApiResponse response = pinService.createUpiPin(
                request.getMobileNumber(),
                request.getUpiPin()
        );

        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/search-by-mobile")
    public ResponseEntity<SearchUserResponse> searchUser(
            @RequestBody SearchUserRequest request) {

        SearchUserResponse response =
                upiService.searchUserByMobile(request.getMobileNumber());

        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/pay-to-bank")
    public ResponseEntity<SearchAccountResponse> searchAccount(@RequestBody SearchAccountRequest request){
    	SearchAccountResponse response = upiService.seachUserByAccount(request.getAccountNo(), request.getIfscCode());
    	
    	return ResponseEntity.ok(response);
    }

}
