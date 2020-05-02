package com.store.backend.DBConnections;

import com.store.backend.DBConnections.ItemCategories.ItemCat;
import com.store.backend.DBConnections.Items.Items;

public class ItemAndCat {
    private String categoryName;
    private Integer categoryID;
    private Integer itemID;
    private String itemName;
    private Double price;
    private String description;
    private String image;

    public ItemAndCat(Items item, ItemCat category){
        this.categoryName = category.getCategoryName();
        this.categoryID = category.getCategoryId();
        this.itemID = item.getItemId();
        this.itemName = item.getName();
        this.price = item.getPrice();
        this.description = item.getDescription();
        this.image = item.getDescription();
    }

    public Integer getCategoryID() {
        return this.categoryID;
    }

    public void setCategoryID(Integer categoryID) {
        this.categoryID = categoryID;
    }

    public String getCategoryName() {
        return this.categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Integer getItemID() {
        return this.itemID;
    }

    public void setItemID(Integer itemID) {
        this.itemID = itemID;
    }

    public String getItemName() {
        return this.itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}