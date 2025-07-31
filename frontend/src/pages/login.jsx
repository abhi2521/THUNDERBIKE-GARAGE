import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState(''); // changed from username to email
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (res.data.message === '✅ Login successful') {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Login failed';
      setError(msg);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#10182B] bg-opacity-60 z-50">
      <div className="bg-white rounded-md w-[90%] max-w-md shadow-lg relative overflow-hidden">

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl font-semibold text-gray-500"
          onClick={() => navigate('/')}
        >
          &times;
        </button>

        <div className="px-8 pt-10 pb-6">
          <h2 className="text-3xl font-semibold text-center mb-1 text-gray-800">Log In</h2>
          <p className="text-center text-sm text-gray-500 mb-6">Become a part of our community!</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                id="email"
                placeholder="e.g: abhishek250404abhi@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-b-2 border-gray-400 focus:border-sky-500 transition outline-none p-2"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b-2 border-gray-400 focus:border-sky-500 transition outline-none p-2"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember" className="text-sm text-gray-600 pl-1.5">Remember Me</label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#12AFF1]  text-white font-semibold py-3 transition"
            >
              LOGIN
            </button>
          </form>
          <br />

          <p className="text-xs text-center text-gray-500 mt-1">
            <a href="#">Forgot your password? </a>
            <a href="#" className="text-blue-500">Get help</a>
          </p>
        </div>

        <div className="border-t mt-4 border-b border-b-gray-500">
          <div className="bg-[#f7f7f7] py-4 px-8 flex justify-center items-center gap-4">
            <p className="text-sm text-gray-600 mb-0">Not a member?</p>
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 border hover:bg-gray-100 transition font-medium"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-8 bg-green-500 text-white px-6 py-2 rounded shadow-lg transition">
          Login successful! Redirecting to home...
        </div>
      )}
    </div>
  );
};

export default Login;
