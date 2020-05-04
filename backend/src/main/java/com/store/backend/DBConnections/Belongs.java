package com.store.backend.DBConnections;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.store.backend.DBConnections.ItemCategories.ItemCat;
import com.store.backend.DBConnections.Items.*;

@Entity
public class Belongs implements Serializable{
    
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;

    private Integer categoryId;
    private Integer itemId;

    public Belongs(){
        
    }

    public Belongs(ItemCat cat, Items item){
        this.categoryId = cat.getCategoryId();
        this.itemId = item.getItemId();
    }

    public Integer getCategoryId() {
        return this.categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getItemId() {
        return this.itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

}