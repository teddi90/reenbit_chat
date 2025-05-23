import Sidebar from "./components/Sidebar.jsx";
import Messages from "./components/Messages.jsx";
import {useChatStore} from "./store/useChatStore.js";
import {useEffect} from "react";

function App() {
    const {chats,getChats}=useChatStore()


    useEffect(() => {
      getChats();
        console.log(chats)
    },[])
  return (
      <div className="chat-container">
        <Sidebar/>
        <Messages/>
      </div>
  )
}

export default App
