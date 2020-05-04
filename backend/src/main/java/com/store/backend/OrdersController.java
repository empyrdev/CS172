package com.store.backend;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Imports all DB Entities
import com.store.backend.DBConnections.Items.*;
import com.store.backend.DBConnections.Orders.*;
import com.store.backend.DBConnections.*;
import com.store.backend.DBConnections.Cart.Cart;
import com.store.backend.DBConnections.Cart.CartRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class OrdersController {
    @Autowired
    private ItemsRepo itemRepo;

    @Autowired
    private OrdersRepo orderRepo;

    @Autowired
    private ContainsRepo containRepo;

    @Autowired
    private MakeRepo makeRepo;

    @Autowired
    private CartRepo cartRepo;

    @GetMapping("/orders")
    public List<ItemAndOrder> getOrder(
    @RequestParam(required = false) Integer id,
    @RequestParam(required = false) Integer orderID){
        
        List<ItemAndOrder> result = new ArrayList<>();

        if(orderID == null && id != null){
            List<Make> make = makeRepo.findAllByAccountId(id);

            for(Make i : make){
                List<Contains> contains = containRepo.findAllByOrderId(i.getOrderId());

                for(Contains x : contains){
                    ItemAndOrder iao = new ItemAndOrder(itemRepo.findById(x.getItemId()).get(), orderRepo.findById(x.getOrderId()).get(), x);
                    result.add(iao);
                }
            }
        }

        if(orderID != null && id != null){
            List<Make> make = makeRepo.findAllByAccountIdAndOrderId(id, orderID);

            for(Make i : make){
                List<Contains> contains = containRepo.findAllByOrderId(i.getOrderId());

                for(Contains x : contains){
                    ItemAndOrder iao = new ItemAndOrder(itemRepo.findById(x.getItemId()).get(), orderRepo.findById(x.getOrderId()).get(), x);
                    result.add(iao);
                }
            }
        }

        return result;

    }

    @GetMapping("/orders/amount")
    public Map<String, Integer> getCount(@RequestParam Integer accountID){
        Map<String, Integer> map = new HashMap<>();

        List<Make> make = makeRepo.findAllByAccountId(accountID);

        map.put("count", make.size());

        return map;
    }

    // /orders/add?items=1,2&items=3,4
    @GetMapping("/orders/add")
    public Map<String, String> addItem(
    @RequestParam List<List<Integer>> items,
    @RequestParam Integer accountID){

        Double totalPrice = 0.0;
        Orders order = new Orders();
        orderRepo.save(order);
        

        if(items.get(items.size()-1).get(0) == 0 && items.get(items.size()-1).get(1) == 0){
            items = items.subList(0, items.size()-1);
        } 

        for(int i = 0; i < items.size(); i++){
            Integer itemId = items.get(i).get(0);
            Integer quantity = items.get(i).get(1);
            Items item = itemRepo.findById(itemId).get();

            Contains contains = new Contains(item, order, quantity);

            totalPrice += item.getPrice() * quantity;
            
            item.addPurchased(quantity);
            itemRepo.save(item);

            containRepo.save(contains);
        }

        order.setPrice(totalPrice);
        orderRepo.save(order);

        Make make = new Make(accountID, order.getOrderId());
        makeRepo.save(make);

        Iterable<Cart> cart = cartRepo.findAllByAccountId(accountID);
        for(Cart i : cart){
            cartRepo.delete(i);
        }

        Map<String, String> map = new HashMap<>();
        map.put("result", "Order created with id " + order.getOrderId() + " associated with account " + accountID);

        return map;
    }

}