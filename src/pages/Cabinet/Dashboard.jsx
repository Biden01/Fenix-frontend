import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../config/api';
import { useAuthStore } from '../../store/authStore';
import { Wallet, Users, ShoppingBag, TrendingUp, LogOut, User, Settings, Mail, Phone, MapPin, Award } from 'lucide-react';

export const CabinetDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const response = await apiClient.get('/cabinet/dashboard');
            return response.data.data;
        },
    });

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
            </div>
        );
    }

    const { user, balances, statistics } = data;

    // Partnership type labels
    const partnershipLabels = {
        'leader': 'Лидер',
        'partner': 'Партнёр',
        'client': 'Клиент',
        'vip': 'VIP Партнёр'
    };

    return (
        <div className="space-y-6">
            {/* Profile Header Card */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        {/* Avatar */}
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        
                        {/* User Info */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">{user.full_name}</h1>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                    ID: {user.id}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    user.status === 'active' 
                                        ? 'bg-green-400/30 text-green-100' 
                                        : 'bg-red-400/30 text-red-100'
                                }`}>
                                    {user.status === 'active' ? '● Активен' : '○ Неактивен'}
                                </span>
                            </div>
                            <div className="flex items-center mt-2 text-green-100">
                                <Award className="w-4 h-4 mr-1" />
                                <span className="text-sm">{partnershipLabels[user.partnership_type] || user.partnership_type}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => navigate('/cabinet/settings')}
                            className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition backdrop-blur-sm"
                        >
                            <Settings className="w-5 h-5 mr-2" />
                            Настройки
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Выйти
                        </button>
                    </div>
                </div>
                
                {/* User Contact Info */}
                <div className="mt-6 pt-4 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-green-100">
                        <Mail className="w-4 h-4 mr-2" />
                        {user.email || 'Не указан'}
                    </div>
                    <div className="flex items-center text-green-100">
                        <Phone className="w-4 h-4 mr-2" />
                        {user.phone || 'Не указан'}
                    </div>
                    <div className="flex items-center text-green-100">
                        <MapPin className="w-4 h-4 mr-2" />
                        {user.city || 'Не указан'}
                    </div>
                </div>
            </div>

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