import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';
import Fenix_logo from '../../assets/fenix_logo.png'

const loginSchema = z.object({
    user_id: z.string().min(5, 'Введите ID пользователя'),
    password: z.string().min(8, 'Минимум 8 символов'),
    remember_me: z.boolean().optional(),
});

export const LoginPage = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore(state => state.setAuth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            setAuth(data.user, data.token);
            localStorage.setItem('token', data.token);
            navigate('/cabinet');
        },
        onError: (error) => {
            alert(error.response?.data?.error?.message || 'Ошибка входа');
        },
    });

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <img src={Fenix_logo} alt="Fenix" className="mx-auto h-16" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Авторизация
                    </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                ID пользователя
                            </label>
                            <input
                                {...register('user_id')}
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                placeholder="ID123456"
                            />
                            {errors.user_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.user_id.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Пароль
                            </label>
                            <input
                                {...register('password')}
                                type="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    {...register('remember_me')}
                                    type="checkbox"
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Запомнить меня
                                </label>
                            </div>

                            <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-500">
                                Забыли пароль?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                        {loginMutation.isPending ? 'Вход...' : 'Войти'}
                    </button>

                    <div className="text-center">
                        <span className="text-sm text-gray-600">Нет аккаунта? </span>
                        <Link to="/register" className="text-sm text-green-600 hover:text-green-500">
                            Зарегистрируйтесь
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};