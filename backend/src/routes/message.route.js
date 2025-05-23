import express from "express";
import {createChatMessage, getChatMessages} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:id",getChatMessages);
router.post("/:id",createChatMessage);




export default router;