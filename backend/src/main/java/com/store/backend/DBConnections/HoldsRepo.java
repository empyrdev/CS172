package com.store.backend.DBConnections;

import org.springframework.data.repository.CrudRepository;

public interface HoldsRepo extends CrudRepository<Holds, Integer> {
    
}