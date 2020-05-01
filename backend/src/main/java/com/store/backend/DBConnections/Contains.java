package com.store.backend.DBConnections;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import com.store.backend.DBConnections.Items.*;
import com.store.backend.DBConnections.Orders.*;

@Entity
@IdClass(Contains.class)
public class Contains implements Serializable {
    
    private @Id Integer item_id;
    private @Id Integer order_id;

    public Contains(Items item, Orders order){
        this.item_id = item.getItemId();
        this.order_id = order.getOrderId();
    }

    public Integer getItem_id() {
        return this.item_id;
    }

    public void setItem_id(Integer item_id) {
        this.item_id = item_id;
    }

    public Integer getOrder_id() {
        return this.order_id;
    }

    public void setOrder_id(Integer order_id) {
        this.order_id = order_id;
    }

}