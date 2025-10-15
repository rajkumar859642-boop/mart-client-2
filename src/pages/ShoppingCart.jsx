import React from 'react';
import Navbar from '../components/global/Navbar';
import Footer from '../components/global/Footer';
import { Link, useParams } from 'react-router-dom';
import { shoppingData } from '../data';

const ShoppingCart = () => {
  const { id } = useParams();
  const product = shoppingData.find(item => item.id === parseInt(id));

  // Calculate delivery date (today + 2 days)
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 2);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long', 
    month: 'long',
    day: 'numeric',
  });

  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Navbar />
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-white mt-32 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-4 border-b pb-2">
          Shopping Cart
        </h1>

        {/* Table Header (Desktop only) */}
        <div className="hidden sm:grid grid-cols-5 gap-4 py-3 border-b text-gray-600 font-medium text-sm">
          <div className="col-span-2">Product</div>
          <div className="text-right">Basic Price</div>
          <div className="text-right">Quantity</div>
          <div className="text-right">Total</div>
        </div>

        {/* Cart Item Row */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center py-4 border-b">
          {/* Product Details */}
          <div className="md:col-span-2 flex justify-between sm:block sm:text-right">
            <p className="font-medium text-gray-800">{product.title}</p>
          </div>

          {/* Basic Price */}
          <div className="flex justify-between sm:block sm:text-right">
            <span className="text-gray-600 text-sm sm:hidden">Basic Price:</span>
            <span className="font-medium">{product.offer_price}</span>
          </div>

          {/* Quantity */}
          <div className="flex justify-between sm:block sm:text-right">
            <span className="text-gray-600 text-sm sm:hidden">Quantity:</span>
            <span className="font-medium">1</span>
          </div>

          {/* Total */}
          <div className="flex justify-between sm:block sm:text-right">
            <span className="text-gray-600 text-sm sm:hidden">Total:</span>
            <span className="font-bold text-gray-900">{product.offer_price}</span>
          </div>
        </div>

        {/* Summary Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4 sm:gap-6 border-t pt-4">
          {/* Left side */}
          <div className="text-gray-700 w-full sm:w-auto space-y-2">
            <div className="flex justify-between sm:block">
              <span className="font-medium text-sm sm:text-base">Subtotal:</span>
              <span className="text-sm sm:text-base">{product.offer_price}</span>
            </div>
            <div className="flex justify-between sm:block">
              <span className="font-medium text-sm sm:text-base">Shipping:</span>
              <span className="text-sm sm:text-base">Free</span>
            </div>
            <div className="flex justify-between sm:block">
              <span className="font-medium  text-sm sm:text-base">Estimated Delivery:</span>
              <span className=" text-sm sm:text-base">{formattedDeliveryDate}</span>
            </div>
            <div className="flex justify-between sm:block">
              <span className="font-medium text-green-600 text-sm sm:text-base">Easy 7-Day Return Policy:</span>
              <span className="text-green-600 text-sm sm:text-base">Return your items within 7 days.</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Link
            to={`/checkout/${id}`}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-md shadow-md transition duration-300 ease-in-out uppercase text-center text-sm sm:text-base"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCart;