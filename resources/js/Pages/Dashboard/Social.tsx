import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface SocialProps {
    stats: {
        total_cases: number;
        active_cases: number;
        accepted_cases: number;
        new_cases: number;
        by_marital_status: Record<string, number>;
        medical_cases: number;
        total_family_members: number;
        avg_family_size: number;
    };
}

export default function Social({ stats }: SocialProps) {
    return (
        <Layout title="لوحة التحكم - الإحصاءات الاجتماعية">
            <Head title="الإحصاءات الاجتماعية" />
            
            <div className="mb-8">
                <h1 className="text-display-md font-display-md text-on-surface">الإحصاءات الاجتماعية</h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">نظرة تفصيلية على التركيبة السكانية والاجتماعية للحالات المسجلة.</p>
            </div>

            {/* Quick Links / Dashboard Tabs */}
            <div className="flex gap-sm mb-lg border-b border-outline-variant/30 pb-sm overflow-x-auto">
                <Link href={route('dashboard')} className="px-lg py-sm font-label-lg rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface whitespace-nowrap transition-colors">
                    الملخص العام
                </Link>
                <Link href={route('dashboard.social')} className="px-lg py-sm font-label-lg rounded-full bg-primary text-on-primary font-bold whitespace-nowrap">
                    الإحصاءات الاجتماعية
                </Link>
                <Link href={route('dashboard.financial')} className="px-lg py-sm font-label-lg rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface whitespace-nowrap transition-colors">
                    الإحصاءات المالية
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg mb-xl">
                {/* Marital Status Distribution Card */}
                <div className="bg-white rounded-xl p-lg border border-outline-variant/30 shadow-sm">
                    <h3 className="text-headline-sm font-headline-sm text-on-surface mb-6">الحالات حسب الحالة الاجتماعية للأسر</h3>
                    <div className="space-y-md">
                        {Object.entries(stats.by_marital_status).map(([status, count], idx) => {
                            const pct = stats.total_cases > 0 ? Math.round((count / stats.total_cases) * 100) : 0;
                            return (
                                <div key={status} className="flex flex-col gap-xs">
                                    <div className="flex justify-between items-center text-label-lg">
                                        <span className="font-medium text-on-surface">{status}</span>
                                        <span className="font-bold text-primary">{count} حالة ({pct}%)</span>
                                    </div>
                                    <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${idx === 0 ? 'bg-primary' : 'bg-primary-fixed-dim'}`} 
                                            style={{ width: `${pct}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Additional Demographics Card */}
                <div className="bg-white rounded-xl p-lg border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-headline-sm font-headline-sm text-on-surface mb-6">المؤشرات الاجتماعية الحيوية</h3>
                        <div className="grid grid-cols-2 gap-lg">
                            <div className="bg-surface-container-low p-md rounded-lg text-center">
                                <span className="material-symbols-outlined text-[32px] text-primary">family_restroom</span>
                                <h4 className="text-body-md text-on-surface-variant mt-sm">إجمالي التابعين المسجلين</h4>
                                <p className="text-headline-lg font-headline-lg text-on-surface mt-xs">{stats.total_family_members}</p>
                            </div>
                            <div className="bg-surface-container-low p-md rounded-lg text-center">
                                <span className="material-symbols-outlined text-[32px] text-error">medical_services</span>
                                <h4 className="text-body-md text-on-surface-variant mt-sm">حالات بحاجة لرعاية صحية</h4>
                                <p className="text-headline-lg font-headline-lg text-error mt-xs">{stats.medical_cases}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-lg pt-lg border-t border-outline-variant/20">
                        <div className="flex justify-between items-center text-body-md text-on-surface-variant">
                            <span>متوسط حجم الأسرة الواحدة:</span>
                            <span className="font-bold text-on-surface text-lg">{stats.avg_family_size} أفراد</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
