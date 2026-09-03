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
            
            <div className="mb-8">
                <h1 className="text-display-md font-display-md text-on-surface">الإحصاءات المالية</h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">نظرة عامة على المساعدات المالية والعينية المصروفة للأسر المستفيدة.</p>
            </div>

            {/* Quick Links / Dashboard Tabs */}
            <div className="flex gap-sm mb-lg border-b border-outline-variant/30 pb-sm overflow-x-auto">
                <Link href={route('dashboard')} className="px-lg py-sm font-label-lg rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface whitespace-nowrap transition-colors">
                    الملخص العام
                </Link>
                <Link href={route('dashboard.social')} className="px-lg py-sm font-label-lg rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface whitespace-nowrap transition-colors">
                    الإحصاءات الاجتماعية
                </Link>
                <Link href={route('dashboard.financial')} className="px-lg py-sm font-label-lg rounded-full bg-primary text-on-primary font-bold whitespace-nowrap">
                    الإحصاءات المالية
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
                {/* Metric 1 */}
                <div className="bg-white rounded-xl p-lg border border-outline-variant/30 shadow-sm text-center">
                    <span className="material-symbols-outlined text-[40px] text-primary">account_balance_wallet</span>
                    <h3 className="text-body-md text-on-surface-variant mt-sm">إجمالي المساعدات المنصرفة</h3>
                    <p className="text-display-md font-display-md text-on-surface mt-xs">{stats.total_assistance.toLocaleString('ar-SA')} جنيه مصري</p>
                </div>
                {/* Metric 2 */}
                <div className="bg-white rounded-xl p-lg border border-outline-variant/30 shadow-sm text-center">
                    <span className="material-symbols-outlined text-[40px] text-primary-fixed-dim">calendar_today</span>
                    <h3 className="text-body-md text-on-surface-variant mt-sm">مصروفات الشهر الحالي</h3>
                    <p className="text-display-md font-display-md text-on-surface mt-xs">{stats.monthly_assistance.toLocaleString('ar-SA')} جنيه مصري</p>
                </div>
                {/* Metric 3 */}
                <div className="bg-white rounded-xl p-lg border border-outline-variant/30 shadow-sm text-center">
                    <span className="material-symbols-outlined text-[40px] text-secondary">trending_up</span>
                    <h3 className="text-body-md text-on-surface-variant mt-sm">متوسط الدعم لكل حالة</h3>
                    <p className="text-display-md font-display-md text-on-surface mt-xs">{avgAssistance.toLocaleString('ar-SA')} جنيه مصري</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-lg border border-outline-variant/30 shadow-sm mb-xl">
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-6">البيانات المالية للمساعدات</h3>
                <div className="border border-outline-variant/20 rounded-lg overflow-hidden">
                    <table className="w-full text-right text-body-md">
                        <thead className="bg-surface-container-low text-on-surface font-semibold border-b border-outline-variant/20">
                            <tr>
                                <th className="p-md">البند المالي</th>
                                <th className="p-md">القيمة المنصرفة</th>
                                <th className="p-md">النسبة من الدعم الإجمالي</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                            <tr>
                                <td className="p-md font-medium">مساعدات الشهر الجاري</td>
                                <td className="p-md text-primary font-bold">{stats.monthly_assistance.toLocaleString('ar-SA')} جنيه مصري</td>
                                <td className="p-md">{stats.total_assistance > 0 ? Math.round((stats.monthly_assistance / stats.total_assistance) * 100) : 0}%</td>
                            </tr>
                            <tr>
                                <td className="p-md font-medium">مساعدات متفرقة وأخرى</td>
                                <td className="p-md text-primary font-bold">{(stats.total_assistance - stats.monthly_assistance).toLocaleString('ar-SA')} جنيه مصري</td>
                                <td className="p-md">{stats.total_assistance > 0 ? Math.round(((stats.total_assistance - stats.monthly_assistance) / stats.total_assistance) * 100) : 0}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
