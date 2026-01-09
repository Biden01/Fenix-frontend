import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../config/api';
import { Wallet, Users, ShoppingBag, TrendingUp } from 'lucide-react';

export const CabinetDashboard = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const response = await apiClient.get('/cabinet/dashboard');
            return response.data.data;
        },
    });

    if (isLoading) return <div>Загрузка...</div>;

    const { user, balances, statistics } = data;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Добро пожаловать, {user.full_name}!</h1>

            {/* Балансы */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Основной баланс</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {balances.main_balance.toLocaleString()} ₸
                            </p>
                        </div>
                        <Wallet className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Бонусный баланс</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {balances.bonus_balance.toLocaleString()} б
                            </p>
                        </div>
                        <TrendingUp className="w-12 h-12 text-yellow-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Заморожено</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {balances.frozen_balance.toLocaleString()} ₸
                            </p>
                        </div>
                        <Wallet className="w-12 h-12 text-blue-600" />
                    </div>
                </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center space-x-3">
                        <ShoppingBag className="w-10 h-10 text-green-600" />
                        <div>
                            <p className="text-sm text-gray-600">Заказов</p>
                            <p className="text-xl font-bold">{statistics.total_orders}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center space-x-3">
                        <Users className="w-10 h-10 text-blue-600" />
                        <div>
                            <p className="text-sm text-gray-600">Рефералов</p>
                            <p className="text-xl font-bold">{statistics.active_referrals}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center space-x-3">
                        <Users className="w-10 h-10 text-purple-600" />
                        <div>
                            <p className="text-sm text-gray-600">Команда</p>
                            <p className="text-xl font-bold">{statistics.team_size}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center space-x-3">
                        <TrendingUp className="w-10 h-10 text-green-600" />
                        <div>
                            <p className="text-sm text-gray-600">Заработано</p>
                            <p className="text-xl font-bold">{statistics.total_earnings.toLocaleString()} ₸</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};