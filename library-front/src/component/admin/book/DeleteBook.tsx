import React from 'react';
import { useDeleteBookMutation } from '../../../features/apiSlice';

interface DeleteBookButtonProps {
  bookId: number;
}

export const DeleteBook: React.FC<DeleteBookButtonProps> = ({ bookId }) => {
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async () => {
    if (!confirm('آیا از حذف این کتاب مطمئن هستید؟')) return;
    try {
      await deleteBook(bookId).unwrap();
      alert('کتاب با موفقیت حذف شد 🗑️');
    } catch (err) {
      alert('خطا در حذف کتاب ❌');
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
    >
      حذف
    </button>
  );
};
