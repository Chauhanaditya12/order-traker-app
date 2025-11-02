// src/pages/LandingPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const LandingPage = () => {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      navigate(`/track/${orderId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,_white,transparent_60%)]"></div>

      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-20">
        {/* Left Section - Text and Form */}
        <div className="text-center md:text-left max-w-lg mx-auto md:mx-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-md">
            Track Your Order Instantly
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 mb-8">
            Enter your order ID below to get real-time delivery updates in just a click.
          </p>

          <form
            onSubmit={handleTrackOrder}
            className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-lg"
          >
            <input
              type="text"
              id="order-id"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g., A1B2C3D4)"
              className="flex-1 w-full px-4 py-3 rounded-xl border border-transparent bg-white/90 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-indigo-500 hover:bg-indigo-700 text-white shadow-md transition-all duration-200"
            >
              <Search className="w-5 h-5" />
              Track
            </button>
          </form>
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden md:block mt-12 md:mt-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/8984/8984911.png"
            alt="Tracking Illustration"
            className="w-[400px] lg:w-[500px] drop-shadow-2xl animate-float"
          />
        </div>
      </div>

      {/* Floating animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
