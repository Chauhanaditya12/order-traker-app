// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerContact: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['In Warehouse', 'On the Way', 'Delivered'],
    default: 'In Warehouse',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);