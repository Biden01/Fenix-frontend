import { apiClient } from '../config/api';

export const authApi = {
    register: async (data) => {
        const response = await apiClient.post('/auth/register', data);
        return response.data;
    },

    login: async (credentials) => {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
    },

    logout: async () => {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    },

    forgotPassword: async (email) => {
        const response = await apiClient.post('/auth/forgot-password', { email });
        return response.data;
    },
};
