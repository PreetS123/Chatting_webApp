package com.substring.chat_app_backend.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "rooms")
@Getter
@Setter
@NoArgsConstructor
// @AllArgsConstructor     
public class Room {
    
    @Id
    private String id; // mongodb unique identifier
    private String roomId;
    private List<Message> message = new ArrayList<>();
}
