package com.store.backend.DBConnections.Orders;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Orders")
public class Orders {

    private @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer id;
    private Integer orderId;
    private Double price;

    public Orders(){
        
    }

    public Orders(Double price) {
        this.price = price;
    }
    
    public Integer getOrderId(){
        return this.orderId;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
    
}