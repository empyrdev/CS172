package com.store.backend.DBConnections.Items;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Items")
public class Items {
    
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Integer itemId;
    private Double price;
    private String name;
    private String description;
    private String image;
    private Integer purchased;

    public Items(){
        
    }

    public Items(Double price, String name, String description, String image) {
        this.price = price;
        this.name = name;
        this.description = description;
        this.image = image;
        this.purchased = 0;
    }

    public Integer getPurchased() {
        return this.purchased;
    }

    public void addPurchased(Integer purchased){
        this.purchased += purchased;
    }

    public Integer getItemId(){
        return this.itemId;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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