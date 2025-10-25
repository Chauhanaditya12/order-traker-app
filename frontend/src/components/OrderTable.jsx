// src/components/OrderTable.jsx
import React from 'react';
import { Trash2, Edit } from 'lucide-react';

const OrderTable = ({ orders, onUpdate, onDelete }) => {
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Warehouse':
        return 'bg-blue-100 text-blue-800';
      case 'On the Way':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (orderId, currentStatus) => {
    let newStatus;
    if (currentStatus === 'In Warehouse') newStatus = 'On the Way';
    else if (currentStatus === 'On the Way') newStatus = 'Delivered';
    else return; // If already delivered, do nothing

    onUpdate(orderId, newStatus);
  };

  if (orders.length === 0) {
    return <p className="p-6 text-center text-gray-500">No orders found for the current filter.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              City
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.orderId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="font-medium">{order.customerName}</div>
                <div>{order.customerContact}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.city}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                {order.status !== 'Delivered' && (
                  <button
                    onClick={() => handleStatusChange(order._id, order.status)}
                    title={order.status === 'In Warehouse' ? 'Mark as "On the Way"' : 'Mark as "Delivered"'}
                    className="p-1 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-100"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(order._id)}
                  title="Delete Order"
                  className="p-1 text-red-600 hover:text-red-900 rounded-full hover:bg-red-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;