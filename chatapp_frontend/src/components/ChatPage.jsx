import React, { useRef, useState } from 'react';
import { MdAttachFile, MdSend } from 'react-icons/md';

export const ChatPage = () => {
    const [messages, setMessages] = useState([
        {
        content: "Hello, How are you guy's",
        sender: "Preeti"
       },
       {
        content: "fabulus",
        sender: "Sohan"
       },
       {
        content: "Hello, What's your name",
        sender: "Monika"
       },
       {
        content: "Hello, What's your name",
        sender: "Vaishnavi"
       },
       {
        content: "Hello, What's your name",
        sender: "Kritika"
       },
])
    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const chatBoxRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);
    const [roomID, setRoomID] = useState("");
    const [currentUser] = useState("Preeti");
    return (
        <div className='min-h-screen'>
            <header className='dark:border-gray-700 dark:bg-gray-900 border py-3 flex justify-around items-center fixed w-full h-20'>
                {/** room information */}
                <div className='self-center'>
                    <h1 className='text-xl font-semibold'>Room: <span>Family room</span></h1>
                </div>
                {/* user information */}
                <div className='self-center'>
                    <h1 className='text-xl font-semibold text-center'>User: <span>Preeti Sharma</span></h1>
                </div>
                {/* leave room option */}
                <div className=''>
                    <button className='py-2 px-3 m-2 rounded-lg dark:bg-red-800 dark:hover:bg-red-500'>Leave Room</button>
                </div>
            </header>


            <main className="py-20 px-8 border w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto">

                {
                    messages?.map((message, index) => (
                        <div className={`flex ${message.sender == currentUser?'justify-start':'justify-end'}`} key={index}>
                            <div className={`my-2 p-2 rounded  max-w-xs  ${message.sender == currentUser?'bg-green-700':'bg-gray-700'}`} >
                                <div className=' flex gap-4'>
                                    <img className='h-10 w-10' src={`https://avatar.iran.liara.run/public`} alt="img" />
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-sm font-bold'>{message.sender}</p>
                                        <p>{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </main>

            {/* typing input */}
            <footer className='w-full fixed bottom-5  h-16'>
                <div className='h-full px-10 w-2/3 mx-auto flex justify-between items-center gap-2'>
                    <input
                        type="text"
                        placeholder="Type your message here.."
                        className='w-full dark:border-gray-600 dark:bg-gray-800 px-5 py-2 rounded-full h-2/3 focus:ring-0 focus:outline-none'
                    />
                    <div className='flex gap-2'>
                        <button className='dark:bg-purple-700 px-3 py-2 rounded-full h-10 w-10 flex justify-center items-center'>
                            <MdAttachFile size={20} className='' />
                        </button>
                        <button className='dark:bg-green-600 px-3 py-2 rounded-full h-10 w-10 flex justify-center items-center'>
                            <MdSend size={20} className='' />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    )
}
