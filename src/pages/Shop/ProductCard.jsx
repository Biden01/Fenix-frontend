import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const ProductCard = ({ product }) => {
    const addItem = useCartStore(state => state.addItem);
    const [added, setAdded] = React.useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            <Link to={`/product/${product.id}`} className="block">
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                        <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                            {product.category_id === 1 ? '🧴' :
                                product.category_id === 2 ? '🍬' :
                                    product.category_id === 3 ? '💊' : '🍫'}
                        </div>
                    </div>

                    {product.discount_percent > 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            -{product.discount_percent}%
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-4">
                {/* Rating */}
                <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating || 4) ? 'fill-current' : ''}`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews_count || 0})</span>
                </div>

                {/* Product Name */}
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 mb-2 hover:text-purple-600 transition line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                    <div>
            <span className="text-xl font-bold text-purple-600">
              {product.price.toLocaleString()} ₸
            </span>
                        {product.old_price && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                {product.old_price.toLocaleString()} ₸
              </span>
                        )}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                        added
                            ? 'bg-green-500 text-white'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                >
                    {added ? (
                        <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            Добавлено
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            В корзину
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
