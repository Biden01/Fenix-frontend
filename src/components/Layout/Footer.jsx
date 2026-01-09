import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-12">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h5 className="text-white text-lg font-semibold mb-4 uppercase">Наши контакты</h5>
                        <p className="mb-4">Fenix International</p>
                        <p className="flex items-start mb-2">
                            <MapPin className="w-5 h-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                            <span>Макатаева 127 Б, г. Алматы</span>
                        </p>
                        <p className="flex items-center mb-2">
                            <Mail className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                            <span>shop@fenixcompany.kz</span>
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="text-white text-lg font-semibold mb-4 uppercase">Полезные ссылки</h5>
                        <div className="space-y-2">
                            <Link to="/" className="block hover:text-purple-400 transition">→ Главная</Link>
                            <Link to="/shop" className="block hover:text-purple-400 transition">→ Магазин</Link>
                            <Link to="/cart" className="block hover:text-purple-400 transition">→ Корзина</Link>
                            <Link to="/contact" className="block hover:text-purple-400 transition">→ Контакты</Link>
                        </div>
                    </div>

                    {/* Account */}
                    <div>
                        <h5 className="text-white text-lg font-semibold mb-4 uppercase">Аккаунт</h5>
                        <div className="space-y-2">
                            <Link to="/login" className="block hover:text-purple-400 transition">→ Войти</Link>
                            <Link to="/register" className="block hover:text-purple-400 transition">→ Регистрация</Link>
                            <Link to="/cabinet" className="block hover:text-purple-400 transition">→ Мой кабинет</Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm mb-4 md:mb-0">
                        &copy; 2025 <span className="text-purple-500">Fenix International</span> Все права защищены
                    </p>
                    <img src="/img/cloudpayments.png" alt="CloudPayments" className="h-8" />
                </div>
            </div>
        </footer>
    );
};