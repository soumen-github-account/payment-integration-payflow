package in.payflow.payflowAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.payflow.payflowAPI.entity.User;
import in.payflow.payflowAPI.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public User getByMobile(String mobile) {
		return userRepository.findByMobileNumber(mobile).
				orElseThrow(() -> new RuntimeException("User not found"));
	}
}
