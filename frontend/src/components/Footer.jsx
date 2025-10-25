// src/components/Footer.jsx
import React from 'react';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 w-full mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">TrackIt Inc.</h3>
            <p className="text-sm">
              Providing reliable order tracking and management solutions for your business.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>123 Shipping Lane, Logistics City, 10001</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@trackit.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TrackIt Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;