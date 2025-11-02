import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

const OrderPlacingForm = ({ isOpen, onClose, onCustomerAdded }) => {
  const [formData, setFormData] = useState({
    name: '', // Maps to customerName
    email: '',
    contactNo: '',
    address: '',
    orderDescription: '', // Optional field
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { api } = useAuth(); // Assuming 'api' will be used to post to a '/customers' endpoint

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simple validation for required fields
    if (!formData.name || !formData.email || !formData.contactNo || !formData.address) {
        setError('Please fill in all required fields (Name, Email, Contact No., Address).');
        setLoading(false);
        return;
    }

    try {
      // NOTE: Update this endpoint if your backend uses a different path for customers
      await api.post('/orders', formData); 
      setLoading(false);
      onCustomerAdded(); // Refresh the list
      onClose(); // Close the modal
      
      // Reset form
      setFormData({
        name: '', email: '', contactNo: '', address: '', orderDescription: '',
      });
    } catch (err) {
      // Adjusted error message for customer creation
      setError(err.response?.data?.message || 'Failed to create customer.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">Add New Customer</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          {/* --- Form Fields --- */}
          
          {/* Name (Customer Name) */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          
          {/* Contact No. */}
          <div>
            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">Contact No.</label>
            <input type="tel" name="contactNo" id="contactNo" value={formData.contactNo} onChange={handleChange} required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>

          {/* Order Description (Optional) - Using a textarea for multi-line input */}
          <div>
            <label htmlFor="orderDescription" className="block text-sm font-medium text-gray-700">Order Description (Optional)</label>
            <textarea name="orderDescription" id="orderDescription" rows="3" value={formData.orderDescription} onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>

          {/* --- Action Buttons --- */}
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
              {loading ? 'Adding...' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPlacingForm;