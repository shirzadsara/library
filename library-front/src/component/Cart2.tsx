import React, { useState } from "react";
import { useGetUserOrdersQuery, useAddOrderMutation } from "../features/apiSlice";

// تعریف نوع کتاب
interface Book {
  id: number;
  titlle: string;
  author: string;
  photo: string;
  year: number;
  price: number;
  stock: number;
}

// نوع آیتم داخل سبد خرید
interface CartItem extends Book {
  quantity: number;
}

export  const Cart2: React.FC = () => {
  // سفارش‌های کاربر
  const { data: orders, isLoading } = useGetUserOrdersQuery();
  // mutation ایجاد سفارش
  const [addOrder] = useAddOrderMutation();
  // آیتم‌های سبد خرید
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ثبت سفارش
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    try {
      const newOrder = {
        items: cartItems.map((item) => ({
          bookId: item.id,
          quantity: item.quantity,
        })),
      };
      await addOrder(newOrder).unwrap();
      alert("سفارش شما با موفقیت ثبت شد ✅");
      setCartItems([]);
    } catch (error) {
      console.error("خطا در ثبت سفارش:", error);
      alert("خطا در ثبت سفارش");
    }
  };

  if (isLoading) return <p>در حال بارگذاری سفارش‌ها...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🛒 سبد خرید</h2>

      {/* نمایش سبد خرید */}
      {cartItems.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between border p-2 rounded">
              <span>{item.titlle}</span>
              <span>{item.quantity} عدد</span>
              <span>{item.price * item.quantity} تومان</span>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          ثبت سفارش
        </button>
      )}

      {/* نمایش سفارش‌های قبلی */}
      <h3 className="text-lg font-semibold mt-8">📦 سفارش‌های قبلی</h3>
      <ul className="mt-2">
        {orders?.map((order) => (
          <li key={order.id} className="border p-2 rounded mb-2">
            <div>تاریخ: {new Date(order.createdAt).toLocaleDateString("fa-IR")}</div>
            <div>کتاب: {order.book?.titlle || "ندارد"}</div>
            <div>تعداد: {order.quantity}</div>
            <div>وضعیت: {order.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

