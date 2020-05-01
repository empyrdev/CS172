package com.store.backend.DBConnections.Items;

import org.springframework.data.repository.CrudRepository;

public interface ItemsRepo extends CrudRepository<Items, Integer>{
    
}