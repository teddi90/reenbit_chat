import React, {useEffect, useRef, useState} from 'react'
import { useChatStore } from '../store/useChatStore';
import axios from "axios";


const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file.type.startsWith("image/")) {
            console.log("Please select an image file");
            return;
        };

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };
    const sendQuote = async () => {
        try {
            const res = await axios.get("https://api.api-ninjas.com/v1/quotes", {
                headers: { "X-Api-Key": import.meta.env.VITE_QUOTE_API_KEY }
            });

            return res.data[0]?.quote || "No quote available";
        } catch (error) {
            console.error("Error fetching quote:", error.response?.status, error.response?.data || error.message);
        }
    };



    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            },"user");

            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            setTimeout(async () =>{
                const quote=await sendQuote()
                if (quote) {
                    await sendMessage({ text: quote},  "bot" );
                }
            }, 3000);
        } catch (error) {
            console.log("Failed to send message:", error);

        }
    }

    return (
        <div>
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                            type="button"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="message-input-area">
                    <input type="text"
                           placeholder="Type your message"
                           className="message-input"
                           value={text}
                           onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <div className="message-input-buttons">
                        <button onClick={() => fileInputRef.current?.click()}
                                type="button"
                                className="message-input-btn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                        </button>

                        <button type="submit"
                                disabled={!text.trim() && !imagePreview}
                                className="message-input-btn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MessageInput

