import { apiClient } from '../config/api';

export const cartApi = {
    addToCart: async (productId, quantity) => {
        const response = await apiClient.post('/shop/cart/add', {
            product_id: productId,
            quantity
        });
        return response.data;
    },

    getCart: async () => {
        const response = await apiClient.get('/shop/cart');
        return response.data;
    },

    checkout: async (orderData) => {
        const response = await apiClient.post('/shop/checkout', orderData);
        return response.data;
    },
};