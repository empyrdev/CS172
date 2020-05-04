package com.store.backend.DBConnections;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.store.backend.DBConnections.Items.*;
import com.store.backend.DBConnections.Orders.*;

@Entity
public class Contains implements Serializable {
    
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;

    private Integer itemId;
    private Integer orderId;
    private Integer quantity;

    public Contains(){

    }

    public Contains(Items item, Orders order, Integer quantity){
        this.itemId = item.getItemId();
        this.orderId = order.getOrderId();
        this.quantity = quantity;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getItemId() {
        return this.itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getOrderId() {
        return this.orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

}