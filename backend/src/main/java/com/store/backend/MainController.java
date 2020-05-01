package com.store.backend;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Imports all DB Entities
import com.store.backend.DBConnections.Account.*;
import com.store.backend.DBConnections.CardInfo.*;
import com.store.backend.DBConnections.ItemCategories.*;
import com.store.backend.DBConnections.Items.*;
import com.store.backend.DBConnections.Orders.*;
import com.store.backend.DBConnections.*;

@RestController
public class MainController {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private CardInfoRepo cardRepo;

    @Autowired
    private ItemCatRepo itemCatRepo;

    @Autowired
    private ItemsRepo itemRepo;

    @Autowired
    private OrdersRepo orderRepo;

    @Autowired
    private BelongsRepo belongRepo;

    @Autowired
    private ContainsRepo containRepo;

    @Autowired
    private HoldsRepo holdRepo;

    @Autowired
    private MakeRepo makeRepo;


    @GetMapping("/users")
    public Iterable<Account> getAllAccounts() {
        return accountRepo.findAll();
    }

    @GetMapping("/users/get")
    public Optional<Account> hello(@RequestParam(required = true) Integer id) {
        return accountRepo.findById(id);
    }

    @GetMapping("/users/add")
    public String addUser(@RequestParam(required = true) String name, 
    @RequestParam(required = true) String address){
        
        Account newAccount = new Account(name, address);

        accountRepo.save(newAccount);
        
        return "New account created";
    }
}