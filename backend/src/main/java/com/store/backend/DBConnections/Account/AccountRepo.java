package com.store.backend.DBConnections.Account;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

import com.store.backend.DBConnections.Account.Account;

public interface AccountRepo extends CrudRepository<Account, Integer>{
    
    Account findByEmailAndPassword(String email, String password);
    Account findBySessionId(String sessionId);
    Optional<Account> findByEmail(String email);
}