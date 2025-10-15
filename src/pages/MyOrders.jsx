import React from 'react';
import Navbar from '../components/global/Navbar';
import Footer from '../components/global/Footer';

const MyOrders = () => {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-24 sm:mt-32 bg-white rounded-lg shadow-sm text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-lg text-gray-600 font-medium">No orders found.</p>
          <p className="text-sm text-gray-500 mt-2">
            You haven't placed any orders yet. Start shopping now!
          </p>
          <a
            href="/"
            className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out text-sm sm:text-base"
          >
            Shop Now
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;