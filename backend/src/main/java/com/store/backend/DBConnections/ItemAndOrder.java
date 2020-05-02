package com.store.backend.DBConnections;

import com.store.backend.DBConnections.Items.Items;
import com.store.backend.DBConnections.Orders.Orders;

public class ItemAndOrder {
    
    private Integer orderID;
    private Double price;
    private Integer itemID;
    private Integer quantity;
    private String itemName;
    private double itemPrice;
    private String image;
    private String description;

    public ItemAndOrder(Items item, Orders order, Contains contains){
        this.orderID = order.getOrderId();
        this.price = order.getPrice();
        this.itemID = item.getItemId();
        this.quantity = contains.getQuantity();
        this.itemName = item.getName();
        this.itemPrice = item.getPrice();
        this.image = item.getImage();
        this.description = item.getDescription();
    }

    public Integer getOrderID() {
        return this.orderID;
    }

    public void setOrderID(Integer orderID) {
        this.orderID = orderID;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getItemID() {
        return this.itemID;
    }

    public void setItemID(Integer itemID) {
        this.itemID = itemID;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getItemName() {
        return this.itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public double getItemPrice() {
        return this.itemPrice;
    }

    public void setItemPrice(double itemPrice) {
        this.itemPrice = itemPrice;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}