// src/pages/TrackOrderPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PackageCheck, Truck, Warehouse, AlertCircle } from 'lucide-react';

// Base URL for public tracking endpoint
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/orders/track/${orderId}`);
        setOrder(data);
      } catch (err) {
        setError('Order not found. Please check your Order ID and try again.');
        setOrder(null);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Warehouse':
        return <Warehouse className="w-12 h-12 text-blue-500" />;
      case 'On the Way':
        return <Truck className="w-12 h-12 text-yellow-500" />;
      case 'Delivered':
        return <PackageCheck className="w-12 h-12 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Order Status</h1>
      {loading && <div className="text-center">Loading order details...</div>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md flex items-center justify-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {order && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Order ID: {order.orderId}
                </h2>
                <p className="text-gray-600">
                  Customer: {order.customerName}
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                {getStatusIcon(order.status)}
                <span className="text-2xl font-medium text-gray-700">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Progress Bar (Simple) */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Tracking History</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between text-xs">
                  <div className="w-1/3 text-center">
                    <span className="font-semibold text-blue-600">In Warehouse</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className={order.status === 'On the Way' || order.status === 'Delivered' ? 'font-semibold text-yellow-600' : 'text-gray-400'}>
                      On the Way
                    </span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className={order.status === 'Delivered' ? 'font-semibold text-green-600' : 'text-gray-400'}>
                      Delivered
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div style={{ width: order.status === 'In Warehouse' ? '33%' : (order.status === 'On the Way' ? '66%' : '100%') }} 
                       className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center 
                       ${order.status === 'In Warehouse' ? 'bg-blue-500' : (order.status === 'On the Way' ? 'bg-yellow-500' : 'bg-green-500')}
                       transition-all duration-500`}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;