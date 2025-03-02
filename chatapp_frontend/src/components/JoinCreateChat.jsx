import React from 'react'
import { AiOutlineWechat } from "react-icons/ai";


export const JoinCreateChat = () => {
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
            type="text"
            id="name"
            className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className=''>
          <label htmlFor="roomID" className='block font-medium mb-2'>
            Room ID / New Room Id
          </label>
          <input
            type="text"
            id="roomId"
            className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='flex justify-between align-center mt-2'>
          <button className='px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-lg'>Join Room</button>
          <button className='px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-lg'>Create Room</button>
        </div>
      </div>
    </div>
  )
}
