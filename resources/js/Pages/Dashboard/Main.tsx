import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface MainProps {
    stats: {
        total_cases: number;
        active_cases: number;
        accepted_cases: number;
        new_cases: number;
        total_assistance: number;
        monthly_assistance: number;
        by_governorate: Record<string, number>;
        by_marital_status: Record<string, number>;
        medical_cases: number;
        total_family_members: number;
        avg_family_size: number;
    };
}

export default function Main({ stats }: MainProps) {
    return (
        <Layout title="لوحة التحكم - نظرة عامة">
            <Head title="لوحة التحكم" />
            
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">نظرة عامة</h1>
                <p className="text-sm sm:text-base text-on-surface-variant mt-1">مرحباً بك، إليك ملخص نشاط النظام اليوم.</p>
            </div>

            {/* Quick Links / Dashboard Tabs */}
            <div className="flex gap-2 mb-6 border-b border-outline-variant/30 pb-2 overflow-x-auto scrollbar-none">
                <Link href={route('dashboard')} className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-primary text-on-primary font-bold whitespace-nowrap shadow-xs shrink-0">
                    الملخص العام
                </Link>
                <Link href={route('dashboard.social')} className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface whitespace-nowrap transition-colors shrink-0">
                    الإحصاءات الاجتماعية
                </Link>
                <Link href={route('dashboard.financial')} className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface whitespace-nowrap transition-colors shrink-0">
                    الإحصاءات المالية
                </Link>
            </div>

            {/* Bento Grid Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {/* Stat 1 */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 flex flex-col justify-between hover:shadow-sm transition-shadow shadow-xs">
                    <div className="flex justify-between items-start mb-3">
                        <div className="p-2.5 bg-surface-container-highest rounded-xl text-primary">
                            <span className="material-symbols-outlined text-[24px]">folder_shared</span>
                        </div>
                        <span className="text-xs bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-full font-bold">الحالات</span>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-on-surface-variant">إجمالي الحالات المسجلة</p>
                        <h3 className="text-2xl sm:text-3xl font-bold text-on-surface mt-1">{stats.total_cases}</h3>
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 flex flex-col justify-between hover:shadow-sm transition-shadow shadow-xs border-r-4 border-r-primary">
                    <div className="flex justify-between items-start mb-3">
                        <div className="p-2.5 bg-primary-container text-on-primary-container rounded-xl">
                            <span className="material-symbols-outlined text-[24px]">verified</span>
                        </div>
                        <span className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">تحت الدراسة</span>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-on-surface-variant">الحالات النشطة</p>
                        <h3 className="text-2xl sm:text-3xl font-bold text-on-surface mt-1">{stats.active_cases}</h3>
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 flex flex-col justify-between hover:shadow-sm transition-shadow shadow-xs">
                    <div className="flex justify-between items-start mb-3">
                        <div className="p-2.5 bg-secondary-container text-on-secondary-container rounded-xl">
                            <span className="material-symbols-outlined text-[24px]">payments</span>
                        </div>
                        <span className="text-xs bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full font-bold">هذا الشهر</span>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-on-surface-variant">قيمة مساعدات الشهر</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-on-surface mt-1">{stats.monthly_assistance.toLocaleString('ar-SA')} جنيه مصري</h3>
                    </div>
                </div>

                {/* Stat 4 */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 flex flex-col justify-between hover:shadow-sm transition-shadow shadow-xs">
                    <div className="flex justify-between items-start mb-3">
                        <div className="p-2.5 bg-surface-variant text-on-surface-variant rounded-xl">
                            <span className="material-symbols-outlined text-[24px]">family_restroom</span>
                        </div>
                        <span className="text-xs bg-purple-50 text-purple-800 px-2.5 py-0.5 rounded-full font-bold">متوسط</span>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-on-surface-variant">معدل حجم الأسرة</p>
                        <h3 className="text-2xl sm:text-3xl font-bold text-on-surface mt-1">{stats.avg_family_size} أفراد</h3>
                    </div>
                </div>
            </div>

            {/* Charts & Graphs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-xl">
                {/* SVG Visual Bar Chart for Assistances */}
                <div className="lg:col-span-2 bg-white rounded-xl p-lg border border-outline-variant/30 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-headline-sm font-headline-sm text-on-surface">مستويات الدعم والمساعدات الكلية</h3>
                        <Link href={route('assistances.index')} className="text-primary hover:underline text-label-lg font-bold">عرض التفاصيل</Link>
                    </div>
                    <div className="w-full h-64 flex items-end justify-between px-md pt-lg relative border-b border-outline-variant/20">
                        {/* Static Representation of monthly support scaling based on actual data */}
                        <div className="flex flex-col items-center gap-xs w-full">
                            <div className="w-12 bg-primary rounded-t-lg transition-all hover:opacity-95" style={{ height: '140px' }}></div>
                            <span className="text-label-sm text-on-surface-variant mt-sm">إجمالي المنصرف العام</span>
                            <span className="text-xs font-bold text-primary">{(stats.total_assistance).toLocaleString('ar-SA')} جنيه مصري</span>
                        </div>
                        <div className="flex flex-col items-center gap-xs w-full">
                            <div className="w-12 bg-primary-fixed-dim rounded-t-lg transition-all hover:opacity-95" style={{ height: `${Math.min(140, Math.max(20, (stats.monthly_assistance / Math.max(1, stats.total_assistance)) * 140))}px` }}></div>
                            <span className="text-label-sm text-on-surface-variant mt-sm">المنصرف شهرياً</span>
                            <span className="text-xs font-bold text-primary">{(stats.monthly_assistance).toLocaleString('ar-SA')} جنيه مصري</span>
                        </div>
                    </div>
                </div>

                {/* Governorate distribution */}
                <div className="lg:col-span-1 bg-white rounded-xl p-lg border border-outline-variant/30 shadow-sm flex flex-col">
                    <h3 className="text-headline-sm font-headline-sm text-on-surface mb-6">توزيع الحالات حسب المنطقة</h3>
                    <div className="flex-1 flex flex-col gap-md justify-center">
                        {Object.entries(stats.by_governorate).length === 0 ? (
                            <p className="text-center text-outline py-lg">لا توجد حالات حالياً</p>
                        ) : (
                            Object.entries(stats.by_governorate).map(([gov, count], idx) => {
                                const percentage = stats.total_cases > 0 ? round((count / stats.total_cases) * 100) : 0;
                                return (
                                    <div key={gov} className="flex flex-col gap-xs">
                                        <div className="flex justify-between items-center text-label-lg">
                                            <span className="font-medium text-on-surface">{gov}</span>
                                            <span className="font-bold text-primary">{count} حالة ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-primary-fixed-dim' : 'bg-secondary'}`} 
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function round(val: number) {
    return Math.round(val * 10) / 10;
}
