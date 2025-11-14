import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/apiSlice';



export const NavbarDashboard: React.FC<{ userEmail?: string }> = ({ userEmail }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white text-black-800 px-6 py-1 flex justify-between items-center shadow-md">
      {/* لوگو */}
      <div className='flex items-center'>
         <img
              src="/images/logo.png"
              alt="logo"
              className="w-20 h-20 object-contain"
            />
                  <div
        className="text-lg text-amber-800 font-bold cursor-pointer"
        onClick={() => navigate('/user/dashboard')}
      >
      کتابخانه لوتوس
      </div>
      </div>

      {/* دکمه حساب کاربری */}
      <div className="relative">
        <button
              onClick={() => setMenuOpen(!menuOpen)}
          onBlur={() => setTimeout(() => setMenuOpen(false), 200)} //وقتی فکوس رو از دست میده
          className="flex items-center gap-2 text-amber-800 border border-amber-800 hover:text-amber-700 px-4 py-2 rounded-lg transition focus:outline-none"
        >
          <span>حساب کاربری: {userEmail || '▾'}</span>
        </button>

        {menuOpen && (
          <div className="absolute left-0 mt-2 w-40 bg-white text-amber-800 rounded-l shadow-lg overflow-hidden z-50">
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate('/register/me');
              }}
              className="block w-full text-right px-4 py-2 hover:bg-gray-100"
            >
              پروفایل
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate('/user/orders');
              }}
              className="block w-full text-right px-4 py-2 hover:bg-gray-100"
            >
              سفارشات
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="block w-full text-right px-4 py-2 text-red-600 hover:bg-red-50"
            >
              خروج
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};


