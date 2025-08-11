const express = require('express');
const {getMenu, addDish} = require('../Controller/menuController');
const authMiddleware = require('../middleware/authMiddleware');
const {adminOnly} = require('../middleware/roleMiddleware');

const router = express.Router()

// Open route
router.get('/', getMenu),

// Admin routes
router.post('/', authMiddleware, adminOnly, addDish)


module.exports = router;
