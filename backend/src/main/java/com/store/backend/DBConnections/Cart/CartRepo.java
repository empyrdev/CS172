package com.store.backend.DBConnections.Cart;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface CartRepo extends CrudRepository<Cart, Integer>{
    
    Iterable<Cart> findAllByAccountId(Integer accountId);
    Optional<Cart> findByAccountIdAndItemId(Integer accountId, Integer itemId);
}