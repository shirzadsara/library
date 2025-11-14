import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import {BookManager} from '../component/admin/book/BookManager';
import { UsersListAdmin } from '../component/admin/UsersListAdmin';
export const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState< 'users' | 'bookManager' | null>(null);

  return (
    <div >
      <Navbar />
      {/* <TestToken/> */}
      {/* <TestJwt/> */}
      <div className="max-w-6xl mx-auto p-6 ">
        <h1 className="text-3xl font-bold mb-6 text-amber-900">داشبورد ادمین</h1>

          <button
            className="px-4 py-2 bg-amber-500 text-white rounded ml-6 hover:bg-amber-600"
            onClick={() => setActiveSection('users')}
          >
            لیست کاربران / ایجاد ادمین
          </button>
   <button
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
            onClick={() => setActiveSection('bookManager')}
          >
            مدیریت کتاب
          </button>
        <div className='text-amber-900 pt-5'>
           {activeSection === 'bookManager' && <BookManager />}
          {activeSection === 'users' && <UsersListAdmin />}
          {!activeSection && <p>لطفا یک بخش را انتخاب کنید.</p>}
        </div>
      </div>
    </div>
  );
};
