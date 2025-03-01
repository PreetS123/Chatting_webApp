package com.substring.chat_app_backend.payload;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class MessageRequest {

     private String content;
     private String sender;
     private String roomId;
    //  private LocalDateTime messageTime;
}
