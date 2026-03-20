package in.payflow.payflowAPI.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import in.payflow.payflowAPI.entity.Transaction;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {

}
