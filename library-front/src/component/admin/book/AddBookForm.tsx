import React, { useState } from 'react';
import { useAddBookMutation } from '../../../features/apiSlice';

export const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [photo, setPhoto] = useState('');
  const [price, setprice] = useState<number | ''>('');
  const [stock, setstock] = useState<number | ''>('');

  const [addBook] = useAddBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !year || !photo || !price || !stock ) return;

    try {
      await addBook({ title, author, year, photo, price,stock }).unwrap();
      alert('کتاب با موفقیت اضافه شد ✅');
      setTitle(''); setAuthor(''); setYear(''); setPhoto(''); setprice(''); setstock('');
    } catch (err) {
      console.error(err);
      alert('خطا در اضافه کردن کتاب ❌');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input type="text" placeholder="عنوان" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded" />
      <input type="text" placeholder="نویسنده" value={author} onChange={e => setAuthor(e.target.value)} className="border p-2 rounded" />
      <input type="number" placeholder="سال" value={year} onChange={e => setYear(Number(e.target.value))} className="border p-2 rounded" />
      <input type="text" placeholder="آدرس عکس" value={photo} onChange={e => setPhoto(e.target.value)} className="border p-2 rounded" />
      <input type="number" placeholder="قیمت" value={price} onChange={e => setprice(Number(e.target.value))} className="border p-2 rounded" />
      <input type="number" placeholder="تعداد" value={stock} onChange={e => setstock(Number(e.target.value))} className="border p-2 rounded" />
      
      <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600">
        اضافه کردن کتاب
      </button>
    </form>
  );
};
