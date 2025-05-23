import React, {useState} from 'react'
import {useChatStore} from "../store/useChatStore.js";
import Modal from "./Modal.jsx";
import ChatForm from "./ChatForm.jsx";

const Sidebar = () => {
    const {isChatLoading, chats,setSelectedChat, selectedChat}=useChatStore()
    const [isOpen, setIsOpen] = useState(false);

    const onClose=()=>{setIsOpen(false)}

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} children={<ChatForm onClose={onClose}/>}/>
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-header-top">
                        <div className="profile-info">
                            <div className="profile-avatar">
                                <img src="/user-avatar.png" alt="avatar"/>
                                <div className="profile-avatar-status">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>
                                </div>
                            </div>
                        </div>
                        <p >
                            <button className="login-button">Log in</button>
                        </p>
                    </div>
                    <div className="search-bar-container">
                        <div className="search-input-wrapper">
                            <input type="text" placeholder="Search or start new chat" className="search-input"/>
                            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                        </div>
                    </div>
                </div>

                <div className="chats-heading">
                    <h3>Chats</h3>
                    <button onClick={()=>{setIsOpen(true)}} className="chats-heading-btn">
                        + Chat
                    </button>
                </div>
                {isChatLoading ? ( <div className="loader-container"><div className="loader"></div></div>):
                    (
                        <div className="chat-list">
                            {chats?.map(chat=>(
                                <div key={chat._id}
                                     onClick={()=>setSelectedChat(chat)}
                                     className={`chat-item ${chat._id===selectedChat._id ? "active" : ""}`}>
                                    <div className="chat-item-avatar avatar-green">
                                        {chat.firstName.charAt(0).toUpperCase()}
                                        <p className="chat-item-avatar-status">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>
                                        </p>
                                    </div>
                                    <div className="chat-item-content">
                                        <div className="chat-item-header">
                                            <span className="chat-item-name">{chat.firstName} {chat.lastName}</span>
                                            <span className="chat-item-date">{chat.messages?.length ? new Date(chat.messages.at(-1).createdAt).toLocaleDateString("en-US", {year: "numeric",month: "long",day: "numeric"}) : new Date(chat.createdAt).toLocaleDateString("en-US", {year: "numeric",month: "long",day: "numeric"})}
</span>
                                        </div>
                                        <p className="chat-item-message">{chat.messages?.length ? chat.messages.at(-1).text : "No messages yet"}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

            </aside>
        </>
    )
}
export default Sidebar
