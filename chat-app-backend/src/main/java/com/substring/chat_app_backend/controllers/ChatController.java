package com.substring.chat_app_backend.controllers;

import java.time.LocalDateTime;

import javax.management.RuntimeErrorException;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.substring.chat_app_backend.entities.Message;
import com.substring.chat_app_backend.entities.Room;
import com.substring.chat_app_backend.payload.MessageRequest;
import com.substring.chat_app_backend.repositories.RoomRepository;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {
    
     private RoomRepository roomRepository;

    public ChatController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // for sending and receiving messages

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(
        @DestinationVariable String roomId,
        @RequestBody MessageRequest request
    ){
        Room room = roomRepository.findByRoomId(request.getRoomId());
        Message msg = new Message();
        msg.setContent(request.getContent());
        msg.setSender(request.getSender());
        msg.setTimeStamp(LocalDateTime.now());

        if(room !=null){
            room.getMessage().add(msg);
            roomRepository.save(room);
        }else{
            throw new RuntimeErrorException(null, "Room not found");
        }

        return msg;
    }
     
}
