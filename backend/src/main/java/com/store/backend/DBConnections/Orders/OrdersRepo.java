package com.store.backend.DBConnections.Orders;

import com.store.backend.DBConnections.Orders.Orders;
import org.springframework.data.repository.CrudRepository;

public interface OrdersRepo extends CrudRepository<Orders, Integer>{
    
}