package com.substring.chat_app_backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.substring.chat_app_backend.entities.Room;

public interface RoomRepository extends MongoRepository<Room, String> {
    
    Room findByRoomId(String roomId);
}
