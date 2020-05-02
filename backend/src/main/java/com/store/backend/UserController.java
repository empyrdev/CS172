package com.store.backend;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Imports all DB Entities
import com.store.backend.DBConnections.Account.*;

@RestController
public class UserController {

    @Autowired
    private AccountRepo accountRepo;

    @GetMapping("/users")
    public Optional<Account> hello(@RequestParam(required = true) Integer id) {
        return accountRepo.findById(id);
    }

    @GetMapping("/users/test")
    public Iterable<Account> getAllAccounts() {
        return accountRepo.findAll();
    }

    @GetMapping("/users/othertest")
    public Account getAccountTest(@RequestParam Integer id){
        Optional<Account> getAccount = accountRepo.findById(id);
        Account account;

        try{
            account = getAccount.get();
        } catch(NoSuchElementException e){
            return new Account();
        }

        return account;
    }

    @GetMapping("/users/update")
    public Account updateAccount(
    @RequestParam String email, 
    @RequestParam String password,
    @RequestParam String name,
    @RequestParam String cell,
    @RequestParam String address,
    @RequestParam Integer accountid
    ){
        Optional<Account> getAccount = accountRepo.findById(accountid);
        Account account;

        try{
            account = getAccount.get();
        } catch (NoSuchElementException e){
            return null;
        }

        account.setEmail(email);
        account.setPassword(password);
        account.setName(name);
        account.setCell(cell);
        account.setAddress(address);

        accountRepo.save(account);

        return account;
    }

    @GetMapping("/users/add")
    public Optional<Account> addUser(
    @RequestParam String email, 
    @RequestParam String password,
    @RequestParam String name,
    @RequestParam String cell,
    @RequestParam String address
    ){
        
        Account newAccount = new Account(email, password, name, cell, address);

        accountRepo.save(newAccount);
        
        return accountRepo.findById(newAccount.getAccountId());
    }

    @GetMapping("/users/login")
    public Map<String, String> loginUser(
    @RequestParam String email,
    @RequestParam String password    
    ) throws UnsupportedEncodingException{
        try{
            Account account = accountRepo.findByEmailAndPassword(email, password);
            Map<String, String> map = new HashMap<String, String>();

            UUID session_id = generateUUID(account.getAccountId());
            account.setSessionId(session_id.toString());

            map.put("accountID", Integer.toString(account.getAccountId()));
            map.put("sessionID", session_id.toString());
            
            return map;
        } catch(Exception e){
            Map<String, String> map = new HashMap<>();

            return map;
        }
    }

    @GetMapping("/users/remove")
    public String removeUser(
    @RequestParam Integer id
    ){
        accountRepo.deleteById(id);

        return "Successfully deleted account " + Integer.toString(id);
    }
    
    public UUID generateUUID(Integer account_id) throws UnsupportedEncodingException{
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        String namespace = "85991d47-e742-45ea-83ff-b987d9f9c206" + Integer.toString(account_id) + timestamp.toString();
        byte[] bytes = namespace.getBytes("UTF-8");
        UUID uuid = UUID.nameUUIDFromBytes(bytes);
        
        return uuid;
    }
}