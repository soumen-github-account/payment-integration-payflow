package in.payflow.payflowAPI.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import in.payflow.payflowAPI.entity.UserSession;

public interface UserSessionRepository extends MongoRepository<UserSession, String> {

	Optional<UserSession> findByMobileNumberAndActiveTrue(String mobileNumber);

    Optional<UserSession> findByToken(String token);
    void deleteByToken(String token);
}
