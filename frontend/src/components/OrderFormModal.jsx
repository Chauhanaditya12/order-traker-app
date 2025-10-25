// src/components/OrderFormModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

const OrderFormModal = ({ isOpen, onClose, onOrderAdded }) => {
  const [formData, setFormData] = useState({
    orderId: '',
    customerName: '',
    customerContact: '',
    city: '',
    status: 'In Warehouse',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { api } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/orders', formData);
      setLoading(false);
      onOrderAdded(); // Refresh the list
      onClose(); // Close the modal
      // Reset form
      setFormData({
        orderId: '', customerName: '', customerContact: '', city: '', status: 'In Warehouse',
      });
    } catch (err) {
      setError(err.response.data.message || 'Failed to create order. Check Order ID uniqueness.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">Add New Order</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          {/* Form Fields */}
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID (Must be unique)</label>
            <input type="text" name="orderId" id="orderId" value={formData.orderId} onChange={handleChange} required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input type="text" name="customerName" id="customerName" value={formData.customerName} onChange={handleChange} required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="customerContact" className="block text-sm font-medium text-gray-700">Customer Contact</label>
            <input type="text" name="customerContact" id="customerContact" value={formData.customerContact} onChange={handleChange} required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option>In Warehouse</option>
              <option>On the Way</option>
              <option>Delivered</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
              {loading ? 'Adding...' : 'Add Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFormModal;