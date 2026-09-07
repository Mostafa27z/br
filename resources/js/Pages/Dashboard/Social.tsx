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
            
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">الإحصاءات الاجتماعية</h1>
                <p className="text-sm sm:text-base text-on-surface-variant mt-1">نظرة تفصيلية على التركيبة السكانية والاجتماعية للحالات المسجلة.</p>
            </div>

            {/* Quick Links / Dashboard Tabs */}
            <div className="flex gap-2 mb-6 border-b border-outline-variant/30 pb-2 overflow-x-auto scrollbar-none">
                <Link href={route('dashboard')} className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface whitespace-nowrap transition-colors shrink-0">
                    الملخص العام
                </Link>
                <Link href={route('dashboard.social')} className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-primary text-on-primary font-bold whitespace-nowrap shadow-xs shrink-0">
                    الإحصاءات الاجتماعية
                </Link>
                <Link href={route('dashboard.financial')} className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface whitespace-nowrap transition-colors shrink-0">
                    الإحصاءات المالية
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {/* Marital Status Distribution Card */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 shadow-xs">
                    <h3 className="text-base sm:text-lg font-bold text-on-surface mb-4">الحالات حسب الحالة الاجتماعية للأسر</h3>
                    <div className="space-y-4">
                        {Object.entries(stats.by_marital_status).map(([status, count], idx) => {
                            const pct = stats.total_cases > 0 ? Math.round((count / stats.total_cases) * 100) : 0;
                            return (
                                <div key={status} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center text-xs sm:text-sm">
                                        <span className="font-medium text-on-surface">{status}</span>
                                        <span className="font-bold text-primary">{count} حالة ({pct}%)</span>
                                    </div>
                                    <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden">
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
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col justify-between">
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-on-surface mb-4">المؤشرات الاجتماعية الحيوية</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="bg-surface-container-low/50 p-4 rounded-xl text-center">
                                <span className="material-symbols-outlined text-[30px] text-primary">family_restroom</span>
                                <h4 className="text-xs sm:text-sm text-on-surface-variant mt-1.5">إجمالي التابعين المسجلين</h4>
                                <p className="text-2xl font-bold text-on-surface mt-1">{stats.total_family_members}</p>
                            </div>
                            <div className="bg-surface-container-low/50 p-4 rounded-xl text-center">
                                <span className="material-symbols-outlined text-[30px] text-error">medical_services</span>
                                <h4 className="text-xs sm:text-sm text-on-surface-variant mt-1.5">حالات بحاجة لرعاية صحية</h4>
                                <p className="text-2xl font-bold text-error mt-1">{stats.medical_cases}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-outline-variant/20">
                        <div className="flex justify-between items-center text-xs sm:text-sm text-on-surface-variant">
                            <span>متوسط حجم الأسرة الواحدة:</span>
                            <span className="font-bold text-on-surface text-base sm:text-lg">{stats.avg_family_size} أفراد</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
