// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../features/apiSlice';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // unwrap() باعث میشه مستقیم response.body گرفته بشه
      const response = await loginUser({ email, password }).unwrap();

      alert(response.message);

      // بررسی نقش کاربر و هدایت به مسیر مناسب
      if (response.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }

    } catch (err) {
      alert('ایمیل یا رمز عبور اشتباه ❌');
      console.error(err);
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* تصویر کل پس‌زمینه */}
      <img
        src="/images/login-image.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* لایه تار سمت راست */}
      <div className="absolute bg-black/40 backdrop-blur-sm
                      md:top-0 md:right-0 md:w-1/2 md:h-full
                      top-0 left-0 w-full h-1/2 " />

      {/* فرم لاگین */}
      <div className="absolute md:top-0 md:right-0 md:w-1/2 md:h-full
                      top-0 left-0 w-full h-1/2 flex items-center justify-center">
        <div className="w-96 p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30">
          <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center drop-shadow-sm">
            ورود به حساب کاربری
          </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">ایمیل</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-amber-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">رمز عبور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-amber-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-900 text-white py-2 rounded hover:bg-amber-800 transition-colors"
          >
            {isLoading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};
