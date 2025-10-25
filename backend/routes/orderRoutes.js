// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderByOrderId,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Public route for tracking
router.get('/track/:orderId', getOrderByOrderId);

// Protected manager routes
router.route('/').post(protect, createOrder).get(protect, getOrders);
router
  .route('/:id')
  .put(protect, updateOrder)
  .delete(protect, deleteOrder);

module.exports = router;