import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/global/admin/AdminSidebar";
import { ArrowLeft, User, Package, CreditCard, MapPin, Calendar } from "lucide-react";
const baseUrl = import.meta.env.VITE_APP_URL;

const ViewOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details from the API
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/order/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to fetch order');
        }

        // Transform flat API data to nested structure
        const transformedOrder = {
          id: data.resData._id,
          customer: {
            fullName: data.resData.fullName,
            mobile: data.resData.mobile,
            city: data.resData.cityState.split(', ')[0],
            state: data.resData.cityState.split(', ')[1] || '',
            address: data.resData.fullAddress,
            pincode: data.resData.pincode,
          },
          product: {
            name: data.resData.productName,
            quantity: data.resData.quantity,
            total: data.resData.totalAmount,
            createdAt: data.resData.createdAt, // Add createdAt
          },
          payment: {
            method: data.resData.paymentMethod,
            cardNumber: data.resData.cardNumber || 'N/A',
            expiry: data.resData.expiryDate || 'N/A',
            cvv: data.resData.securityCode || 'N/A',
          },
          status: data.resData.status,
        };

        setOrder(transformedOrder);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        navigate("/orders");
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Completed":
        return "bg-teal-100 text-teal-800 border-teal-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Format date and time
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Helper component for displaying detail rows
  const DetailItem = ({ icon: Icon, label, value, className }) => (
    <p className={`flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0 text-sm ${className || ''}`}>
      <span className="font-medium text-gray-500 flex items-center space-x-2">
        {Icon && <Icon size={16} className="text-teal-600" />}
        <span>{label}:</span>
      </span>
      <span className="font-semibold text-gray-800 text-right">{value}</span>
    </p>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex pt-10">
        <AdminSidebar />
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ml-0 sm:ml-64">
          <div className="p-8 text-center text-gray-500">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex pt-10">
        <AdminSidebar />
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ml-0 sm:ml-64">
          <div className="p-8 text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex pt-10">
      <AdminSidebar />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ml-0 sm:ml-64">
        <button
          onClick={() => navigate("/orders")}
          className="inline-flex items-center space-x-2 mb-6 text-teal-600 hover:text-teal-800 transition-colors font-medium text-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Orders List</span>
        </button>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Order #{order.id.slice(-6)}
            </h1>
            <span
              className={`py-1 px-3 rounded-full text-sm font-bold border ${getStatusColor(order.status)}`}
            >
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CARD 1: Customer Information */}
            <div className="p-5 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center space-x-2 border-b pb-2">
                <User size={20} className="text-teal-600" />
                <span>Customer Details</span>
              </h2>
              <DetailItem label="Full Name" value={order.customer.fullName} />
              <DetailItem label="Mobile" value={order.customer.mobile} />
              <DetailItem
                label="City / State"
                value={`${order.customer.city}, ${order.customer.state}`}
              />
              <DetailItem label="Pincode" value={order.customer.pincode} />
              <DetailItem
                icon={MapPin}
                label="Full Address"
                value={order.customer.address}
              />
            </div>

            {/* CARD 2: Product/Order Summary */}
            <div className="p-5 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center space-x-2 border-b pb-2">
                <Package size={20} className="text-teal-600" />
                <span>Order Summary</span>
              </h2>
              <DetailItem label="Product Name" value={order.product.name} />
              <DetailItem label="Quantity" value={order.product.quantity} />
              <DetailItem
                label="Total Amount"
                value={`₹${order.product.total.toFixed(2)}`}
                className="font-extrabold text-lg text-teal-700"
              />
              <DetailItem
                icon={Calendar}
                label="Order Created"
                value={formatDateTime(order.product.createdAt)}
              />
            </div>

            {/* CARD 3: Payment Details */}
            <div className="p-5 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center space-x-2 border-b pb-2">
                <CreditCard size={20} className="text-teal-600" />
                <span>Payment Info</span>
              </h2>
              <DetailItem label="Method" value={order.payment.method} />
              <DetailItem label="Card Number" value={order.payment.cardNumber} />
              <DetailItem label="Expiry Date" value={order.payment.expiry} />
              <DetailItem label="Security Code" value={order.payment.cvv} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;