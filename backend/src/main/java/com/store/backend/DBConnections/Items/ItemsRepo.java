package com.store.backend.DBConnections.Items;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ItemsRepo extends CrudRepository<Items, Integer>{

    Iterable<Items> findByNameContaining(String name);
    List<Items> findAll();
    
}