import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Footer from '../components/global/Footer';
import Navbar from '../components/global/Navbar';

const ConfirmationModal = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center md:min-h-screen mt-24">
        {/* Modal Content Box */}
        <div className="bg-white p-3 sm:p-12 max-w-lg w-full rounded-lg text-center border border-gray-200">
          {/* Checkmark Icon */}
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-600 text-6xl" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Please Confirm!
          </h1>

          {/* English Text Block */}
          <div className="mb-6 text-gray-600 space-y-3">
            <p className="text-lg hidden md:block">
              Thank you for visiting us and making your first purchase!
            </p>
            <p className="md:text-xl text-sm font-semibold text-gray-800">
              Your Order is Still Pending. Our team will contact you to confirm your order.
            </p>
            
            <p className="text-lg">
              We look forward to seeing you again.
            </p>
          </div>

          {/* Hindi Text Block */}
          <p className="text-sm md:text-lg text-gray-700 mb-8 font-medium">
            आपका ऑर्डर अभी भी पेंडिंग है। हमारी टीम आपसे संपर्क करेगी ताकि आपके ऑर्डर की पुष्टि हो सके।
          </p>

          {/* Footer Message */}
          <p className="text-sm text-gray-500 mt-4">
            It's our way of saying thanks for joining our family.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmationModal;