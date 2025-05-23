import React from 'react'
import {useChatStore} from "../store/useChatStore.js";
import MessageInput from "./MessageInput.jsx";

const Messages = () => {
    const {selectedChat}=useChatStore();

    return (
        <main className="chat-section">
            <div className="chat-header">
                <div className="chat-item-avatar avatar-pink">
                    {selectedChat?.firstName.charAt(0).toUpperCase()}
                    <p className="chat-item-avatar-status">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>
                    </p>
                </div>
                <span className="chat-header-name">{selectedChat?.firstName} {selectedChat?.lastName}</span>
            </div>

            <div className="chat-messages-container">
                {selectedChat?.messages?.map((message) => (
                    message.sender==="bot" ? (
                        <div key={message._id}
                            className="message-row received">
                            <div className="message-avatar avatar-pink">
                                {selectedChat?.firstName.charAt(0).toUpperCase()}
                            </div>
                            <div className="message-content-wrapper">
                                <div className="message-bubble">
                                    <p>{message.text}</p>
                                </div>
                                <span className="message-timestamp">
                                    {new Date(message.createdAt).toLocaleString("en-US", {
                                        month: "numeric",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true // Ensures AM/PM format
                                    })
                                    }
                                </span>
                            </div>
                        </div>
                    ):
                        (
                            <div key={message._id}
                                className="message-row sent">
                                <div className="message-content-wrapper">
                                    <div className="message-bubble">
                                        <p>{message.text}</p>
                                    </div>
                                    <span className="message-timestamp">
                                         {new Date(message.createdAt).toLocaleString("en-US", {
                                             month: "numeric",
                                             day: "numeric",
                                             year: "numeric",
                                             hour: "numeric",
                                             minute: "numeric",
                                             hour12: true // Ensures AM/PM format
                                         })
                                         }
                                    </span>
                                </div>
                            </div>
                        )
                ))}





            </div>
            <MessageInput/>
        </main>
    )
}
export default Messages
