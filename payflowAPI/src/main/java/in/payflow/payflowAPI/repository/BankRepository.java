package in.payflow.payflowAPI.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import in.payflow.payflowAPI.entity.Bank;

public interface BankRepository extends MongoRepository<Bank, String>{
	
}
