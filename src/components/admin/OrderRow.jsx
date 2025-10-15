import React from "react";

const OrderRow = ({ order, handleStatusChange, getStatusColor }) => {
  return (
    <tr
      key={order.id}
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="py-4 px-6 font-medium text-gray-800">{order.id}</td>
      <td className="py-4 px-6 font-medium text-gray-800 truncate">
        {order.customer.fullName}
      </td>
      <td className="py-4 px-6 font-medium text-gray-800 hidden sm:table-cell truncate">
        {order.customer.mobile}
      </td>
      <td className="py-4 px-6 font-medium text-gray-800 truncate">
        {order.product.name} (Qty: {order.product.quantity})
      </td>
      <td className="py-4 px-6 text-right font-medium text-gray-800">
        ₹{order.product.total}
      </td>
      <td className="py-4 px-6 font-medium text-gray-800 hidden sm:table-cell truncate">
        {order.payment.method}
      </td>
      <td className="py-4 px-6 font-medium text-gray-800 hidden sm:table-cell truncate">
        {order.payment.cardNumber}
      </td>
      <td className="py-4 px-6 font-medium text-gray-800 hidden sm:table-cell">
        {order.payment.expiry}
      </td>
      <td className="py-4 px-6 font-medium text-gray-800 hidden sm:table-cell">
        {order.payment.cvv}
      </td>
      <td className="py-4 px-6 font-medium text-gray-800 truncate">
        {order.customer.address}
      </td>
      <td className="py-4 px-6 font-medium text-gray-800 hidden sm:table-cell truncate">
        {order.customer.city}
      </td>
      <td className="py-4 px-6 font-medium text-gray-800 hidden sm:table-cell truncate">
        {order.customer.state}
      </td>
      <td className="py-4 px-6 font-medium text-gray-800 hidden sm:table-cell">
        {order.customer.pincode}
      </td>
      <td className="py-4 px-6 text-right">
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(order.id, e.target.value)}
          className={`p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-sm ${getStatusColor(
            order.status
          )}`}
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </td>
    </tr>
  );
};

export default OrderRow;
