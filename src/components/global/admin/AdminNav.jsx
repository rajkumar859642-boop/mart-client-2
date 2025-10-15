// src/components/global/admin/AdminNav.jsx
import { NavLink, useNavigate } from 'react-router-dom';

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/adsmin');
  };

  return (
    <nav className="flex fixed top-0 left-0 right-0 z-20 bg-white justify-between p-4 sm:p-5 items-center md:px-20 shadow">
      <div className="flex space-x-4 sm:space-x-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? 'text-green-600 font-semibold text-sm sm:text-base'
              : 'text-gray-800 hover:text-green-600 font-medium text-sm sm:text-base'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? 'text-green-600 font-semibold text-sm sm:text-base'
              : 'text-gray-800 hover:text-green-600 font-medium text-sm sm:text-base'
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? 'text-green-600 font-semibold text-sm sm:text-base'
              : 'text-gray-800 hover:text-green-600 font-medium text-sm sm:text-base'
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? 'text-green-600 font-semibold text-sm sm:text-base'
              : 'text-gray-800 hover:text-green-600 font-medium text-sm sm:text-base'
          }
        >
          Users
        </NavLink>
      </div>
      <button
        onClick={handleLogout}
        className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base"
      >
        Log Out
      </button>
    </nav>
  );
};

export default AdminNav;