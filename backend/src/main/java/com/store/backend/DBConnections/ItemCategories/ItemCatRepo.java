package com.store.backend.DBConnections.ItemCategories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ItemCatRepo extends CrudRepository<ItemCat, Integer>{

    Iterable<ItemCat> findByCategoryNameContaining(String categoryName);
    List<ItemCat> findAll();
    
}