import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../api/products';
import { ProductCard } from './ProductCard';
import slider2 from '../../assets/Shop/slider-2.jpg';
import deal1 from '../../assets/Shop/deal-1.jpg';
import deal2 from '../../assets/Shop/deal-2.jpg';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Check, Truck, RefreshCw, PhoneCall } from 'lucide-react';

export const ShopPage = () => {
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: productsApi.getCategories,
    });

    const { data: products, isLoading } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => productsApi.getProducts({ category_id: selectedCategory }),
    });

    return (
        <div className="bg-gray-50">
            {/* Carousel Hero Section */}
            <section className="mb-8">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-6">
                        {/* Main Carousel */}
                        <div className="lg:col-span-8">
                            <div className="relative h-[430px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden">
                                <img
                                    src={slider2}
                                    alt="Уход за кожей"
                                    className="absolute w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/30"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                                    <div className="max-w-2xl">
                                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Уход за кожей</h1>
                                        <p className="text-lg mb-6">Нежный уход за кожей на каждый день - подарите себе роскошное блаженство</p>
                                        <button
                                            onClick={() => setSelectedCategory(1)}
                                            className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                                        >
                                            Посмотреть
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Side Offers */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="relative h-[200px] rounded-lg overflow-hidden">
                                <img src={deal1} alt="Скидки" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-pink-600/80"></div>
                                <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white">
                                    <h6 className="text-sm uppercase font-semibold mb-2">Экономьте 30%</h6>
                                    <h3 className="text-2xl font-bold mb-3">Скидки</h3>
                                    <button
                                        onClick={() => setSelectedCategory(1)}
                                        className="px-6 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                                    >
                                        Посмотреть
                                    </button>
                                </div>
                            </div>

                            <div className="relative h-[200px] rounded-lg overflow-hidden">
                                <img src={deal2} alt="Акция" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 to-red-600/80"></div>
                                <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white">
                                    <h6 className="text-sm uppercase font-semibold mb-2">Экономьте 25%</h6>
                                    <h3 className="text-2xl font-bold mb-3">Акция</h3>
                                    <button
                                        onClick={() => setSelectedCategory(16)}
                                        className="px-6 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                                    >
                                        Посмотреть
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 relative inline-block">
                        <span className="bg-white pr-4">Категории</span>
                        <div className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-200 -z-10"></div>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories?.data?.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className="flex items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition group"
                            >
                                <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-4xl">
                                        {category.id === 1 ? '🧴' :
                                            category.id === 2 ? '🍬' :
                                                category.id === 3 ? '💊' : '🍫'}
                                    </div>
                                </div>
                                <div className="ml-4 flex-1 text-left">
                                    <h6 className="font-semibold text-gray-800 group-hover:text-purple-600 transition">
                                        {category.name}
                                    </h6>
                                    <p className="text-sm text-gray-500">{category.product_count} товаров</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                            {selectedCategory
                                ? categories?.data?.find(c => c.id === selectedCategory)?.name
                                : 'Все товары'}
                        </h2>

                        {/* Search */}
                        <div className="w-full md:w-96">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Поиск товаров"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button className="absolute right-0 top-0 h-full px-4 text-purple-600 hover:text-purple-700">
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products?.data
                                ?.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                ?.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-center bg-gray-50 p-6 rounded-lg">
                            <Check className="w-12 h-12 text-purple-600 mr-4" />
                            <h5 className="font-semibold text-gray-800">Качество</h5>
                        </div>
                        <div className="flex items-center bg-gray-50 p-6 rounded-lg">
                            <Truck className="w-12 h-12 text-purple-600 mr-4" />
                            <h5 className="font-semibold text-gray-800">Доставка</h5>
                        </div>
                        <div className="flex items-center bg-gray-50 p-6 rounded-lg">
                            <RefreshCw className="w-12 h-12 text-purple-600 mr-4" />
                            <h5 className="font-semibold text-gray-800">Возврат</h5>
                        </div>
                        <div className="flex items-center bg-gray-50 p-6 rounded-lg">
                            <PhoneCall className="w-12 h-12 text-purple-600 mr-4" />
                            <h5 className="font-semibold text-gray-800">24/7 поддержка</h5>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};