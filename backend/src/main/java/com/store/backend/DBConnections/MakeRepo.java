package com.store.backend.DBConnections;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface MakeRepo extends CrudRepository<Make, Integer>{
    
    List<Make> findAllByAccountId(Integer accountId);
    List<Make> findAllByAccountIdAndOrderId(Integer accountId, Integer orderId);
}