// controllers/orderController.js
const Order = require('../models/Order');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private (Manager)
const createOrder = async (req, res) => {
  const { orderId, customerName, customerContact, city, status } = req.body;

  try {
    const order = new Order({
      orderId,
      customerName,
      customerContact,
      city,
      status: status || 'In Warehouse',
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (filtered by city and status)
// @route   GET /api/orders
// @access  Private (Manager)
const getOrders = async (req, res) => {
  const { city, status } = req.query;
  let query = {};

  if (city) {
    query.city = city;
  }
  if (status) {
    query.status = status;
  }

  try {
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by *unique order ID* (for customer tracking)
// @route   GET /api/orders/track/:orderId
// @access  Public
const getOrderByOrderId = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an order (by MongoDB _id)
// @route   PUT /api/orders/:id
// @access  Private (Manager)
const updateOrder = async (req, res) => {
  const { customerName, customerContact, city, status } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.customerName = customerName || order.customerName;
      order.customerContact = customerContact || order.customerContact;
      order.city = city || order.city;
      order.status = status || order.status;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an order (by MongoDB _id)
// @route   DELETE /api/orders/:id
// @access  Private (Manager)
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      await order.deleteOne(); // Use deleteOne()
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderByOrderId,
  updateOrder,
  deleteOrder,
};