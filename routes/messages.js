const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");

router.get('/get-message-by-userId/:userId',messageController.getMessageByUserId)
router.post('/create-message',messageController.createMessage);

module.exports = router;