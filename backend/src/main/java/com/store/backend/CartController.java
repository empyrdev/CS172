package com.store.backend;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Imports all DB Entities
import com.store.backend.DBConnections.Cart.*;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class CartController {

    @Autowired
    private CartRepo cartRepo;

    @GetMapping("/cart")
    public Iterable<Cart> getCart(
    @RequestParam Integer accountID){

        Iterable<Cart> cart = cartRepo.findAllByAccountId(accountID);

        return cart;
    }

    @GetMapping("/cart/add")
    public Map<String, String> addCart(
    @RequestParam Integer accountID,
    @RequestParam Integer itemID,
    @RequestParam Integer quantity){

        Map<String, String> newMap = new HashMap<>();

        try{
            Cart cart = cartRepo.findByAccountIdAndItemId(accountID, itemID).get();
            cart.addQuantity(quantity);

            cartRepo.save(cart);

            newMap.put("result", "incremented quantity");
            return newMap;
        }catch(NoSuchElementException e){
            Cart cart = new Cart(accountID, itemID, quantity);
            
            cartRepo.save(cart);

            newMap.put("result", "created cart item");
            return newMap;
        }
    }

    @GetMapping("/cart/remove")
    public Map<String, String> removeCart(
    @RequestParam Integer accountID,
    @RequestParam Integer itemID,
    @RequestParam Integer quantity){

        Map<String, String> newMap = new HashMap<>();

        Cart cart = cartRepo.findByAccountIdAndItemId(accountID, itemID).get();

        if(cart.getQuantity() == 1){
            cartRepo.delete(cart);
            newMap.put("result", "deleted item from cart");
            return newMap;
        } else{
            cart.removeQuantity(quantity);
            cartRepo.save(cart);

            newMap.put("result", "decremented quantity");
            return newMap;
        }
    }
}