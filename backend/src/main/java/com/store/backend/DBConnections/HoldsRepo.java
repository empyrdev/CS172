package com.store.backend.DBConnections;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface HoldsRepo extends CrudRepository<Holds, Integer>{

    Iterable<Holds> findAllByAccountId(Integer accountId);
    Optional<Holds> findByAccountIdAndCardId(Integer accountId, Integer CardId);
    
}