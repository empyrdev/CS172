package com.store.backend.DBConnections;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import com.store.backend.DBConnections.CardInfo.*;
import com.store.backend.DBConnections.Account.*;

@Entity
@IdClass(Holds.class)
public class Holds implements Serializable{
    
    private @Id Integer card_id;
    private @Id Integer account_id;

    public Holds(CardInfo card, Account account){
        this.card_id = card.getCardID();
        this.account_id = account.getAccountId();
    }

    public Integer getAccountId() {
        return this.account_id;
    }

    public void setAccountId(Integer account_id) {
        this.account_id = account_id;
    }

    public Integer getCardId() {
        return this.card_id;
    }

    public void setCardId(Integer card_id) {
        this.card_id = card_id;
    }

}