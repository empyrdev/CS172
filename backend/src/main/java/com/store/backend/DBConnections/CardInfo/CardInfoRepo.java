package com.store.backend.DBConnections.CardInfo;

import org.springframework.data.repository.CrudRepository;

public interface CardInfoRepo extends CrudRepository<CardInfo, Integer>{
    
    Iterable<CardInfo> findAllByCardId(Integer cardId);
}