// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Package } from 'lucide-react'; // Icon
import OrderPlacingForm from './OrderPlacingForm';

const Navbar = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Dummy callback (you can connect it later to refresh order list)
  const handleOrderAdded = () => {
    console.log('Order added!');
  };
  return (
    <>
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-800">ShipEdge</span>
            </Link>
          </div>

         

          {/* Login/Signup Buttons */}
          <div className="flex items-center space-x-4">

             <button
                onClick={openModal}
                className="text-sm font-medium text-gray-600 hover:text-indigo-500 px-[5px]"
              >
                Place Order
              </button>
             
            <Link
              to="/signup"
              className="text-sm font-medium text-gray-600 hover:text-indigo-500 px-[5px]"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-[5px] py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Manager Login
            </Link>
          </div>
        </div>
      </div>
    </nav>

       <OrderPlacingForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onOrderAdded={handleOrderAdded}
      />
      </>
  );
};

export default Navbar;