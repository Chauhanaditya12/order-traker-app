// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const LandingPage = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      navigate(`/track/${orderId.trim()}`);
    }
  };

  return (
    <div className="flex items-center justify-center py-20 md:py-32 bg-gray-50">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Track Your Order
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Enter your unique order ID below to see the status of your delivery.
        </p>

        <form
          onSubmit={handleTrackOrder}
          className="mt-10 flex flex-col sm:flex-row sm:max-w-lg sm:mx-auto"
        >
          <div className="flex-1 min-w-0">
            <label htmlFor="order-id" className="sr-only">
              Order ID
            </label>
            <input
              id="order-id"
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your order ID (e.g., A1B2C3D4)"
            />
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Search className="w-5 h-5 mr-2" />
              Track Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;