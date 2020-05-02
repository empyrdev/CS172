package com.store.backend.DBConnections;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ContainsRepo extends CrudRepository<Contains, Integer>{

    List<Contains> findAllByOrderId(Integer orderId);
    
}