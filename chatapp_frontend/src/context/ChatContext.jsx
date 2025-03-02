import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({children})=>{
const [roomInfo,setRoomInfo] = useState("");
const [currentUser, setCurrentUser] = useState('');
const [connected, setConnected] = useState(false);

    return (
        <ChatContext.Provider value={{roomInfo,setRoomInfo,currentUser,setCurrentUser,connected, setConnected}}>
            {children}
        </ChatContext.Provider>
    )
}

 const useChatContext = ()=>useContext(ChatContext);
 export default useChatContext;