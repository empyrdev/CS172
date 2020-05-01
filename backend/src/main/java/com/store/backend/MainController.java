package com.store.backend;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @Autowired
    private AccountRepo accountRepo;

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