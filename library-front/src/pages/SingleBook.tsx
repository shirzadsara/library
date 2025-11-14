import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery} from '../features/apiSlice';


export const SingleBook: React.FC=() => {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);
  const navigate = useNavigate();

  const { data: book, isLoading } = useGetBookByIdQuery(bookId);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (!book) return <p>کتاب پیدا نشد ❌</p>;


  return (

    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <img src={book.photo} alt={book.title} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold text-amber-900 mb-2">{book.title}</h2>
      <p className="text-gray-700 mb-1">نویسنده: {book.author}</p>
      <p className="text-gray-700 mb-1">💰 قیمت: {book.price} تومان</p>
        <div className="flex space-x-2 mt-4">
            {book.stock === 0 ? (
                <p className="text-red-600 mt-2 font-semibold">عدم موجودی ⨉</p>
              ) : (
                <button
                  className="bg-amber-600 text-white mt-3 px-4 py-2 rounded hover:bg-amber-700"
                >
                  افزودن به سبد
                </button>
              )}
        
             <button
           onClick={() => navigate('/user/dashboard')}
            className="text-amber-600  px-4 py-2 rounded hover:bg-amber-100"
          >
            ↩
          </button>
          </div>
    </div>
  );
};
