package com.store.backend.DBConnections.ItemCategories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ItemCatRepo extends CrudRepository<ItemCat, Integer>{

    Iterable<ItemCat> findAllByCategoryNameContaining(String categoryName);
    List<ItemCat> findAll();
    Iterable<ItemCat> findAllByCategoryId(Integer categoryId);
    
}