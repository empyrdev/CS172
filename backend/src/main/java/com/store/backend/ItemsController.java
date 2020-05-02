package com.store.backend;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Imports all DB Entities
import com.store.backend.DBConnections.ItemCategories.*;
import com.store.backend.DBConnections.Items.*;
import com.store.backend.DBConnections.*;

@RestController
public class ItemsController {

    @Autowired
    private ItemCatRepo itemCatRepo;

    @Autowired
    private ItemsRepo itemRepo;

    @Autowired
    private BelongsRepo belongRepo;
    
    @GetMapping("/item/categories")
    public Iterable<ItemCat> getAllCategories(){
        return itemCatRepo.findAll();
    }

    @GetMapping("/category/add")
    public ItemCat addCategory(
    @RequestParam String categoryName){
        ItemCat itemCat = new ItemCat(categoryName);
        itemCatRepo.save(itemCat);

        return itemCat;
    }

    @GetMapping("/category")
    public List<Integer> getCategoriesLike(
    @RequestParam String categoryName){
        Iterable<ItemCat> categories = itemCatRepo.findByCategoryNameContaining(categoryName);
        List<Integer> catId = new ArrayList<>();

        for(ItemCat cat : categories){
            catId.add(cat.getCategoryId());
        }

        return catId;
    }

    @GetMapping("/item/search")
    public List<Integer> getItemSearch(
    @RequestParam String itemName){
        Iterable<Items> items = itemRepo.findByNameContaining(itemName);
        List<Integer> itemId = new ArrayList<>();

        for(Items item : items){
            itemId.add(item.getItemId());
        }

        return itemId;
    }

    @GetMapping("/i")
    public Items getItem(@RequestParam Integer itemID){
        return itemRepo.findById(itemID).get();
    }

    @GetMapping("/item")
    public List<ItemAndCat> getItems(
    @RequestParam(required = false) Integer itemID,
    @RequestParam(required = false) Integer categoryID){

        List<ItemAndCat> result = new ArrayList<>();

        if(itemID == null && categoryID == null){
            List<Belongs> belong = belongRepo.findAll();

            for(Belongs i : belong){
                Items item = itemRepo.findById(i.getItemId()).get();
                ItemCat category = itemCatRepo.findById(i.getCategoryId()).get();

                ItemAndCat e = new ItemAndCat(item, category);
                result.add(e);
            }
        }

        if(itemID == null && categoryID != null){
            Iterable<Belongs> belong = belongRepo.findAllByCategoryId(categoryID);
            
            for(Belongs i : belong){
                Items item = itemRepo.findById(i.getItemId()).get();
                ItemCat category = itemCatRepo.findById(i.getCategoryId()).get();

                ItemAndCat e = new ItemAndCat(item, category);
                result.add(e);
            }
        }

        if(itemID != null && categoryID != null){
            Iterable<Belongs> belong = belongRepo.findAllByCategoryIdAndItemId(categoryID, itemID);

            for(Belongs i : belong){
                Items item = itemRepo.findById(i.getItemId()).get();
                ItemCat category = itemCatRepo.findById(i.getCategoryId()).get();

                ItemAndCat e = new ItemAndCat(item, category);
                result.add(e);
            }
        }

        return result;
    }

    @GetMapping("/item/add")
    public Map<String,String> addItem(
    @RequestParam String name,
    @RequestParam Double price,
    @RequestParam String description,
    @RequestParam String image,
    @RequestParam Integer categoryID){

        ItemCat category = itemCatRepo.findById(categoryID).get();
        Items item = new Items(price, name, description, image);
        Belongs belong = new Belongs(category, item);

        itemRepo.save(item);
        belongRepo.save(belong);

        Map<String,String> map = new HashMap<>();
        map.put("result", "success");
        return map;
    }

    @GetMapping("/item/remove")
    public Map<String, String> removeItem(
    @RequestParam Integer itemID){

        Items item = itemRepo.findById(itemID).get();
        Belongs belong = belongRepo.findByItemId(itemID);

        itemRepo.delete(item);
        belongRepo.delete(belong);

        Map<String,String> map = new HashMap<>();
        map.put("result", "successfully removed " + itemID + " from the database");
        return map;
    }
}