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
            <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md md:p-margin-desktop font-sans" dir="rtl">
                <div className="w-full max-w-5xl bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row border border-surface-variant">
                    {/* Left Side: Image / Branding */}
                    <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[600px] hidden md:block">
                        <div 
                            className="absolute inset-0 bg-cover bg-center w-full h-full" 
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600')" }}
                        ></div>
                        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
                        <div className="absolute inset-0 p-lg flex flex-col justify-between text-on-primary">
                            <div>
                                <div className="font-headline-lg text-headline-lg font-bold">نظام بر</div>
                            </div>
                            <div>
                                <h2 className="font-display-md text-display-md mb-sm">تمكين العطاء</h2>
                                <p className="font-body-lg text-body-lg opacity-90">منصة متكاملة لإدارة الحالات الاجتماعية وتقديم المساعدات بكفاءة وموثوقية.</p>
                            </div>
                        </div>
                    </div>
                    {/* Right Side: Login Form */}
                    <div className="w-full md:w-1/2 p-lg md:p-xl flex flex-col justify-center bg-white">
                        {/* Mobile Logo */}
                        <div className="md:hidden text-center mb-xl">
                            <div className="font-headline-lg text-headline-lg font-bold text-primary">نظام بر</div>
                        </div>
                        <div className="mb-xl">
                            <h1 className="font-headline-lg text-headline-lg mb-xs text-on-surface">تسجيل الدخول</h1>
                            <p className="font-body-md text-body-md text-on-surface-variant">أهلاً بك مجدداً، يرجى إدخال بياناتك للمتابعة.</p>
                        </div>
                        
                        {errors.email && (
                            <div className="mb-4 p-sm bg-error-container text-on-error-container rounded-lg text-sm font-medium">
                                {errors.email}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-lg">
                            {/* Email Field */}
                            <div>
                                <label className="block font-label-lg text-label-lg text-on-surface mb-xs" htmlFor="email">البريد الإلكتروني</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">mail</span>
                                    <input 
                                        className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary border border-outline-variant rounded-lg pl-sm pr-10 py-sm font-body-md text-body-md text-on-surface transition-colors outline-none text-left" 
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
                                <div className="flex items-center justify-between mb-xs">
                                    <label className="block font-label-lg text-label-lg text-on-surface" htmlFor="password">كلمة المرور</label>
                                    <Link className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors" href="/forgot-password">نسيت كلمة المرور؟</Link>
                                </div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">lock</span>
                                    <input 
                                        className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary border border-outline-variant rounded-lg pl-sm pr-10 py-sm font-body-md text-body-md text-on-surface transition-colors outline-none text-left" 
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
                                    <span className="text-error text-xs block mt-1">{errors.password}</span>
                                )}
                            </div>
                            
                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input 
                                    className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container" 
                                    id="remember-me" 
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                />
                                <label className="mr-sm font-body-md text-body-md text-on-surface-variant cursor-pointer select-none" htmlFor="remember-me">
                                    تذكرني
                                </label>
                            </div>
                            
                            {/* Submit Button */}
                            <div>
                                <button 
                                    className="w-full flex justify-center py-sm px-md border border-transparent rounded-lg shadow-sm font-label-lg text-label-lg text-on-primary bg-primary hover:bg-on-primary-fixed-variant focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 active:scale-[0.98] disabled:opacity-50" 
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
