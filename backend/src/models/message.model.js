import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true
        },
        sender:{
            type:String,
            enum:["user",'bot'],
            required:true
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        }
    },{timestamps:true}
);

const Message=mongoose.model("Message",messageSchema);

export default Message;