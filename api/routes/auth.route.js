// require('dotenv').config()
const express = require('express');
const app = express();
const router = express.Router();
const authController = require('../controllers/auth.controller');

console.log(authController)

app.use(express.json());

// endpoint for login method
router.post('/login', authController.loginRequest);

// endpoint for register method
router.post('/register', authController.registerRequest);

// Endpoint for verifying when user enters any private screen
router.get('/private', authController.private);

module.exports = router;