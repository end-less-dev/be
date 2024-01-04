const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.get('/get-user-by-id/:id',userController.getUserById)
router.get('/get-all-users',userController.getAllUsers)
router.post('/create-user',userController.save);
router.post('/create-user-en',userController.createUserWithCrypto)
router.post('/login',userController.login)

module.exports = router