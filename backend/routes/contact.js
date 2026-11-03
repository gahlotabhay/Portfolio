/**
 * Contact Routes
 */

const express = require('express');
const router = express.Router();
const { validateContactSubmission } = require('../middleware/validation');
const { handleContactSubmission } = require('../controllers/contact-controller');

// POST /api/contact - Validates and stores incoming contact messages
router.post('/', validateContactSubmission, handleContactSubmission);

module.exports = router;
