package com.substring.chat_app_backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.substring.chat_app_backend.entities.Message;
import com.substring.chat_app_backend.entities.Room;
import com.substring.chat_app_backend.repositories.RoomRepository;

@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {

    private RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // create room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId) {

        if (roomRepository.findByRoomId(roomId) != null) {
            // room already exist here
            return ResponseEntity.badRequest().body("Room already exist!");
        }

        // create a new room
        Room room = new Room();
        room.setRoomId(roomId);
        Room savedRoom = roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
    }

    // get room
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId) {

        Room room = roomRepository.findByRoomId(roomId);
        if (room == null) {
            return ResponseEntity.badRequest().body("Room not found");
        }

        return ResponseEntity.ok(room);
    }

    // get messages of room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable String roomId,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "20", required = false) int size) {

        Room room = roomRepository.findByRoomId(roomId);
        if (room == null) {
            return ResponseEntity.badRequest().build();
        }
        List<Message> message = room.getMessage();

        // pagination
        int start = Math.max(0, message.size() - (page + 1) * size);
        int end = Math.min(message.size(), start + size);
        List<Message> paginatedMessages = message.subList(start, end);
        return ResponseEntity.ok(paginatedMessages);
    }

}
