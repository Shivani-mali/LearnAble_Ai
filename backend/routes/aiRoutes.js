const express = require('express');
const router = express.Router();
const { askAi } = require('../controllers/aiController');

// Route to ask AI a question
router.post('/ask', askAi);

module.exports = router;
