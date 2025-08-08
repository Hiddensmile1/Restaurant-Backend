const express = require('express');
const {register, login, prof} = require('../Controller/authController');
const authMiddleware = require('../middleware/authMiddleware');
// const authMiddleware = require ('../middleware/authMiddleware')
const router = express.Router()

// public routes
router.post('/register', register);

router.post('/login', login)

// Protected route
router.get('/prof', authMiddleware, prof)

module.exports = router