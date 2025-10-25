// controllers/authController.js
const Manager = require('../models/Manager');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new manager
// @route   POST /api/auth/signup
// @access  Public
const signupManager = async (req, res) => {
  const { email, password } = req.body;

  try {
    const managerExists = await Manager.findOne({ email });

    if (managerExists) {
      return res.status(400).json({ message: 'Manager already exists' });
    }

    const manager = await Manager.create({
      email,
      password,
    });

    if (manager) {
      res.status(201).json({
        _id: manager._id,
        email: manager.email,
        token: generateToken(manager._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid manager data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth manager & get token
// @route   POST /api/auth/login
// @access  Public
const loginManager = async (req, res) => {
  const { email, password } = req.body;

  try {
    const manager = await Manager.findOne({ email });

    if (manager && (await manager.matchPassword(password))) {
      res.json({
        _id: manager._id,
        email: manager.email,
        token: generateToken(manager._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signupManager, loginManager };