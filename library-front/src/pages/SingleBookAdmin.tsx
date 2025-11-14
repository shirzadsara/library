import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookById2Query, useDeleteBookMutation } from '../features/apiSlice';


export const SingleBookAdmin: React.FC=() => {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);
  const navigate = useNavigate();

  const { data: book, isLoading } = useGetBookById2Query(bookId);
  const [deleteBook] = useDeleteBookMutation();

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (!book) return <p>کتاب پیدا نشد ❌</p>;

  const handleDelete = async () => {
    if (window.confirm('آیا از حذف این کتاب مطمئنی؟')) {
      try {
        await deleteBook(bookId).unwrap();
        alert('کتاب حذف شد ✅');
        navigate('/admin/dashboard'); // برگشت به داشبورد ادمین
      } catch (err) {
        console.error(err);
        alert('خطا در حذف کتاب ❌');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/admin/books/edit/${bookId}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <img src={book.photo} alt={book.title} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold text-amber-900 mb-2">{book.title}</h2>
      <p className="text-gray-700 mb-1">نویسنده: {book.author}</p>
      <p className="text-gray-700 mb-1">💰 قیمت: {book.price} تومان</p>
      <p className={`font-semibold ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {book.stock > 0 ? `عدد موجودی: ${book.stock}` : '⨉ عدم موجودی'}
      </p>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={handleEdit}
            className="bg-amber-400 text-white px-4 py-2 rounded hover:bg-amber-500"
          >
            ✏️ ویرایش
          </button>
          <button
            onClick={handleDelete}
            className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
          >
            🗑 حذف
          </button>
             <button
           onClick={() => navigate('/admin/dashboard')}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          >
            برگشت
          </button>
        </div>
    </div>
  );
};
