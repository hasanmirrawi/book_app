const express = require('express');
const authController = require('../controllers/auth_controller.js');
const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

module.exports = authRouter;
