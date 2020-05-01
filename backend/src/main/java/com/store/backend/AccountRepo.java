package com.store.backend;

import org.springframework.data.repository.CrudRepository;
import com.store.backend.Account;

public interface AccountRepo extends CrudRepository<Account, Integer>{
    
}