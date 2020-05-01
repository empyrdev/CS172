package com.store.backend.DBConnections.Account;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Account")
public class Account {

  private @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer account_id;
  private String email;
  private String password;

  public Account(String email, String password) {
    this.email = email;
    this.password = password;
  }

  public Integer getAccountId() {
    return this.account_id;
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