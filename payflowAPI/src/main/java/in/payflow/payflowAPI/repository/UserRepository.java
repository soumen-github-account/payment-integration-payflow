package in.payflow.payflowAPI.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import in.payflow.payflowAPI.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
	Optional<User> findByMobileNumber(String mobileNumber);
}
