import express from 'express';
import dotenv from 'dotenv';

import chatRoutes from './routes/chat.route.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';

import path from 'path';

import {connectDB} from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    })
}

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
    connectDB();
})