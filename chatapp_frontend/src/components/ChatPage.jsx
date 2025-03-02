import React, { useEffect, useRef, useState } from 'react';
import { MdAttachFile, MdSend } from 'react-icons/md';
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';
import SockJS from 'sockjs-client';
import { baseURL } from '../config/AxiosHelper';
import { Stomp } from '@stomp/stompjs';
import { getMessagesApi } from '../services/RoomServices';
import timeAgo from '../config/helperFunction';

// {
//     content: "Hello, How are you guy's",
//     sender: "preeti"
// },
// {
//     content: "fabulus",
//     sender: "Sohan"
// },
// {
//     content: "Hello, What's your name",
//     sender: "Monika"
// },
// {
//     content: "Hello, What's your name",
//     sender: "Vaishnavi"
// },
// {
//     content: "Hello, What's your name",
//     sender: "Kritika"
// },

export const ChatPage = () => {
    const { roomInfo, currentUser, connected, setConnected, setRoomInfo, setCurrentUser } = useChatContext();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState("");
    const inputRef = useRef(null);
    const chatBoxRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        if (!connected) {
            navigate('/')
        }
    }, [roomInfo, currentUser, connected, setConnected])

    // page init:
    // message ko load karne honge
    async function loadMessages() {
        try {
            if (roomInfo != "") {
                const response = await getMessagesApi(roomInfo);
                // console.log("resssss",response)
                setMessages(response);
            }
        } catch (error) {
            console.log("err:", error);
        }
    }
    useEffect(() => {
        if(connected){
        loadMessages();
        }
    }, [])

    // scroll down
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scroll({
                top: chatBoxRef.current.scrollHeight,
                behaviour: 'smooth'
            });
        }
    }, [messages])

    // stompClient ko init karne honge

    // stompClient ko subscribe karna hoga

    useEffect(() => {

        const connectWebSocket = () => {
            const sock = new SockJS(`${baseURL}/chat`);
            const client = Stomp.over(sock);
            client.connect({}, () => {
                setStompClient(client);
                toast.success("connected....");
                client.subscribe(`/topic/room/${roomInfo}`, (message) => {
                    console.log(message);
                    const newMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, newMessage]);
                })
            });
        };
        if (connected) {
            connectWebSocket();
        }
    }, [roomInfo])

    // send message handle
    const sendMessage = async () => {
        if (stompClient && connected && inputText.trim() !== "") {
            console.log("message", inputText);
            const message = {
                sender: currentUser,
                content: inputText,
                roomId: roomInfo
            }
            stompClient.send(`/app/sendMessage/${roomInfo}`, {}, JSON.stringify(message));
            setInputText("");
        }
    }

    const handleLogout = () => {
        stompClient.disconnect();
        setConnected(false);
        setRoomInfo("");
        setCurrentUser("");
        navigate('/');
    }

    return (
        <div className='min-h-screen'>
            <header className='dark:border-gray-700 dark:bg-gray-900 border py-3 flex justify-around items-center fixed w-full h-20'>
                {/** room information */}
                <div className='self-center'>
                    <h1 className='text-xl font-semibold'>Room: <span>{roomInfo}</span></h1>
                </div>
                {/* user information */}
                <div className='self-center'>
                    <h1 className='text-xl font-semibold text-center'>User: <span>{currentUser}</span></h1>
                </div>
                {/* leave room option */}
                <div className=''>
                    <button onClick={handleLogout} className='py-2 px-3 m-2 rounded-lg dark:bg-red-800 dark:hover:bg-red-500'>Leave Room</button>
                </div>
            </header>


            <main ref={chatBoxRef} className="py-20 px-8 border w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto">

                {
                    messages.length > 0 && messages?.map((message, index) => (
                        <div className={`flex ${message.sender == currentUser ? 'justify-end' : 'justify-start'}`} key={index}>
                            {console.log(message)}
                            <div className={`my-2 p-2 rounded  max-w-xs  ${message.sender == currentUser ? 'bg-green-700' : 'bg-gray-700'}`} >
                                <div className=' flex gap-4'>
                                    <img className='h-10 w-10' src={`https://avatar.iran.liara.run/public`} alt="img" />
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-sm font-bold'>{message.sender}</p>
                                        <p>{message.content}</p>
                                        <p className='text-xs dark:text-gray-700'>{timeAgo(message.timeStamp)}</p>
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
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Prevents newline in input
                                setTimeout(() => sendMessage(), 0); // Ensures state update before sending
                            }
                        }} // Trigger sendMessage on Enter key
                        type="text"
                        placeholder="Type your message here.."
                        className='w-full dark:border-gray-600 dark:bg-gray-800 px-5 py-2 rounded-full h-2/3 focus:ring-0 focus:outline-none'
                    />
                    <div className='flex gap-2'>
                        <button

                            className='dark:bg-purple-700 px-3 py-2 rounded-full h-10 w-10 flex justify-center items-center'>
                            <MdAttachFile size={20} className='' />
                        </button>
                        <button

                            onClick={sendMessage}
                            className='dark:bg-green-600 px-3 py-2 rounded-full h-10 w-10 flex justify-center items-center'>
                            <MdSend size={20} className='' />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    )
}
