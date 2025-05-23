import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        chatPicture: {
            type: String,
        },
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
            }
        ]
    },{timestamps:true}
);

const Chat=mongoose.model("Chat",chatSchema);

export default Chat;