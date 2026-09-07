import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface FinancialProps {
    stats: {
        total_assistance: number;
        monthly_assistance: number;
        total_cases: number;
    };
}

export default function Financial({ stats }: FinancialProps) {
    const avgAssistance = stats.total_cases > 0 ? Math.round(stats.total_assistance / stats.total_cases) : 0;

    return (
        <Layout title="لوحة التحكم - الإحصاءات المالية">
            <Head title="الإحصاءات المالية" />
            
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">الإحصاءات المالية</h1>
                <p className="text-sm sm:text-base text-on-surface-variant mt-1">نظرة عامة على المساعدات المالية والعينية المصروفة للأسر المستفيدة.</p>
            </div>

            {/* Quick Links / Dashboard Tabs */}
            <div className="flex gap-2 mb-6 border-b border-outline-variant/30 pb-2 overflow-x-auto scrollbar-none">
                <Link href={route('dashboard')} className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface whitespace-nowrap transition-colors shrink-0">
                    الملخص العام
                </Link>
                <Link href={route('dashboard.social')} className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface whitespace-nowrap transition-colors shrink-0">
                    الإحصاءات الاجتماعية
                </Link>
                <Link href={route('dashboard.financial')} className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-primary text-on-primary font-bold whitespace-nowrap shadow-xs shrink-0">
                    الإحصاءات المالية
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {/* Metric 1 */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 shadow-xs text-center">
                    <span className="material-symbols-outlined text-[36px] text-primary">account_balance_wallet</span>
                    <h3 className="text-xs sm:text-sm text-on-surface-variant mt-2">إجمالي المساعدات المنصرفة</h3>
                    <p className="text-xl sm:text-2xl font-bold text-on-surface mt-1">{stats.total_assistance.toLocaleString('ar-SA')} جنيه مصري</p>
                </div>
                {/* Metric 2 */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 shadow-xs text-center">
                    <span className="material-symbols-outlined text-[36px] text-primary-fixed-dim">calendar_today</span>
                    <h3 className="text-xs sm:text-sm text-on-surface-variant mt-2">مصروفات الشهر الحالي</h3>
                    <p className="text-xl sm:text-2xl font-bold text-on-surface mt-1">{stats.monthly_assistance.toLocaleString('ar-SA')} جنيه مصري</p>
                </div>
                {/* Metric 3 */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 shadow-xs text-center">
                    <span className="material-symbols-outlined text-[36px] text-secondary">trending_up</span>
                    <h3 className="text-xs sm:text-sm text-on-surface-variant mt-2">متوسط الدعم لكل حالة</h3>
                    <p className="text-xl sm:text-2xl font-bold text-on-surface mt-1">{avgAssistance.toLocaleString('ar-SA')} جنيه مصري</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 shadow-xs mb-8 w-full min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-on-surface mb-4">البيانات المالية للمساعدات</h3>
                <div className="border border-outline-variant/20 rounded-xl overflow-hidden w-full min-w-0">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-right text-xs sm:text-sm min-w-[500px]">
                            <thead className="bg-surface-container-low text-on-surface font-semibold border-b border-outline-variant/20">
                                <tr>
                                    <th className="p-3 sm:p-4">البند المالي</th>
                                    <th className="p-3 sm:p-4">القيمة المنصرفة</th>
                                    <th className="p-3 sm:p-4">النسبة من الدعم الإجمالي</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/20">
                                <tr>
                                    <td className="p-3 sm:p-4 font-medium">مساعدات الشهر الجاري</td>
                                    <td className="p-3 sm:p-4 text-primary font-bold">{stats.monthly_assistance.toLocaleString('ar-SA')} جنيه مصري</td>
                                    <td className="p-3 sm:p-4">{stats.total_assistance > 0 ? Math.round((stats.monthly_assistance / stats.total_assistance) * 100) : 0}%</td>
                                </tr>
                                <tr>
                                    <td className="p-3 sm:p-4 font-medium">مساعدات متفرقة وأخرى</td>
                                    <td className="p-3 sm:p-4 text-primary font-bold">{(stats.total_assistance - stats.monthly_assistance).toLocaleString('ar-SA')} جنيه مصري</td>
                                    <td className="p-3 sm:p-4">{stats.total_assistance > 0 ? Math.round(((stats.total_assistance - stats.monthly_assistance) / stats.total_assistance) * 100) : 0}%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
