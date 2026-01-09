import { apiClient } from '../config/api';

export const productsApi = {
    getCategories: async () => {
        const response = await apiClient.get('/shop/categories');
        return response.data;
    },

    getProducts: async (params) => {
        const response = await apiClient.get('/shop/products', { params });
        return response.data;
    },

    getProduct: async (id) => {
        const response = await apiClient.get(`/shop/products/${id}`);
        return response.data;
    },
};
