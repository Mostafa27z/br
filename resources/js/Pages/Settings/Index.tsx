import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface Settings {
    org_name: string;
    support_email: string;
    support_phone: string;
    city: string;
    allow_registration: boolean;
    default_currency: string;
}

interface IndexProps {
    settings: Settings;
}

export default function Index({ settings }: IndexProps) {
    const [activeTab, setActiveTab] = useState<'general' | 'assistance_types' | 'housing_types' | 'marital_statuses'>('general');

    const { data, setData, post, processing, errors } = useForm({
        org_name: settings.org_name,
        support_email: settings.support_email,
        support_phone: settings.support_phone,
        city: settings.city,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.update'));
    };

    return (
        <Layout title="إعدادات النظام">
            <Head title="إعدادات النظام" />

            <div className="mb-6 sm:mb-8 border-b border-outline-variant/20 pb-3 sm:pb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">إعدادات النظام</h1>
                <p className="text-sm sm:text-base text-on-surface-variant mt-1 sm:mt-1.5">إدارة وتكوين المتغيرات الأساسية للنظام لتلائم احتياجات المؤسسة.</p>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Tab Navigation Sidebar (Col 1-3) */}
                <div className="lg:col-span-3 min-w-0">
                    <div className="bg-white rounded-2xl shadow-xs border border-outline-variant/30 p-2 sm:p-3 flex flex-row lg:flex-col overflow-x-auto scrollbar-none gap-2 sticky top-24">
                        <button 
                            onClick={() => setActiveTab('general')}
                            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium transition-all text-right whitespace-nowrap shrink-0 lg:w-full text-xs sm:text-sm ${
                                activeTab === 'general' 
                                ? 'bg-primary/10 text-primary font-bold shadow-xs' 
                                : 'text-on-surface-variant hover:bg-surface-container-low'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">tune</span>
                            <span>الإعدادات العامة</span>
                        </button>

                        <button 
                            onClick={() => setActiveTab('assistance_types')}
                            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium transition-all text-right whitespace-nowrap shrink-0 lg:w-full text-xs sm:text-sm ${
                                activeTab === 'assistance_types' 
                                ? 'bg-primary/10 text-primary font-bold shadow-xs' 
                                : 'text-on-surface-variant hover:bg-surface-container-low'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">volunteer_activism</span>
                            <span>أنواع المساعدات</span>
                        </button>

                        <button 
                            onClick={() => setActiveTab('housing_types')}
                            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium transition-all text-right whitespace-nowrap shrink-0 lg:w-full text-xs sm:text-sm ${
                                activeTab === 'housing_types' 
                                ? 'bg-primary/10 text-primary font-bold shadow-xs' 
                                : 'text-on-surface-variant hover:bg-surface-container-low'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">home</span>
                            <span>أنواع السكن</span>
                        </button>

                        <button 
                            onClick={() => setActiveTab('marital_statuses')}
                            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium transition-all text-right whitespace-nowrap shrink-0 lg:w-full text-xs sm:text-sm ${
                                activeTab === 'marital_statuses' 
                                ? 'bg-primary/10 text-primary font-bold shadow-xs' 
                                : 'text-on-surface-variant hover:bg-surface-container-low'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">diversity_3</span>
                            <span>الحالات الاجتماعية</span>
                        </button>
                    </div>
                </div>

                {/* Content Section (Col 1-9) */}
                <div className="lg:col-span-9 space-y-6 min-w-0">
                    {activeTab === 'general' && (
                        <div className="bg-white rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
                            <div className="bg-surface-container-low/40 border-b border-outline-variant/20 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
                                <h3 className="font-bold text-base sm:text-lg text-on-surface">معلومات المؤسسة العامة</h3>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 text-sm sm:text-base">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">اسم المؤسسة / الجمعية</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={data.org_name} 
                                            onChange={e => setData('org_name', e.target.value)}
                                            className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-bold text-on-surface text-sm sm:text-base"
                                        />
                                        {errors.org_name && <span className="text-error text-xs block mt-1">{errors.org_name}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">المدينة / المقر الرئيسي</label>
                                        <input 
                                            type="text" 
                                            value={data.city} 
                                            onChange={e => setData('city', e.target.value)}
                                            className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface text-sm sm:text-base"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">البريد الإلكتروني المعتمد</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={data.support_email} 
                                            onChange={e => setData('support_email', e.target.value)}
                                            className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-left text-sm sm:text-base font-mono"
                                            dir="ltr"
                                        />
                                        {errors.support_email && <span className="text-error text-xs block mt-1">{errors.support_email}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">رقم الهاتف / الدعم الموحد</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={data.support_phone} 
                                            onChange={e => setData('support_phone', e.target.value)}
                                            className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm sm:text-base"
                                        />
                                        {errors.support_phone && <span className="text-error text-xs block mt-1">{errors.support_phone}</span>}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full sm:w-auto bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary-container transition-all shadow-xs active:scale-[0.99] disabled:opacity-50"
                                    >
                                        حفظ التغيرات
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'assistance_types' && (
                        <div className="bg-white rounded-2xl shadow-xs border border-outline-variant/30 p-4 sm:p-6">
                            <h3 className="font-bold text-base sm:text-lg text-on-surface mb-4">أنواع المساعدات المعرفية في النظام</h3>
                            <ul className="divide-y divide-outline-variant/20 text-xs sm:text-sm">
                                <li className="py-3 flex justify-between items-center">
                                    <span className="font-medium">مساعدة مالية (نقدية)</span>
                                    <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-bold">نشط</span>
                                </li>
                                <li className="py-3 flex justify-between items-center">
                                    <span className="font-medium">مساعدة عينية (أجهزة كهربائية، أثاث)</span>
                                    <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-bold">نشط</span>
                                </li>
                                <li className="py-3 flex justify-between items-center">
                                    <span className="font-medium">دعم كسوة وسلال غذائية</span>
                                    <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-bold">نشط</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {activeTab === 'housing_types' && (
                        <div className="bg-white rounded-2xl shadow-xs border border-outline-variant/30 p-4 sm:p-6">
                            <h3 className="font-bold text-base sm:text-lg text-on-surface mb-4">أنواع السكن المعتمدة في الاستبيانات</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                                <div className="p-4 bg-surface-container-low rounded-xl font-bold text-sm sm:text-base">ملك</div>
                                <div className="p-4 bg-surface-container-low rounded-xl font-bold text-sm sm:text-base">مستأجر - شقة</div>
                                <div className="p-4 bg-surface-container-low rounded-xl font-bold text-sm sm:text-base">مستأجر - شعبي</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'marital_statuses' && (
                        <div className="bg-white rounded-2xl shadow-xs border border-outline-variant/30 p-4 sm:p-6">
                            <h3 className="font-bold text-base sm:text-lg text-on-surface mb-4">الحالات الاجتماعية المتاحة</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
                                <div className="p-4 bg-surface-container-low rounded-xl font-bold text-sm sm:text-base">متزوج</div>
                                <div className="p-4 bg-surface-container-low rounded-xl font-bold text-sm sm:text-base">أعزب</div>
                                <div className="p-4 bg-surface-container-low rounded-xl font-bold text-sm sm:text-base">أرملة</div>
                                <div className="p-4 bg-surface-container-low rounded-xl font-bold text-sm sm:text-base">مطلق</div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </Layout>
    );
}
