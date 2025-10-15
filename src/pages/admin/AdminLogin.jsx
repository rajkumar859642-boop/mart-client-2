import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Dummy credentials (for demonstration only; replace with secure backend authentication)
  const DUMMY_CREDENTIALS = {
    username: "chal",
    password: "nikal123",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sanitize inputs to prevent injection attacks
    const sanitizedEmail = email.trim().replace(/[<>{}]/g, "");
    const sanitizedPassword = password.trim().replace(/[<>{}]/g, "");

    // Check credentials against dummy values
    if (
      sanitizedEmail === DUMMY_CREDENTIALS.username &&
      sanitizedPassword === DUMMY_CREDENTIALS.password
    ) {
      // Store username and password in localStorage
      localStorage.setItem(
        "authData",
        JSON.stringify({
          username: sanitizedEmail,
          password: sanitizedPassword,
        })
      );
      console.log("Login successful:", {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });
      setError("");

      // Redirect to orders
      navigate("/orders");
    } else {
      setError("Invalid username or password");
      console.log("Login failed:", {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          Admin Login
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email/Username Field */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email or Username
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or username"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors duration-200 text-base"
              required
              maxLength={20} // Restrict to 20 characters
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors duration-200 text-base"
              required
              maxLength={10} // Restrict to 10 characters
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
