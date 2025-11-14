import React, { useState } from 'react';
import { useRegisterUserMutation } from '../features/apiSlice';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, email, password };

    try {
      await registerUser(userData).unwrap();
      alert('ثبت‌نام با موفقیت انجام شد ✅');
      navigate('/auth/login');
    } catch (err) {
      alert('خطا در ثبت‌نام ❌');
      console.error(err);
    }
  };

  return (
     <div
      className="h-screen w-full bg-cover bg-center relative flex items-center justify-center bg-[url('/images/registery-image.webp')]"
    >
      {/* تاریک و تار کردن بک‌گراند */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl p-10 rounded-2xl w-80 md:w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-black/70 drop-shadow-lg">ثبت‌نام کاربر</h2>

          <input
            type="text"
            placeholder="نام"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 bg-white/50 text-black border border-amber-900 rounded-lg px-3 py-2 focus:outline-none"
            required
          />

          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 bg-white/50 text-black border border-amber-900 rounded-lg px-3 py-2 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-5 bg-white/50 text-black border border-amber-900 rounded-lg px-3 py-2 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-amber-950 text-white py-2 rounded-lg hover:bg-amber-800 transition"
          >
            ثبت‌نام
          </button>
        </form>
      </div>
  );
};
