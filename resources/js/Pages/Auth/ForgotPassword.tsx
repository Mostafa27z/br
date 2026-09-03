import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';

export default function ForgotPassword() {
    const { data, setData, post, processing, errors, wasSuccessful } = useForm({
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <>
            <Head title="استعادة كلمة المرور" />
            <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans" dir="rtl">
                <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-surface-variant/60 bg-white">
                    <div className="text-center mb-8">
                        <div className="text-2xl font-bold text-primary mb-2">نظام بر</div>
                        <h1 className="text-xl sm:text-2xl font-bold text-on-surface">استعادة كلمة المرور</h1>
                        <p className="text-sm text-on-surface-variant mt-2">أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.</p>
                    </div>

                    {wasSuccessful && (
                        <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 rounded-xl text-sm text-center border border-emerald-200 font-medium">
                            تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <label className="block font-medium text-sm text-on-surface mb-2" htmlFor="email">البريد الإلكتروني</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none text-xl">mail</span>
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
                            {errors.email && (
                                <span className="text-error text-xs block mt-1.5">{errors.email}</span>
                            )}
                        </div>

                        <div className="pt-2">
                            <button 
                                className="w-full flex justify-center items-center py-3.5 px-6 border border-transparent rounded-xl shadow-md font-medium text-base text-on-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 cursor-pointer disabled:opacity-50" 
                                type="submit"
                                disabled={processing}
                            >
                                إرسال رابط الاستعادة
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6 pt-4 border-t border-surface-variant/40">
                        <Link href="/login" className="text-sm font-medium text-primary hover:underline">العودة لتسجيل الدخول</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
