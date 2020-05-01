package com.store.backend.DBConnections.CardInfo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="CardInfo")
public class CardInfo {
    
    private @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer card_id;
    private String cardHolder;
    private String code;
    private String zip;
    private String number;


    public CardInfo(String cardHolder, String code, String zip, String number) {
        this.cardHolder = cardHolder;
        this.code = code;
        this.zip = zip;
        this.number = number;
    }

    public Integer getCardID(){
        return this.card_id;
    }
    
    public String getCardHolder() {
        return this.cardHolder;
    }

    public void setCardHolder(String cardHolder) {
        this.cardHolder = cardHolder;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getZip() {
        return this.zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getNumber() {
        return this.number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

}