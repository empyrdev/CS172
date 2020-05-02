package com.store.backend.DBConnections.Cart;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Cart")
public class Cart {
    
    private @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer id;

    private Integer accountId;
    private Integer itemId;
    private Integer quantity;

    public Cart(){

    }

    public Cart(Integer accountId, Integer itemId, Integer quantity){
        this.accountId = accountId;
        this.itemId = itemId;
        this.quantity = quantity;
    }


    public Integer getAccountId() {
        return this.accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getItemId() {
        return this.itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void incrementQuantity(){
        this.quantity++;
    }

    public void addQuantity(Integer quantity){
        this.quantity += quantity;
    }

    public void removeQuantity(Integer quantity){
        this.quantity -= quantity;
    }
}