package com.store.backend.DBConnections;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface BelongsRepo extends CrudRepository<Belongs, Integer>{

    List<Belongs> findAll();
    Belongs findByItemId(Integer itemId);
    Iterable<Belongs> findAllByCategoryId(Integer categoryId);
    Iterable<Belongs> findAllByCategoryIdAndItemId(Integer categoryId, Integer itemId);

    
}