// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import SideMenu from '../components/SideMenu';
import OrderTable from '../components/OrderTable';
import OrderFormModal from '../components/OrderFormModal';
import { useAuth } from '../context/AuthContext';
import { Plus, Search } from 'lucide-react';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [city, setCity] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // 'In Warehouse', 'On the Way', 'Delivered'
  
  const [cityInput, setCityInput] = useState(''); // Temp state for the input box

  const { api } = useAuth(); // Get the pre-configured axios instance

  // Function to fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      if (city) {
        params.append('city', city);
      }
      if (statusFilter) {
        params.append('status', statusFilter);
      }
      
      const { data } = await api.get(`/orders?${params.toString()}`);
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on component mount and when filters change
  useEffect(() => {
    fetchOrders();
  }, [city, statusFilter]);

  const handleSetCity = () => {
    setCity(cityInput);
  };
  
  // Handlers for OrderTable actions
  const handleUpdateOrder = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}`, { status: newStatus });
      fetchOrders(); // Refetch to show changes
    } catch (err) {
      console.error('Failed to update order', err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await api.delete(`/orders/${orderId}`);
        fetchOrders(); // Refetch to show changes
      } catch (err) {
        console.error('Failed to delete order', err);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideMenu setStatusFilter={setStatusFilter} activeFilter={statusFilter} />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Order Dashboard
            </h1>
            <p className="text-gray-600">
              {city ? `Showing orders for ${city}` : 'Showing all orders'}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            {/* City Filter */}
            <div className="flex">
              <input 
                type="text"
                placeholder="Enter city name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={handleSetCity}
                className="px-3 py-2 bg-gray-700 text-white rounded-r-md hover:bg-gray-800"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            {/* Add New Order Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Order
            </button>
          </div>
        </header>

        {/* Orders Display */}
        <div className="bg-white shadow rounded-lg">
          {loading ? (
            <p className="p-6">Loading orders...</p>
          ) : error ? (
            <p className="p-6 text-red-500">{error}</p>
          ) : (
            <OrderTable 
              orders={orders} 
              onUpdate={handleUpdateOrder}
              onDelete={handleDeleteOrder}
            />
          )}
        </div>
      </main>

      {/* Modal */}
      <OrderFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrderAdded={fetchOrders} // Refresh list after adding
      />
    </div>
  );
};

export default DashboardPage;