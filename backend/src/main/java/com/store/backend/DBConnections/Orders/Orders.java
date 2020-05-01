package com.store.backend.DBConnections.Orders;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Orders")
public class Orders {

    private @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer order_id;
    private Double price;
    private Integer item_id;
    private Integer member_id;


    public Orders(Double price, Integer item_id, Integer member_id) {
        this.price = price;
        this.item_id = item_id;
        this.member_id = member_id;
    }
    
    public Integer getOrderId(){
        return this.order_id;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getItemId() {
        return this.item_id;
    }

    public void setItemId(Integer item_id) {
        this.item_id = item_id;
    }

    public Integer getMemberId() {
        return this.member_id;
    }

    public void setMemberId(Integer member_id) {
        this.member_id = member_id;
    }
    
}