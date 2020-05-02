package com.store.backend.DBConnections;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.store.backend.DBConnections.Account.*;
import com.store.backend.DBConnections.Orders.*;

@Entity
public class Make implements Serializable {
    
    private @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer id;

    private Integer accountId;
    private Integer orderId;

    public Make(Account account, Orders order){
        this.accountId = account.getAccountId();
        this.orderId = order.getOrderId();
    }

    public Make(Integer accountId, Integer orderId){
        this.accountId = accountId;
        this.orderId = orderId;
    }

    public Integer getAccountId() {
        return this.accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getOrderId() {
        return this.orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

}