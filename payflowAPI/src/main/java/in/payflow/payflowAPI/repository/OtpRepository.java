package in.payflow.payflowAPI.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import in.payflow.payflowAPI.entity.Otp;

public interface OtpRepository extends MongoRepository<Otp, String> {
	 Optional<Otp> findTopByMobileNumberOrderByExpiresAtDesc(String mobileNumber);

	 void deleteByMobileNumber(String mobileNumber);
}
