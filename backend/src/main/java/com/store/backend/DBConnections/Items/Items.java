package com.store.backend.DBConnections.Items;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Items")
public class Items {
    
    private @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer item_id;
    private Double price;
    private String name;

    public Items(Double price, String name) {
        this.price = price;
        this.name = name;
    }

    public Integer getItemId() {
        return this.item_id;
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

    
}