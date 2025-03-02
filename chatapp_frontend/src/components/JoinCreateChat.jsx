import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineWechat } from "react-icons/ai";
import { createRoomAPI, joinChatApi } from "../services/RoomServices"
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';


export const JoinCreateChat = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  })

  const { roomInfo, setRoomInfo, currentUser, setCurrentUser,setConnected } = useChatContext();

  function handleFormInputChange(event) {
    console.log("event", event.target.value)
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    })
  }

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Invalid input")
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      // join chat
      console.log("join room");
      try {
        const room = await joinChatApi(detail.roomId);
        if (room) {
          toast.success("joined....");
          console.log("join room", room);
          setCurrentUser(detail.userName);
          setRoomInfo(room.roomId);
          setConnected(true);
          navigate("/chat");

        }
      } catch (error) {
        console.log("Error: joinchat", error);
        if (error.status == 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Room not found");
        }
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      // create room
      // console.log("create room")
      try {
        const resp = await createRoomAPI(detail.roomId);
        console.log("room created", resp);
        if (resp) {
          setCurrentUser(detail.userName);
          setRoomInfo(resp.data.roomId);
          toast.success("Room created successfully");
          setConnected(true);
          joinChat();
        }
      } catch (error) {
        console.log("Error: ", error);
        if (error.status == 400) {
          toast.error("Room already exist")
        } else {
          toast.error("Error in creating ")
        }
      }
    }
  }


  return (
    <div className="min-h-screen flex  items-center justify-center">
      <div className="p-10 dark:border-gray-700 border w-full flex flex-col gap-8 max-w-md rounded dark:bg-gray-900 shadow">
        <div className='flex justify-center align-center p-0 m-0'>
          <AiOutlineWechat size={90} color="#ffb800" />
        </div>
        <h1 className='text-2xl font-semibold text-center'>Join Room / Create Room</h1>

        <div className=''>
          <label htmlFor="name" className='block font-medium mb-2'>
            Your name
          </label>
          <input
            onChange={(e) => handleFormInputChange(e)}
            value={detail.userName}
            name="userName"
            type="text"
            id="userName"
            placeholder='Enter the name'
            className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className=''>
          <label htmlFor="roomID" className='block font-medium mb-2'>
            Room ID / New Room Id
          </label>
          <input
            onChange={(e) => handleFormInputChange(e)}
            value={detail.roomId}
            name="roomId"
            type="text"
            id="roomId"
            placeholder='Enter room id'
            className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='flex justify-between align-center mt-2'>
          <button
            onClick={joinChat}
            className='px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-lg'>Join Room</button>
          <button
            onClick={createRoom}
            className='px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-lg'>Create Room</button>
        </div>
      </div>
    </div>
  )
}
