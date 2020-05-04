package com.store.backend.DBConnections.Account;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Account")
public class Account {

  private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Integer accountId;
  private String email;
  private String password;
  private String name;
  private String cell;
  private String address;
  private String sessionId;

  public Account(){

  }

  public Account(String email, String password, String name, String cell, String address) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.cell = cell;
    this.address = address;
  }

  public String getSessionId(){
    return this.sessionId;
  }

  public void setSessionId(String sessionId){
    this.sessionId = sessionId;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCell() {
    return this.cell;
  }

  public void setCell(String cell) {
    this.cell = cell;
  }

  public String getAddress() {
    return this.address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public Integer getAccountId() {
    return this.accountId;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}