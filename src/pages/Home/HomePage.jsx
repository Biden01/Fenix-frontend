import React from 'react';
import { Link } from 'react-router-dom';
import fenix_slider1 from '/src/assets/Home/fenix_slider3.jpg';
import fenix_slider2 from '/src/assets/Home/fenix_slider1.jpeg';
import fenix_slider3 from '/src/assets/Home/hero-carousel-1.jpg';
import { ChevronRight, CheckCircle2, BookmarkCheck, CreditCard, Coins, Play } from 'lucide-react';

export const HomePage = () => {
    const [activeSlide, setActiveSlide] = React.useState(0);

    const slides = [
        {
            image: fenix_slider1,
            title: 'Добро пожаловать в Fenix International',
            description: 'Здоровье и успех залог счастливого будущего',
            buttonText: 'Присоединиться',
            buttonLink: '/register'
        },
        {
            image: fenix_slider2,
            title: 'Наша линейка продукции',
            description: 'Открой для себя мир натуральных и органических продуктов, созданных для твоего здоровья и успеха!',
            buttonText: 'Посмотреть',
            buttonLink: '/shop'
        },
        {
            image: fenix_slider3,
            title: 'Добро пожаловать',
            description: 'Вступи в мир возможностей и здоровья, где твои успехи растут вместе с природной силой продуктов',
            buttonText: 'Войти',
            buttonLink: '/login'
        }
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Carousel Section */}
            <section className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-green-600 to-emerald-600 overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === activeSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>

                        {/* Content */}
                        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
                            <div className="max-w-4xl animate-fade-in">
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                                    {slide.description}
                                </p>
                                <Link
                                    to={slide.buttonLink}
                                    className="inline-block px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-xl"
                                >
                                    {slide.buttonText}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                index === activeSlide ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>

                {/* Arrow Controls */}
                <button
                    onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition z-10"
                >
                    <ChevronRight className="w-6 h-6 rotate-180" />
                </button>
                <button
                    onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition z-10"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">О компании</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Наша миссия - создать условие для всех людей жить здоровую и финансово свободную жизнь
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Video/Image */}
                        <div className="relative">
                            <div className="aspect-video bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <a
                                        href="/src/assets/Home/reel.mp4"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition transform"
                                    >
                                        <Play className="w-8 h-8 text-green-600 ml-1" fill="currentColor" href={"/src/assets/Home/reel.mp4"} />
                                    </a>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                Исламов Мурат Хасанович
                            </h3>
                            <p className="text-lg text-gray-600 italic mb-6">Основатель компании</p>

                            <ul className="space-y-4">
                                {[
                                    'Уроженец г. Шымкент',
                                    'Лидерские способности: умеет вдохновлять команду и вести за собой',
                                    'Креативность: генерирует новые идеи и нестандартные решения',
                                    'Стратегическое мышление: видит перспективы развития бизнеса',
                                    'Создание и развитие компании с нуля'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marketing Section */}
            <section id="marketing" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Бонусная программа</h2>
                        <p className="text-xl text-gray-600">Узнайте больше о наших преимуществах</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: <BookmarkCheck className="w-12 h-12" />,
                                title: 'АКТИВАЦИЙ НЕТ',
                                color: 'from-blue-500 to-blue-600'
                            },
                            {
                                icon: <CreditCard className="w-12 h-12" />,
                                title: 'СТАТУС ПОДТВЕРЖДАТЬ НЕ НАДО',
                                color: 'from-purple-500 to-purple-600'
                            },
                            {
                                icon: <Coins className="w-12 h-12" />,
                                title: 'БАЛЛЫ НЕ СГОРАЮТ',
                                color: 'from-green-500 to-green-600'
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="relative group"
                            >
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center border-2 border-transparent hover:border-green-500">
                                    <div className={`inline-flex p-4 bg-gradient-to-br ${item.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900">
                                        {item.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-white text-center md:text-left">
                            <h3 className="text-3xl md:text-4xl font-bold mb-3">
                                Приобретайте наши продукции
                            </h3>
                            <p className="text-xl opacity-90">
                                Улучшайте свое здоровье вместе с нами
                            </p>
                        </div>
                        <Link
                            to="/register"
                            className="px-8 py-4 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-xl whitespace-nowrap"
                        >
                            Зарегистрируйся
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};