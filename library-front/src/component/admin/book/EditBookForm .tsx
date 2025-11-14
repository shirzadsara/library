import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery, useUpdateBookMutation } from '../../../features/apiSlice';

export const EditBookForm = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);
  const { data: book, isLoading } = useGetBookByIdQuery(bookId);
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [stock, setStock] = useState<number | string>('');
  const [photo, setPhoto] = useState('');

  //  وقتی داده از سرور اومد، استیت‌ها رو پر کن
  useEffect(() => {
    if (book) {
      setTitle(book.title || '');
      setAuthor(book.author || '');
      setPrice(book.price || '');
      setStock(book.stock || '');
      setPhoto(book.photo || '');
    }
  }, [book]);

  if (isLoading) return <p>در حال بارگذاری...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({
        id: bookId,
        title,
        author,
        price: Number(price),
        stock: Number(stock),
        photo,
      }).unwrap();

      alert('کتاب با موفقیت ویرایش شد ✅');
      navigate(`/books/admin/${bookId}`);
    } catch (err) {
      console.error(err);
      alert('خطا در ویرایش کتاب ❌');
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-amber-900 mb-4">ویرایش کتاب 📖</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="عنوان کتاب"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="نویسنده"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="قیمت"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="تعداد موجودی"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="آدرس عکس"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700 w-full"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
};
