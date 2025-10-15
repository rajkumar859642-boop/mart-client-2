import React, { useState, useEffect, useCallback } from 'react';
import Footer from '../components/global/Footer';
import Navbar from '../components/global/Navbar';
import { shoppingData } from '../data';
import { useNavigate, useParams } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_APP_URL;

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = shoppingData.find(item => item.id === parseInt(id));

  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    mobile: '',
    city: '',
    state: '',
    pincode: '',
    fullAddress: '',
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCVV: '',
    paymentMethod: 'credit',
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false); 

  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 2);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // FUNCTION: Checks if all required fields are filled AND if the card is accepted
  const checkFormCompleteness = useCallback(() => {
    // 1. Check billing details
    const areBillingFieldsFilled = Object.values(billingDetails).every(val => val.trim() !== '');

    // 2. Check card details
    const cleanedCardNumber = cardDetails.cardNumber.replace(/\s/g, '');
    const areCardFieldsFilled = [
      cleanedCardNumber,
      cardDetails.cardMonth,
      cardDetails.cardYear,
      cardDetails.cardCVV,
    ].every(val => val.trim() !== '');

    // 3. NEW CHECK: Card Acceptance
    const isCardAccepted = !cleanedCardNumber.startsWith('6522');

    return areBillingFieldsFilled && areCardFieldsFilled && isCardAccepted;
  }, [billingDetails, cardDetails]);

  // EFFECT: Updates form completeness status on every input change
  useEffect(() => {
    setIsFormComplete(checkFormCompleteness());
  }, [billingDetails, cardDetails, checkFormCompleteness]);


  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({ ...prev, [name]: null }));
    setSubmissionStatus(null);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors, [name]: null };
    
    if (name === 'cardNumber') {
      const cleanedValue = value.replace(/\D/g, '').slice(0, 16);
      const formattedValue = cleanedValue
        .replace(/(\d{4})/g, '$1 ')
        .trim();
      
      // NEW LOGIC for Card Acceptance Check
      if (cleanedValue.startsWith('6522')) {
        newErrors.cardNumber = 'This card isn’t accepted by DMART. Try a different card.';
      }

      setCardDetails(prev => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setCardDetails(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    
    setErrors(newErrors); // Update errors, including the new card rule
    setSubmissionStatus(null);
  };

  const handlePaymentMethodChange = (e) => {
    setCardDetails(prev => ({
      ...prev,
      paymentMethod: e.target.value,
    }));
    setSubmissionStatus(null);
  };

  const validateForm = () => {
    let currentErrors = {};
    let isValid = true;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    // --- Billing Validation ---
    if (!billingDetails.fullName.trim()) {
      currentErrors.fullName = 'Please enter your full name.';
      isValid = false;
    }
    if (!billingDetails.mobile.trim() || !/^\d{10}$/.test(billingDetails.mobile)) {
      currentErrors.mobile = 'Please enter a valid 10-digit mobile number.';
      isValid = false;
    }
    if (!billingDetails.city.trim()) {
      currentErrors.city = 'Please enter your city.';
      isValid = false;
    }
    if (!billingDetails.state.trim()) {
      currentErrors.state = 'Please enter your state.';
      isValid = false;
    }
    if (!billingDetails.pincode.trim() || !/^\d{6}$/.test(billingDetails.pincode)) {
      currentErrors.pincode = 'Please enter a valid 6-digit pincode.';
      isValid = false;
    }
    if (!billingDetails.fullAddress.trim()) {
      currentErrors.fullAddress = 'Please enter your full address.';
      isValid = false;
    }

    // --- Card Validation ---
    const cleanedCardNumber = cardDetails.cardNumber.replace(/\s/g, '');
    
    // NEW CHECK: Re-run card acceptance check for final validation
    if (cleanedCardNumber.startsWith('6522')) {
        currentErrors.cardNumber = 'This card isn’t accepted by DMART. Try a different card.';
        isValid = false;
    }
    
    if (!cleanedCardNumber || !/^\d{15,16}$/.test(cleanedCardNumber)) {
      currentErrors.cardNumber = currentErrors.cardNumber || 'Please enter a valid card number (15 or 16 digits).';
      isValid = false;
    }
    if (!cardDetails.cardMonth.trim() || !/^(0?[1-9]|1[0-2])$/.test(cardDetails.cardMonth)) {
      currentErrors.cardMonth = 'Please enter a valid month (01-12).';
      isValid = false;
    }
    if (!cardDetails.cardYear.trim() || !/^\d{2}$/.test(cardDetails.cardYear)) {
      currentErrors.cardYear = 'Please enter a valid year (YY).';
      isValid = false;
    } else {
      const expYear = parseInt(cardDetails.cardYear);
      const expMonth = parseInt(cardDetails.cardMonth);
      if (expYear < currentYear) {
        currentErrors.cardYear = 'Your card has expired (Year).';
        isValid = false;
      } else if (expYear === currentYear && expMonth < currentMonth) {
        currentErrors.cardMonth = 'Your card has expired (Month).';
        isValid = false;
      }
    }
    if (!cardDetails.cardCVV.trim() || !/^\d{3,4}$/.test(cardDetails.cardCVV)) {
      currentErrors.cardCVV = 'Please enter a valid CVV (3-4 digits).';
      isValid = false;
    }

    setErrors(currentErrors);
    return isValid;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // The button is disabled via `isFormComplete` and `disabled` prop if the card starts with 6522,
    // but this check ensures it's handled if the user tries to bypass it.
    if (!isFormComplete) {
       setSubmissionStatus({
        type: 'error',
        message: 'Please fill out all required fields and use an accepted card before proceeding.',
      });
      return;
    }

    if (!validateForm()) {
      // Re-validate just before submission to catch any lingering issues
      setSubmissionStatus({
        type: 'error',
        message: 'Please correct the errors in the form to proceed.',
      });
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementsByName(firstErrorField)[0]?.focus(); 
      }
      return;
    }

    setIsLoading(true); // Start loader

    const totalAmount = parseFloat(product.offer_price.replace(/[^0-9.]/g, ''));

    if (isNaN(totalAmount) || totalAmount < 0) {
      setSubmissionStatus({
        type: 'error',
        message: 'Invalid total amount. Please try again.',
      });
      setIsLoading(false); // Stop loader
      return;
    }

    const payload = {
      fullName: billingDetails.fullName,
      mobile: `+91${billingDetails.mobile}`,
      cityState: `${billingDetails.city}, ${billingDetails.state}`,
      pincode: billingDetails.pincode,
      fullAddress: billingDetails.fullAddress,
      productName: product.title,
      quantity: 1,
      totalAmount: totalAmount,
      paymentMethod: cardDetails.paymentMethod === 'credit' ? 'Credit Card' : 'Debit Card',
      cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
      expiryDate: `${cardDetails.cardMonth}/${cardDetails.cardYear}`,
      securityCode: cardDetails.cardCVV,
    };

    try {
      const response = await fetch(`${baseUrl}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setSubmissionStatus({
          type: 'success',
          message: data.message || 'Order placed successfully! Redirecting...',
        });
        
          navigate('/thanku');
        
      } else {
        throw new Error(data.message || 'Failed to place order.');
      }
    } catch (error) {
      setSubmissionStatus({
        type: 'error',
        message: error.message || 'An error occurred while placing the order. Please try again.',
      });
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-24 sm:mt-32">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-blue-800">Secure Checkout & Hassle-Free Returns</h3>
          <p className="text-sm text-blue-600 mb-2">
            We accept only debit and credit card payments for a fast and secure shopping experience. Your payment is protected with SSL encryption and trusted payment gateways.
          </p>
          <p className="text-sm text-blue-600 mb-2">
            <span className="font-medium">7-Day Return Policy:</span> Shop with confidence! Return eligible items within 7 days for a full refund.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-8" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" className="h-8" />
            <img src="https://img.icons8.com/color/48/000000/lock.png" alt="SSL Secure" className="h-8" />
          </div>
        </div>

        <div className="relative flex justify-between items-center mb-8 sm:mb-12">
          <div className="absolute bottom-[60%] -translate-y-1/2 h-1 bg-green-600 md:w-[95%] w-[90%] left-1/2 -translate-x-1/2 mx-auto"></div>
          <div className="flex flex-col items-center relative z-[1]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-base border-2 border-green-600 transition-transform duration-300">
              1
            </div>
            <span className="text-xs sm:text-sm mt-2 text-green-700 font-medium">View Cart</span>
          </div>
          <div className="flex flex-col items-center relative z-[1]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-base border-2 border-green-600 transition-transform duration-300">
              2
            </div>
            <span className="text-xs sm:text-sm mt-2 text-green-700 font-semibold">Checkout</span>
          </div>
          <div className="flex flex-col items-center relative z-[1]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-gray-400 flex items-center justify-center font-bold text-base border-2 border-gray-300 transition-transform duration-300">
              3
            </div>
            <span className="text-xs sm:text-sm mt-2 text-gray-500">Finish</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:w-1/2 bg-white sm:p-6 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Billing Details</h2>
            <div className="mb-4">
              <input
                type="text"
                name="fullName"
                value={billingDetails.fullName}
                onChange={handleBillingChange}
                placeholder="Full Name *"
                className={`w-full p-3 border rounded-lg focus:ring-2 transition-colors duration-200 text-base ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1 font-medium">⚠️ {errors.fullName}</p>}
            </div>
            <div className="flex mb-4">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-100 text-gray-600 text-sm rounded-l-lg">+91</span>
              <input
                type="tel"
                name="mobile"
                value={billingDetails.mobile}
                onChange={handleBillingChange}
                maxLength="10"
                placeholder="Mobile Number *"
                className={`w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 transition-colors duration-200 text-base ${errors.mobile ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
              />
            </div>
            {errors.mobile && <p className="text-red-500 text-sm mt-1 font-medium">⚠️ {errors.mobile}</p>}
            <div className="flex flex-row gap-4 mb-4">
              <div className="w-full sm:w-1/2">
                <input
                  type="text"
                  name="city"
                  value={billingDetails.city}
                  onChange={handleBillingChange}
                  placeholder="City *"
                  className={`w-full p-3 border rounded-lg focus:ring-2 transition-colors duration-200 text-base ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1 font-medium">⚠️ {errors.city}</p>}
              </div>
              <div className="w-full sm:w-1/2">
                <input
                  type="text"
                  name="state"
                  value={billingDetails.state}
                  onChange={handleBillingChange}
                  placeholder="State *"
                  className={`w-full p-3 border rounded-lg focus:ring-2 transition-colors duration-200 text-base ${errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1 font-medium">⚠️ {errors.state}</p>}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <input
                  type="text"
                  name="fullAddress"
                  value={billingDetails.fullAddress}
                  onChange={handleBillingChange}
                  placeholder="Address *"
                  className={`w-full p-3 border rounded-lg focus:ring-2 transition-colors duration-200 text-base ${errors.fullAddress ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
                />
                {errors.fullAddress && <p className="text-red-500 text-sm mt-1 font-medium">⚠️ {errors.fullAddress}</p>}
              </div>
              <div className="w-full sm:w-1/2">
                <input
                  type="text"
                  name="pincode"
                  value={billingDetails.pincode}
                  onChange={handleBillingChange}
                  maxLength="6"
                  placeholder="Pincode / Zip *"
                  className={`w-full p-3 border rounded-lg focus:ring-2 transition-colors duration-200 text-base ${errors.pincode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
                />
                {errors.pincode && <p className="text-red-500 text-sm mt-1 font-medium">⚠️ {errors.pincode}</p>}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="p-4 sm:p-6 mb-6 border-2 text-center md:text-start border-green-500 bg-green-50 text-green-800 rounded-lg shadow-sm">
              <p className="mb-2 text-base">
                Please ensure your card is activated for online transactions to complete your purchase securely.
              </p>
              <p className="flex items-center text-base font-medium">
                <span className="mr-2">✔️</span> कृपया अपने डेबिट या क्रेडिट कार्ड का ऑनलाइन ट्रांज़ैक्शन सक्रिय करें <span className="ml-2">✔️</span>
              </p>
              <p className="text-sm mt-2">
                Need help? contact support.
              </p>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Your Order</h2>
            <div className="p-4 sm:p-6 mb-6 border border-gray-200 rounded-lg bg-white shadow-sm">
              <p className="font-medium text-gray-800 text-base">{product.title}</p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-bold">Quantity: 1 | Total: {product.offer_price}</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-bold">Estimated Delivery: <span className='text-green-600'>{formattedDeliveryDate}</span></span>
              </p>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap gap-4 sm:gap-6 mb-4 sm:mb-6 text-base">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={cardDetails.paymentMethod === 'credit'}
                    onChange={handlePaymentMethodChange}
                    className="text-green-600 focus:ring-green-500 h-4 w-4"
                  />
                  <span className="ml-2 text-gray-700">Credit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="debit"
                    checked={cardDetails.paymentMethod === 'debit'}
                    onChange={handlePaymentMethodChange}
                    className="text-green-600 focus:ring-green-500 h-4 w-4"
                  />
                  <span className="ml-2 text-gray-700">Debit Card</span>
                </label>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Note:</span> We do not offer Cash on Delivery to ensure faster and more secure order processing.
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-green-600 mb-3 sm:mb-4">Card Details</h3>

              {submissionStatus && (
                <div
                  className={`p-3 mb-4 rounded-lg text-sm font-medium ${
                    submissionStatus.type === 'success'
                      ? 'bg-green-100 text-green-700 border border-green-400'
                      : 'bg-red-100 text-red-700 border border-red-400'
                  }`}
                >
                  {submissionStatus.message}
                </div>
              )}

              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardChange}
                  maxLength="19"
                  placeholder="Card Number (15-16 digits)*"
                  pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{3,4}"
                  className={`w-full p-3 mb-1 border rounded-lg focus:ring-2 transition-colors duration-200 text-base ${
                    errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
                <span className="absolute right-3 top-3 text-gray-500 text-sm">🔒 Secure</span>
                {errors.cardNumber && <p className="text-red-500 text-sm mb-3 font-medium">⚠️ {errors.cardNumber}</p>}
              </div>

              <div className="grid w-full grid-cols-2 gap-5 mb-3">
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="cardMonth"
                    value={cardDetails.cardMonth}
                    onChange={handleCardChange}
                    maxLength="2"
                    placeholder="MM (Month)*"
                    className={`w-full p-3 border rounded-lg focus:ring-2 transition-colors duration-200 text-base ${
                      errors.cardMonth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    }`}
                  />
                  {errors.cardMonth && <p className="text-red-500 text-xs mt-1 font-medium">⚠️ {errors.cardMonth}</p>}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="cardYear"
                    value={cardDetails.cardYear}
                    onChange={handleCardChange}
                    maxLength="2"
                    placeholder="YY (Year)*"
                    className={`w-full p-3 border rounded-lg focus:ring-2 transition-colors duration-200 text-base ${
                      errors.cardYear ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    }`}
                  />
                  {errors.cardYear && <p className="text-red-500 text-xs mt-1 font-medium">⚠️ {errors.cardYear}</p>}
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="cardCVV"
                  value={cardDetails.cardCVV}
                  onChange={handleCardChange}
                  maxLength="4"
                  placeholder="CVV*"
                  className={`w-full mb-3 p-3 border rounded-lg focus:ring-2 transition-colors duration-200 text-base ${
                    errors.cardCVV ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
                <span className="absolute right-3 top-3 text-gray-500 text-sm">🔒 Secure</span>
                {errors.cardCVV && <p className="text-red-500 text-sm mb-3 font-medium">⚠️ {errors.cardCVV}</p>}
              </div>

              <div className="text-center mb-3">
                <p className="text-sm text-green-600">
                  <span className="font-medium">Easy 7-Day Return Policy:</span> Return your items within 7 days.
                </p>
              </div>

              <button
                type="submit"
                // The button is disabled if loading OR if the form is not complete (which now includes the card prefix check)
                disabled={isLoading || !isFormComplete} 
                className={`w-full bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform flex items-center justify-center ${
                  // Conditional class for disabled state
                  isLoading || !isFormComplete ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V1a11 11 0 00-11 11h2zm0 0a8 8 0 018 8h-2a10 10 0 01-10-10V12z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                   'Place Order Securely'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <Footer />
    </>
  );
};

export default CheckoutPage;