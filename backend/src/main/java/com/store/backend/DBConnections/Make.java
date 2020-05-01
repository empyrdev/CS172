package com.store.backend.DBConnections;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import com.store.backend.DBConnections.Account.*;
import com.store.backend.DBConnections.Orders.*;

@Entity
@IdClass(Make.class)
public class Make implements Serializable {
    
    private @Id Integer account_id;
    private @Id Integer order_id;

    public Make(Account account, Orders order){
        this.account_id = account.getAccountId();
        this.order_id = order.getOrderId();
    }

    public Integer getAccount_id() {
        return this.account_id;
    }

    public void setAccount_id(Integer account_id) {
        this.account_id = account_id;
    }

    public Integer getOrder_id() {
        return this.order_id;
    }

    public void setOrder_id(Integer order_id) {
        this.order_id = order_id;
    }

}