import express from 'express';
import {createChat, deleteChat, getChats,getChatById, updateChat} from "../controllers/chat.controller.js";

const router = express.Router();

router.get('/', getChats);
router.get('/:id', getChatById);
router.post('/', createChat);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);

export default router;