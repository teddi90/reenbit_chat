import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import Chat from "../models/chat.model.js";


export const getChatMessages = async (res,req)=>{
    try{
        const {id:chatId} = req.params;
        const chatMessages = await Message.find({_id:chatId});

        res.status(200).json(chatMessages);
    }catch(err){
        console.log("Error in getChatMessages: ", err.message);
        res.status(400).json({error:"Internal Server Error"});
    }
}

export const createChatMessage = async (req, res) => {
    try {
        const {id:chatId } = req.params;
        const { text, image, sender } = req.body;
        let uploadResponse = '';

        if (!chatId || !sender) {
            return res.status(400).json({ error: "Chat ID and sender are required" });
        }

        if (image) {
            uploadResponse = await cloudinary.uploader.upload(image);
        }

        const newMessage = new Message({
            chatId,
            sender,
            text,
            image:  uploadResponse.secure_url
        });

        await newMessage.save();
        await Chat.findByIdAndUpdate(chatId, { $push: { messages: newMessage._id } })
        res.status(201).json(newMessage);
    } catch (err) {
        console.error("Error in createChatMessage:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};