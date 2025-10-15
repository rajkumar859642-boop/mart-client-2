import { Link, useParams } from "react-router-dom";
import { shoppingData } from "../../data";
import { useEffect, useState } from "react";

const DmartComboOffer = () => {
  const { id } = useParams();

  // Initial State: Start with 15 minutes and 25 seconds
  const INITIAL_TIME = 15 * 60 + 25; // total seconds
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  // Calculate delivery date (today + 2 days)
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 2);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  }); // Short format: e.g., "12 October"

  // Find the matching product data
  const product = shoppingData.find((item) => item.id === parseInt(id));

  // Handle case where no product is found
  if (!product) {
    return (
      <div className="w-full px-5 md:px-20 mx-auto py-10 mt-20 bg-white text-center">
        <h1 className="text-3xl font-bold text-red-600">Product Not Found</h1>
      </div>
    );
  }

  // useEffect for the Countdown Logic
  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Helper function to format the time
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const minutesDisplay = String(minutes).padStart(2, "0");
    const secondsDisplay = String(seconds).padStart(2, "0");
    return `${minutesDisplay} min ${secondsDisplay} sec`;
  };

  // Determine the color based on remaining time for urgency
  const timerColor = timeLeft > 300 ? "text-green-600" : "text-red-600";

  return (
    <div className="w-full px-5 md:px-20 mx-auto border border-gray-200 py-10 mt-20 bg-white">
      <img
        src={product.img}
        alt={product.title}
        className="w-full md:h-96 h-80 object-cover rounded-lg"
      />

      {/* Offer Details and Buttons Section */}
      <div className="p-4 sm:p-6">
        {/* Offer Description */}
        <p className="text-sm md:text-lg text-gray-700 font-bold mb-2">
          {product.title}
        </p>

        {/* Discount and Price */}
        <div className="flex items-baseline mb-3">
          <p className="text-green-600 font-bold mr-2">{product.discount}</p>
          <p className="text-2xl font-bold text-gray-900 mr-2">
            {product.offer_price}
          </p>
          <p className="text-lg text-gray-500 line-through">
            {product.original_price}
          </p>
        </div>

        <hr className="mb-3" />

        {/* Timer/Offer Ends */}
        <div
          className={`text-center ${timerColor} font-medium mb-3 text-sm md:text-base`}
        >
          {timeLeft > 0 ? (
            <>
              Offer ends in{" "}
              <span className="text-yellow-600">{formatTime(timeLeft)}</span>
            </>
          ) : (
            <span className="font-extrabold text-yellow-600">Offer Ended!</span>
          )}
        </div>

        {/* Delivery and Return Policy */}
        <div className="space-y-1 mb-3">
          <p className="text-sm md:text-base text-gray-700">
            <span className="font-medium">Delivery:</span>{" "}
            {formattedDeliveryDate}
          </p>
          <p className="text-sm md:text-base text-gray-700">
            <span className="font-medium">Easy 7-Day Return Policy.</span> 
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Link to={`/shopping-cart/${id}`} className="flex-1 w-full">
            <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 ease-in-out text-sm md:text-base">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DmartComboOffer;