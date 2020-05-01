package com.store.backend.DBConnections;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import com.store.backend.DBConnections.ItemCategories.ItemCat;
import com.store.backend.DBConnections.Items.*;

@Entity
@IdClass(Belongs.class)
public class Belongs implements Serializable{
    
    private @Id Integer category_id;
    private @Id Integer item_id;

    public Belongs(ItemCat cat, Items item){
        this.category_id = cat.getCategoryId();
        this.item_id = item.getItemId();
    }

    public Integer getCategory_id() {
        return this.category_id;
    }

    public void setCategory_id(Integer category_id) {
        this.category_id = category_id;
    }

    public Integer getItem_id() {
        return this.item_id;
    }

    public void setItem_id(Integer item_id) {
        this.item_id = item_id;
    }

}