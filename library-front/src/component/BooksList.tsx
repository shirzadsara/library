import React, { useState } from 'react';
import { useGetBooksQuery,useGetProfileQuery,useGetUserOrdersQuery, useAddOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation } from '../features/apiSlice';
import { useNavigate } from 'react-router-dom';

export const BooksList: React.FC = () => {
  const navigate = useNavigate();
  const { data: books = [], isLoading } = useGetBooksQuery();
  const { data: orders = [] } = useGetUserOrdersQuery();
  const { data: user } = useGetProfileQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false); //  برای تشخیص اینکه سرچ شده یا نه
 
  const [addOrder] = useAddOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  if (isLoading) return <p>در حال بارگذاری...</p>;

 const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const handleIncrease = async (book: any) => {
    const existingOrder = orders.find(o => o.book?.id === book.id);
    try {
      if (existingOrder) {
        await updateOrder({ id: existingOrder.id, quantity: existingOrder.quantity + 1 });
      } else {
        await addOrder({ bookId: book.id,userId:user.id, quantity: 1 });
      }
    } catch (err) { console.error(err); }
  };

  const handleDecrease = async (book: any) => {
    const existingOrder = orders.find(o => o.book?.id === book.id);
    if (!existingOrder) return;
    try {
      if (existingOrder.quantity > 1) {
        await updateOrder({ id: existingOrder.id, quantity: existingOrder.quantity - 1 });
      } else {
        await deleteOrder(existingOrder.id);
      }
    } catch (err) { console.error(err); }
  };



  

  const performSearch = () => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
    setHasSearched(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  };

  //  اگر هنوز سرچ نشده باشه، کل کتاب‌ها رو نشون بده
  const booksToShow = hasSearched ? filteredBooks : books;

  return (
    <div className="max-w-5xl mx-auto">
      {/* کادر جستجو */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center mb-6 border border-amber-800 rounded-lg overflow-hidden shadow-sm"
      >
        <input
          type="text"
          placeholder="جستجو بر اساس نام کتاب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-4 py-2 outline-none  text-gray-800"
        />
        <button
          type="submit"
          className="  bg-amber-800 px-4 py-2  hover:bg-amber-700 transition"
        >
          🔍
        </button>
      </form>

      {/* لیست کتاب‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
        {booksToShow.length === 0 ? (
          <p className="text-gray-600 text-center col-span-full">
            هیچ کتابی یافت نشد 😔
          </p>
        ) : (
          booksToShow.map(book => {
            const order = orders.find(o => o.book?.id === book.id);
            return (

              <div
                key={book.id}

                className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={book.photo}
                  alt={book.title}
                  onClick={() => navigate(`/books/${book.id}`)}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                <h3 className="font-bold text-lg">{book.title}</h3>
                <p>نویسنده: {book.author}</p>
                <p>سال: {formatPrice(book.year)}</p>
                <p>قیمت: {formatPrice(book.price)}</p>
                {book.stock === 0 ? (
                  <p className="text-red-600 mt-2 font-semibold">عدم موجودی ⨉</p>
                ) : (

                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => handleDecrease(book)} className="bg-gray-200 px-3 py-1 rounded">-</button>
                    <span>{formatPrice(order?.quantity || 0)}</span>
                    <button onClick={() => handleIncrease(book)} className="bg-amber-700 text-white px-3 py-1 rounded">+</button>

                  </div>
                )}
                <button onClick={() => navigate("/user/orders")}
                  className="border border-amber-800 text-amber-800 mt-3 px-4 py-2 rounded hover:bg-amber-700"
                >
                  رفتن به سبد
                </button>
              </div>
          );
          })
        )}
      </div>
    </div>
  );
};
