import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function ResetPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reset-password');
    };

    return (
        <>
            <Head title="إعادة تعيين كلمة المرور" />
            <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans" dir="rtl">
                <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-outline-variant/30 p-6 sm:p-8 md:p-10">
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-3">
                            <span className="material-symbols-outlined text-[28px]">lock_reset</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">نظام بر</div>
                        <h1 className="text-lg sm:text-xl font-bold text-on-surface">تغيير كلمة المرور</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-on-surface mb-1.5" htmlFor="email">البريد الإلكتروني</label>
                            <input 
                                className="w-full bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary border border-outline-variant/60 rounded-xl px-3.5 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface transition-all outline-none text-left font-mono" 
                                dir="ltr" 
                                id="email" 
                                type="email"
                                required
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)}
                            />
                            {errors.email && <span className="text-error text-xs block mt-1">{errors.email}</span>}
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-on-surface mb-1.5" htmlFor="password">كلمة المرور الجديدة</label>
                            <input 
                                className="w-full bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary border border-outline-variant/60 rounded-xl px-3.5 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface transition-all outline-none text-left" 
                                dir="ltr" 
                                id="password" 
                                type="password"
                                required
                                value={data.password} 
                                onChange={e => setData('password', e.target.value)}
                            />
                            {errors.password && <span className="text-error text-xs block mt-1">{errors.password}</span>}
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-on-surface mb-1.5" htmlFor="password_confirmation">تأكيد كلمة المرور</label>
                            <input 
                                className="w-full bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary border border-outline-variant/60 rounded-xl px-3.5 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface transition-all outline-none text-left" 
                                dir="ltr" 
                                id="password_confirmation" 
                                type="password"
                                required
                                value={data.password_confirmation} 
                                onChange={e => setData('password_confirmation', e.target.value)}
                            />
                        </div>

                        <div className="pt-2">
                            <button 
                                className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-sm text-sm sm:text-base font-bold text-on-primary bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-50 active:scale-[0.99]" 
                                type="submit"
                                disabled={processing}
                            >
                                حفظ كلمة المرور الجديدة
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
