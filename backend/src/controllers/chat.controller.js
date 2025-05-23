import cloudinary from "../lib/cloudinary.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const getChats = async (req, res) => {
    try {
        const chats = await Chat.find().populate("messages");

        res.status(200).json(chats);
    } catch (err) {
        console.error("Error in get chats:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getChatById=async (req,res)=>{
    try{
        const {id:chatId} = req.params;
        const chat=await Chat.findById(chatId).populate("messages");

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }


        res.status(200).json(chat);
    }
    catch(err){
        console.error("Error in get chat by id:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createChat = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;

        if (!firstName || !lastName) {
            return res.status(400).json({ message: "Both first name and last name are required" });
        }

        const newChat = new Chat({ firstName, lastName });
        await newChat.save();

        res.status(201).json(newChat);
    } catch (err) {
        console.error("Error in create chat:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateChat=async (req,res)=>{
    try{
        const {id:chatId} = req.params;
        const {firstName, lastName, chatPicture} = req.body;
        let uploadResponse='';

        if(!firstName || !lastName){
            return res.status(400).json({message:'First Name and Last Name are required'});
        }

        if(chatPicture){
           uploadResponse= await cloudinary.uploader.upload(chatPicture);
        }

        const updatedChat = await Chat.findByIdAndUpdate(chatId,{
            firstName,
            lastName,
            chatPicture:uploadResponse.secure_url,
        },
            {new:true}
        );

        if (!updatedChat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        res.status(200).json(updatedChat);
    }
    catch(err){
        console.log("Error in update chat:",err);
        res.status(500).json({message:'Internal Server Error'});
    }
}

export const deleteChat = async (req, res) => {
    try {
        const { id:chatId } = req.params;

        const deletedChat = await Chat.findByIdAndDelete(chatId);

        if (!deletedChat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        await Message.deleteMany({ chatId });

        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (err) {
        console.error("Error in deleteChat:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};