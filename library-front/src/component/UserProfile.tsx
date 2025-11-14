import React from 'react';
import { useGetProfileQuery } from '../features/apiSlice';

export const UserProfile: React.FC = () => {
  const { data: user, isLoading, error } = useGetProfileQuery();

  if (isLoading) return <p>در حال بارگذاری مشخصات...</p>;
  if (error) return <p>خطا در دریافت مشخصات کاربر</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">مشخصات کاربر</h2>
      <div className="border p-4 rounded shadow space-y-2">
         <p><strong>نام:</strong> {user?.name}</p>
        <p><strong>ایمیل:</strong> {user?.email}</p>
        <p><strong>نقش:</strong> {user?.role}</p>
        
      
      </div>
    </div>
  );
};
