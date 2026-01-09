import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const CartPage = () => {
    const navigate = useNavigate();
    const { items, updateQuantity, removeItem, clearCart, getTotal } = useCartStore();

    const total = getTotal();
    const minOrderAmount = 10000;
    const isValidForCheckout = total >= minOrderAmount;

    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Корзина пуста</h2>
                <button
                    onClick={() => navigate('/shop')}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Перейти в магазин
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
                <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm"
                >
                    Очистить корзину
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Товар
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Цена
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Количество
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Сумма
                        </th>
                        <th className="px-6 py-3"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <tr key={item.product_id}>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                    <span className="font-medium text-gray-900">{item.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-900">
                                {item.price.toLocaleString()} ₸
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                        className="p-1 rounded hover:bg-gray-100"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                        className="p-1 rounded hover:bg-gray-100"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                                {(item.price * item.quantity).toLocaleString()} ₸
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => removeItem(item.product_id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Итого:</span>
                    <span className="font-bold text-gray-900">{total.toLocaleString()} ₸</span>
                </div>

                {!isValidForCheckout && (
                    <div className="text-sm text-red-600">
                        Минимальная сумма заказа {minOrderAmount.toLocaleString()} ₸
                    </div>
                )}

                <button
                    onClick={() => navigate('/checkout')}
                    disabled={!isValidForCheckout}
                    className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Перейти к оформлению
                </button>
            </div>
        </div>
    );
};