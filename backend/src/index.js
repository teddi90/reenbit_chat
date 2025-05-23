import express from 'express';
import dotenv from 'dotenv';

import chatRoutes from './routes/chat.route.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';

import {connectDB} from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
    connectDB();
})