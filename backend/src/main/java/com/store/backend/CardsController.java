package com.store.backend;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
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
public class CardsController {

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

    @GetMapping("/cards")
    public ArrayList<CardInfo> getCards(
    @RequestParam Integer id
    ){
        Iterable<Holds> allRel = holdRepo.findAllByAccountId(id);
        ArrayList<CardInfo> allCards = new ArrayList<>();

        for(Holds holds : allRel){
            allCards.add(cardRepo.findById(holds.getCardId()).get());
        }

        return allCards;
    }

    @GetMapping("cards/add")
    public CardInfo addCard(
    @RequestParam Integer id,
    @RequestParam String cardNumber,
    @RequestParam String cardHolder,
    @RequestParam String cvv,
    @RequestParam String zip,
    @RequestParam String expMonth,
    @RequestParam String expYear
    ){
        Optional<Account> getAccount = accountRepo.findById(id);
        Account account;

        try{
            account = getAccount.get();
        } catch (NoSuchElementException e){
            return null;
        }
        
        CardInfo newCard = new CardInfo(cardHolder, cvv, zip, cardNumber, expMonth, expYear);
        Holds newRel = new Holds(newCard, account);

        cardRepo.save(newCard);
        holdRepo.save(newRel);

        return newCard;
    }

    @GetMapping("/cards/remove")
    public Map<String, String> removeCard(
    @RequestParam Integer id,
    @RequestParam Integer cardId
    ){
        Map<String, String> newMap = new HashMap<>();
        try{
            Holds delHolds = holdRepo.findByAccountIdAndCardId(id, cardId).get();
            CardInfo delCard = cardRepo.findById(cardId).get();

            holdRepo.delete(delHolds);
            cardRepo.delete(delCard);

            newMap.put("result", "success");
            return newMap;
        } catch (NoSuchElementException e){
            newMap.put("result", "failure");
            return newMap;
        }
    }
}