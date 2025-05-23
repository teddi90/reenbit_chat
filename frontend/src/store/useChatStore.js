import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";

export const useChatStore = create((set,get)=>({
    chats:[],
    selectedChat:null,
    isChatLoading:false,

    getChats:async ()=>{
        try{
            set({isChatLoading:true});
            const res= await axiosInstance.get("/chat");
            set({chats:res.data});
            set({ selectedChat: res.data[0] });
        }
        catch(err){
            console.log("Error getting chats from server: ",err);
        }
        finally {
            set({isChatLoading:false});
        }
    },
    createChat:async (data)=>{
      try{
          const res= await axiosInstance.post("/chat",data);
          set((state) => ({ chats: [...state.chats, res.data] }));
      }  catch (err) {
          console.log("Error creating chat: ",err);
      }
    },
    setSelectedChat: (chat)=>{
        set({selectedChat:chat});
    },
    sendMessage:async (messageData,sender)=>{
        const {  selectedChat } = get();

        try {
            const res = await axiosInstance.post(`/message/${selectedChat._id}`, { ...messageData,  sender});
            set((state) => ({
                chats: state.chats.map(chat =>
                    chat._id === selectedChat._id
                        ? { ...chat, messages: [...chat.messages, res.data] }
                        : chat
                )
            }));

        } catch (error) {
            console.log(error.response.data.message);
        }
    }
}));