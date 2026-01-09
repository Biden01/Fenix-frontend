import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Phone, Mail, Search, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../api/products';
import Fenix_logo from "../../assets/fenix_logo.png";

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [categoriesOpen, setCategoriesOpen] = React.useState(false);
    const { isAuthenticated, user } = useAuthStore();
    const itemsCount = useCartStore(state => state.getItemsCount());
    const location = useLocation();

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: productsApi.getCategories,
    });

    const isActive = (path) => location.pathname === path;

    // Показываем полный header только на страницах магазина
    const isShopPage = location.pathname.startsWith('/shop') || location.pathname.startsWith('/cart');

    return (
        <>
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-12 text-sm">
                        <div className="hidden md:flex items-center space-x-6">
                            <a href="mailto:info@fenicxint.com" className="flex items-center hover:text-green-200 transition">
                                <Mail className="w-4 h-4 mr-2" />
                                info@fenicxint.com
                            </a>
                            <a href="tel:+77074495649" className="flex items-center hover:text-green-200 transition">
                                <Phone className="w-4 h-4 mr-2" />
                                +7 707 449 5649
                            </a>
                        </div>
                        <div className="ml-auto flex items-center space-x-4">
                            <a href="#" className="hover:text-green-200 transition">
                                <i className="bi bi-whatsapp"></i>
                            </a>
                            <a href="#" className="hover:text-green-200 transition">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="hover:text-green-200 transition">
                                <i className="bi bi-facebook"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white shadow sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center">
                            <img src={Fenix_logo} alt="Fenix" className="h-12 md:h-16" />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            <Link
                                to="/"
                                className={`font-medium transition ${
                                    isActive('/')
                                        ? 'text-green-600'
                                        : 'text-gray-700 hover:text-green-600'
                                }`}
                            >
                                Главная
                            </Link>
                            <a
                                href="/#about"
                                className="text-gray-700 hover:text-green-600 font-medium transition"
                            >
                                О компании
                            </a>
                            <Link
                                to="/shop"
                                className={`font-medium transition ${
                                    isActive('/shop')
                                        ? 'text-green-600'
                                        : 'text-gray-700 hover:text-green-600'
                                }`}
                            >
                                Продукция
                            </Link>
                            <a
                                href="/#marketing"
                                className="text-gray-700 hover:text-green-600 font-medium transition"
                            >
                                Бонусная программа
                            </a>

                            {isAuthenticated ? (
                                <Link
                                    to="/cabinet"
                                    className="flex items-center text-gray-700 hover:text-green-600 font-medium transition"
                                >
                                    <User className="w-5 h-5 mr-2" />
                                    {user?.full_name || 'Кабинет'}
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-green-600 font-medium transition"
                                    >
                                        Войти
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition"
                                    >
                                        Регистрация
                                    </Link>
                                </>
                            )}
                        </nav>

                        {/* Cart & Mobile Menu Button */}
                        <div className="flex items-center space-x-4">
                            <Link to="/cart" className="relative">
                                <ShoppingCart className="w-6 h-6 text-gray-700" />
                                {itemsCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {itemsCount}
                  </span>
                                )}
                            </Link>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden pt-4 pb-2 border-t mt-4">
                            <div className="flex flex-col space-y-4">
                                <Link to="/" className="text-gray-700 hover:text-green-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                                    Главная
                                </Link>
                                <a href="/#about" className="text-gray-700 hover:text-green-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                                    О компании
                                </a>
                                <Link to="/shop" className="text-gray-700 hover:text-green-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                                    Продукция
                                </Link>
                                <a href="/#marketing" className="text-gray-700 hover:text-green-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                                    Бонусная программа
                                </a>
                                {isAuthenticated ? (
                                    <Link to="/cabinet" className="text-gray-700 hover:text-green-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                                        Личный кабинет
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                                            Войти
                                        </Link>
                                        <Link to="/register" className="text-green-600 hover:text-green-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
                                            Регистрация
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Shop Navigation (только на страницах магазина) */}
            {isShopPage && (
                <div className="bg-gray-900 text-white">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center">
                            {/* Categories Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                                    className="flex items-center justify-between bg-green-600 px-6 py-4 hover:bg-green-700 transition min-w-[240px]"
                                >
                  <span className="flex items-center">
                    <Menu className="w-5 h-5 mr-2" />
                    Категории
                  </span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {categoriesOpen && (
                                    <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50">
                                        {categories?.data?.map((category) => (
                                            <Link
                                                key={category.id}
                                                to={`/shop?category=${category.id}`}
                                                className="block px-6 py-3 text-gray-700 hover:bg-gray-100 transition"
                                                onClick={() => setCategoriesOpen(false)}
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Shop Navigation */}
                            <nav className="hidden md:flex ml-6 space-x-8">
                                <Link to="/shop" className="py-4 text-white hover:text-green-400 transition font-medium">
                                    Магазин
                                </Link>
                                <Link to="/cart" className="py-4 text-white hover:text-green-400 transition font-medium">
                                    Корзина
                                </Link>
                                <Link to="/contact" className="py-4 text-white hover:text-green-400 transition font-medium">
                                    Контакты
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};