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
            <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md md:p-margin-desktop font-sans" dir="rtl">
                <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-lg md:p-xl border border-surface-variant bg-white">
                    <div className="text-center mb-xl">
                        <div className="font-headline-lg text-headline-lg font-bold text-primary mb-sm">نظام بر</div>
                        <h1 className="font-headline-md text-headline-md text-on-surface">تغيير كلمة المرور</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-lg">
                        <div>
                            <label className="block font-label-lg text-label-lg text-on-surface mb-xs" htmlFor="email">البريد الإلكتروني</label>
                            <input 
                                className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary border border-outline-variant rounded-lg px-sm py-sm font-body-md text-body-md text-on-surface transition-colors outline-none text-left" 
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
                            <label className="block font-label-lg text-label-lg text-on-surface mb-xs" htmlFor="password">كلمة المرور الجديدة</label>
                            <input 
                                className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary border border-outline-variant rounded-lg px-sm py-sm font-body-md text-body-md text-on-surface transition-colors outline-none text-left" 
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
                            <label className="block font-label-lg text-label-lg text-on-surface mb-xs" htmlFor="password_confirmation">تأكيد كلمة المرور</label>
                            <input 
                                className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary border border-outline-variant rounded-lg px-sm py-sm font-body-md text-body-md text-on-surface transition-colors outline-none text-left" 
                                dir="ltr" 
                                id="password_confirmation" 
                                type="password"
                                required
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                            />
                        </div>

                        <div>
                            <button 
                                className="w-full flex justify-center py-sm px-md border border-transparent rounded-lg shadow-sm font-label-lg text-label-lg text-on-primary bg-primary hover:bg-on-primary-fixed-variant focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-50" 
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
