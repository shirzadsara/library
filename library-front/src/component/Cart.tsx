import React from 'react';
import { useGetUserOrdersQuery, useUpdateOrderMutation, useDeleteOrderMutation } from '../features/apiSlice';

export const Cart: React.FC = () => {
    // گرفتن سفارش‌های کاربر
    const { data: orders = [], isLoading } = useGetUserOrdersQuery();
    const [updateOrder] = useUpdateOrderMutation();
    const [deleteOrder] = useDeleteOrderMutation();

    if (isLoading) return <p>در حال بارگذاری سبد خرید...</p>;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };
    // جمع کل سبد
    const totalPrice = orders.reduce((sum, o) => sum + (o.book?.price || 0) * o.quantity, 0);

    const handleIncrease = async (orderId: number, quantity: number) => {
        await updateOrder({ id: orderId, quantity: quantity + 1 });
    };

    const handleDecrease = async (orderId: number, quantity: number) => {
        if (quantity > 1) {
            await updateOrder({ id: orderId, quantity: quantity - 1 });
        } else {
            await deleteOrder(orderId);
        }
    };

    if (orders.length === 0) return <p className="text-center mt-10 text-gray-600">سبد خرید شما خالی است 😔</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 ">
            <h2 className="text-2xl text-amber-900 font-bold mb-6">🛒 سبد خرید شما</h2>
            <div className='border-3 border-amber-800 rounded-2xl p-2'>
                <ul className="space-y-4">
                    {orders.map(order => (
                        <li key={order.id} className="flex items-center justify-between p-2 border-b ">
                            <div>

                                <p className="font-semibold">{order.book?.title}</p>
                                <p className="text-gray-500">قیمت: {formatPrice(order.book?.price)} تومان</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleDecrease(order.id, order.quantity)}
                                    className={`px-2 rounded ${order.quantity === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}
                                    disabled={order.quantity === 0}
                                >
                                    -
                                </button>
                                <span className="w-6 text-center">{formatPrice(order.quantity)}</span>
                                <button
                                    onClick={() => handleIncrease(order.id, order.quantity)}
                                    className="px-2  rounded bg-amber-700 text-white hover:bg-amber-600"
                                >
                                    +
                                </button>
                            </div>
                            <div className="font-semibold">
                                {formatPrice((order.book?.price || 0) * order.quantity)}  تومان
                            </div>

                        </li>
                    ))}
                </ul>
                <div className="mt-6 flex justify-between items-center p-4  font-bold text-lg">
                    <span>جمع کل:</span>
                    <span>{formatPrice(totalPrice)} تومان</span>
                </div>
            </div>

            <button
                //onClick
                className=" block w-50 mt-6 mx-auto  bg-amber-800 text-white font-bold py-1 rounded  hover:bg-amber-600 transition"
            >
                ثبت سفارش
            </button>
        </div>
    );
};
