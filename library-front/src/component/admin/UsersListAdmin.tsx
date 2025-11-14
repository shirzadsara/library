import React, { useState } from 'react';
import { useGetUsersQuery, useRegisterAdminMutation } from '../../features/apiSlice';

export const UsersListAdmin: React.FC = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [registerAdmin] = useRegisterAdminMutation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerAdmin({ adminData: { name, email, password,role }, token: 'TOKEN_HERE' }).unwrap();
      alert('ادمین جدید ساخته شد ✅');
      setEmail(''); setName(''); setPassword('');
    } catch (err) {
      console.error(err);
      alert('خطا در ایجاد ادمین ❌');
    }
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;

  return (
    <div>
      <h2 className="text-xl text-amber-900 font-bold mb-2">لیست کاربران</h2>
      <ul className="mb-4">
        {users?.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.role}
          </li>
        ))}
      </ul>

      <h2 className="text-xl text-amber-900 font-bold mb-2">ایجاد ادمین جدید</h2>
      <form onSubmit={handleAdminSubmit} className="flex flex-col gap-2 max-w-sm">
        <input type="text" placeholder="نام" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded" />
        <input type="email" placeholder="ایمیل" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded" />
        <input type="password" placeholder="رمز عبور" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 rounded" />
         <input type="text" placeholder="نقش" value={role} onChange={e => setRole(e.target.value)} className="border p-2 rounded" />
        <button type="submit" className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800">
          ایجاد ادمین
        </button>
      </form>
    </div>
  );
};
