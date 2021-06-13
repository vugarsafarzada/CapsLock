'use strict';
const express = require('express');
const auth = express.Router();
const authController = require('../controllers/auth_controller');

auth.post('/login', authController.login);
auth.post('/register', authController.register);

module.exports = auth;
