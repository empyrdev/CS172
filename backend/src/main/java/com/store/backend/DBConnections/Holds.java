package com.store.backend.DBConnections;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import com.store.backend.DBConnections.CardInfo.*;
import com.store.backend.DBConnections.Account.*;

@Entity
public class Holds implements Serializable{
    
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;

    private Integer cardId;
    private Integer accountId;

    public Holds(){
        
    }

    public Holds(CardInfo card, Account account){
        this.cardId = card.getCardID();
        this.accountId = account.getAccountId();
    }

    public Integer getAccountId() {
        return this.accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getCardId() {
        return this.cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
    }

}