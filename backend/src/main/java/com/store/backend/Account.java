package com.store.backend;

// import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

// @Data //Supposedly generates getters and setters, have not tested yet. 
@Entity
class Account {

  private @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer memberID;
  private String name;
  private String cell;
  private String address;

  Account() {}

  Account(String name, String address, String cell) {
    this.name = name;
    this.cell = cell;
    this.address = address;
  }

  Account(String name, String address) {
    this.name = name;
    this.address = address;
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

}