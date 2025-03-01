package com.substring.chat_app_backend.entities;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
// import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
// @NoArgsConstructor
public class Message {

     private String sender;
     private String content;
     private LocalDateTime timeStamp;

    public Message(String sender, String content) {
        this.sender = sender;
        this.content = content;
        this.timeStamp= LocalDateTime.now();
    }

    public Message() {
        //TODO Auto-generated constructor stub
    }
}
