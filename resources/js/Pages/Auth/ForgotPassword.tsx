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
            <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md md:p-margin-desktop font-sans" dir="rtl">
                <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-lg md:p-xl border border-surface-variant bg-white">
                    <div className="text-center mb-xl">
                        <div className="font-headline-lg text-headline-lg font-bold text-primary mb-sm">نظام بر</div>
                        <h1 className="font-headline-md text-headline-md text-on-surface">استعادة كلمة المرور</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-sm">أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.</p>
                    </div>

                    {wasSuccessful && (
                        <div className="mb-4 p-sm bg-emerald-50 text-emerald-800 rounded-lg text-sm text-center">
                            تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-lg">
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
                            {errors.email && (
                                <span className="text-error text-xs block mt-1">{errors.email}</span>
                            )}
                        </div>

                        <div>
                            <button 
                                className="w-full flex justify-center py-sm px-md border border-transparent rounded-lg shadow-sm font-label-lg text-label-lg text-on-primary bg-primary hover:bg-on-primary-fixed-variant focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-50" 
                                type="submit"
                                disabled={processing}
                            >
                                إرسال رابط الاستعادة
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-lg">
                        <Link href="/login" className="font-label-sm text-label-sm text-primary hover:underline">العودة لتسجيل الدخول</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
