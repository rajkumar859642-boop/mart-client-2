import { Link } from "react-router-dom";
import ProductImg1 from "../../assets/card/1720600667.jpg";

const ProductCards = ({ value }) => {
  const {id, img, title, discount, original_price, offer_price, rating, ratings_count } = value
  return (
    <Link to={'/product-details/'+id} className="w-full border border-gray-400 rounded-lg shadow-md p-4 bg-white">
      {/* Product Image */}
      <img
        src={img}
        alt="Product"
        className="mx-auto w-full object-cover rounded-md"
      />

      {/* Product Info */}
      <div className="mt-3">
        <p className="text-sm line-clamp-2 md:line-clamp-2 text-gray-700">
          {title}
        </p>

        {/* Discount Section */}
        <div className="flex items-center gap-2 mt-2">
          <p className="text-green-600 font-semibold">{discount}</p>
          <span className="text-gray-400 line-through">{original_price}</span>
        </div>

        {/* Price + Rating */}
        <div className="flex items-center flex-wrap gap-3 mt-1">
          <p className="text-lg font-bold text-black">{offer_price}</p>
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
            {rating}
          </span>
          <p className="text-sm text-gray-500">{ratings_count} Ratings</p>
        </div>

        {/* Deal Info */}
        <p className="text-red-600 text-sm mt-2">Limited time deal</p>

        {/* Buy Button */}
        <button className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded mt-3">
          BUY NOW
        </button>

        {/* Delivery Info */}
        <p className="text-center text-sm text-gray-600 mt-2">
          Free Delivery in Two Days
        </p>
      </div>
    </Link>
  );
};

export default ProductCards;
