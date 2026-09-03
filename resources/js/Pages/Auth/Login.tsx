import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="تسجيل الدخول" />
            <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans" dir="rtl">
                <div className="w-full max-w-5xl bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-surface-variant/60">
                    {/* Left Side: Image / Branding */}
                    <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[600px] hidden md:block">
                        <div 
                            className="absolute inset-0 bg-cover bg-center w-full h-full" 
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600')" }}
                        ></div>
                        <div className="absolute inset-0 bg-primary/85 mix-blend-multiply"></div>
                        <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between text-on-primary z-10">
                            <div>
                                <div className="text-2xl font-bold tracking-tight">نظام بر</div>
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold leading-tight">تمكين العطاء</h2>
                                <p className="text-base opacity-90 leading-relaxed">منصة متكاملة لإدارة الحالات الاجتماعية وتقديم المساعدات بكفاءة وموثوقية.</p>
                            </div>
                        </div>
                    </div>
                    {/* Right Side: Login Form */}
                    <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-white">
                        {/* Mobile Logo */}
                        <div className="md:hidden text-center mb-6">
                            <div className="text-2xl font-bold text-primary">نظام بر</div>
                        </div>
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface mb-2">تسجيل الدخول</h1>
                            <p className="text-sm sm:text-base text-on-surface-variant">أهلاً بك مجدداً، يرجى إدخال بياناتك للمتابعة.</p>
                        </div>
                        
                        {errors.email && (
                            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-sm font-medium border border-error/20">
                                {errors.email}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            {/* Email Field */}
                            <div>
                                <label className="block font-medium text-sm text-on-surface mb-2" htmlFor="email">
                                    البريد الإلكتروني
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none text-xl">
                                        mail
                                    </span>
                                    <input 
                                        className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary border border-outline-variant/70 rounded-xl pl-4 pr-11 py-3 text-base text-on-surface transition-all outline-none text-left shadow-sm" 
                                        dir="ltr" 
                                        id="email" 
                                        type="email"
                                        placeholder="name@example.com" 
                                        required
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            {/* Password Field */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block font-medium text-sm text-on-surface" htmlFor="password">
                                        كلمة المرور
                                    </label>
                                    <Link className="text-xs sm:text-sm font-medium text-primary hover:text-primary-container transition-colors" href="/forgot-password">
                                        نسيت كلمة المرور؟
                                    </Link>
                                </div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none text-xl">
                                        lock
                                    </span>
                                    <input 
                                        className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary border border-outline-variant/70 rounded-xl pl-4 pr-11 py-3 text-base text-on-surface transition-all outline-none text-left shadow-sm" 
                                        dir="ltr" 
                                        id="password" 
                                        type="password"
                                        placeholder="••••••••" 
                                        required
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                    />
                                </div>
                                {errors.password && (
                                    <span className="text-error text-xs block mt-1.5">{errors.password}</span>
                                )}
                            </div>
                            
                            {/* Remember Me */}
                            <div className="flex items-center gap-2.5 py-1">
                                <input 
                                    className="h-4 sm:h-5 w-4 sm:w-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container cursor-pointer accent-primary" 
                                    id="remember-me" 
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                />
                                <label className="font-medium text-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember-me">
                                    تذكرني
                                </label>
                            </div>
                            
                            {/* Submit Button */}
                            <div className="pt-2">
                                <button 
                                    className="w-full flex justify-center items-center py-3.5 px-6 border border-transparent rounded-xl shadow-md font-medium text-base text-on-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 active:scale-[0.99] disabled:opacity-50 cursor-pointer" 
                                    type="submit"
                                    disabled={processing}
                                >
                                    تسجيل الدخول
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
