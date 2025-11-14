import React, { useState } from 'react';
import { AddBookForm } from './AddBookForm';
import {BooksListAdmin} from './BooksListAdmin';


export const BookManager:React.FC = () => {
  const [view, setView] = useState<'list' | 'add'>('list');


  return (
    <div className="p-6 text-right">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">مدیریت کتاب‌ها 📚</h2>

      {/* دکمه‌های تغییر حالت */}
      <div className="flex gap-4 mb-6 justify-end">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded ${view === 'list' ? 'bg-amber-800 text-white' : 'bg-gray-200'}`}
        >
          لیست کتاب‌ها
        </button>
        <button
          onClick={() => setView('add')}
          className={`px-4 py-2 rounded ${view === 'add' ? 'bg-amber-800 text-white' : 'bg-gray-200'}`}
        >
          افزودن کتاب جدید
        </button>
      </div>

      {/* نمایش محتوا بر اساس حالت */}
      {view === 'list' && (
        <BooksListAdmin/>
     
      )}

      {view === 'add' && <AddBookForm/>}

     
    </div>
  );
};
