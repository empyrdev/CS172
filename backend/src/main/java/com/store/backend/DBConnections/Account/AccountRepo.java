package com.store.backend.DBConnections.Account;

import org.springframework.data.repository.CrudRepository;
import com.store.backend.DBConnections.Account.Account;

public interface AccountRepo extends CrudRepository<Account, Integer>{
    
}