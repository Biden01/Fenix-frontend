import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';
import Fenix_logo from "/src/assets/fenix_logo.png";

const registerSchema = z.object({
    full_name: z.string().min(3, 'Минимум 3 символа'),
    email: z.string().email('Неверный email'),
    phone: z.string().regex(/^\+7\d{10}$/, 'Формат: +77071234567'),
    sponsor_id: z.string().min(5, 'Введите ID спонсора'),
    city: z.string().min(2, 'Введите город'),
    password: z.string().min(8, 'Минимум 8 символов'),
    password_confirmation: z.string(),
    partnership_type: z.enum(['leader', 'client']),
    agree_terms: z.boolean().refine(val => val === true, 'Необходимо согласие'),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Пароли не совпадают",
    path: ["password_confirmation"],
});

export const RegisterPage = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore(state => state.setAuth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            partnership_type: 'client'
        }
    });

    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            setAuth(data.user, data.token);
            localStorage.setItem('token', data.token);
            navigate('/cabinet');
        },
        onError: (error) => {
            alert(error.response?.data?.error?.message || 'Ошибка регистрации');
        },
    });

    const onSubmit = (data) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-2xl w-full space-y-8">
                <div className="text-center">
                    <img src={Fenix_logo} alt="Fenix" className="mx-auto h-16" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Регистрация
                    </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                ФИО <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('full_name')}
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Иванов Иван Иванович"
                            />
                            {errors.full_name && (
                                <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="email@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Телефон <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('phone')}
                                type="tel"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="+77071234567"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                ID Спонсора <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('sponsor_id')}
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="ID спонсора"
                            />
                            {errors.sponsor_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.sponsor_id.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Город <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('city')}
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Алматы"
                            />
                            {errors.city && (
                                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Пароль <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('password')}
                                type="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Подтверждение пароля <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('password_confirmation')}
                                type="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation.message}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Тип партнерства <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        {...register('partnership_type')}
                                        type="radio"
                                        value="leader"
                                        className="mr-2"
                                    />
                                    Лидер
                                </label>
                                <label className="flex items-center">
                                    <input
                                        {...register('partnership_type')}
                                        type="radio"
                                        value="client"
                                        className="mr-2"
                                    />
                                    Клиент
                                </label>
                            </div>
                            {errors.partnership_type && (
                                <p className="mt-1 text-sm text-red-600">{errors.partnership_type.message}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="flex items-center">
                                <input
                                    {...register('agree_terms')}
                                    type="checkbox"
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-700">
                  Я согласен с <Link to="/terms" className="text-green-600 hover:underline">правилами сайта</Link>
                </span>
                            </label>
                            {errors.agree_terms && (
                                <p className="mt-1 text-sm text-red-600">{errors.agree_terms.message}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                    >
                        {registerMutation.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>

                    <div className="text-center">
                        <span className="text-sm text-gray-600">Уже есть аккаунт? </span>
                        <Link to="/login" className="text-sm text-green-600 hover:text-green-500">
                            Войти
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
