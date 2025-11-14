import React, { useState } from 'react';
import { useGetBooksQuery } from '../../../features/apiSlice';
import { useNavigate } from 'react-router-dom';

export const BooksListAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { data: books = [], isLoading } = useGetBooksQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false); //  برای تشخیص اینکه سرچ شده یا نه

  if (isLoading) return <p>در حال بارگذاری...</p>;

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
        className="flex items-center mb-6 border border-gray-300 rounded-lg overflow-hidden shadow-sm"
      >
        <input
          type="text"
          placeholder="جستجو بر اساس نام کتاب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-4 py-2 outline-none text-gray-800"
        />
        <button
          type="submit"
          className="bg-amber-600 text-white px-4 py-2 hover:bg-amber-700 transition"
        >
          🔍
        </button>
      </form>

      {/* لیست کتاب‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {booksToShow.length === 0 ? (
          <p className="text-gray-600 text-center col-span-full">
            هیچ کتابی یافت نشد 😔
          </p>
        ) : (
          booksToShow.map(book => (
            <div
              key={book.id}
              onClick={() => navigate(`/books/admin/${book.id}`)}
              className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={book.photo}
                alt={book.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h3 className="font-bold text-lg">{book.title}</h3>
              <p>نویسنده: {book.author}</p>
              <p>سال: {book.year}</p>
              <p>قیمت: {book.price}</p>
              {book.stock === 0 ? (
                <p className="text-red-600 mt-2 font-semibold">عدم موجودی ⨉</p>
              ) : (
                <button
                  className="bg-amber-600 text-white mt-3 px-4 py-2 rounded hover:bg-amber-700"
                >
                  افزودن به سبد
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
