// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  signupManager,
  loginManager,
} = require('../controllers/authController');

router.post('/signup', signupManager);
router.post('/login', loginManager);

module.exports = router;