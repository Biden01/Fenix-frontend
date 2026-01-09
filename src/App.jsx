import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { LoginPage } from './pages/Auth/Login';
import { RegisterPage } from './pages/Auth/Register';
import { HomePage } from './pages/Home/HomePage';
import { ShopPage } from './pages/Shop/ShopPage';
import { CartPage } from './pages/Shop/CartPage';
import { CabinetDashboard } from './pages/Cabinet/Dashboard';
import { useAuthStore } from './store/authStore';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div className="min-h-screen bg-gray-50">
                    <Header />
                    <main className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/shop" element={<ShopPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route
                                path="/cabinet/*"
                                element={
                                    <PrivateRoute>
                                        <CabinetDashboard />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;