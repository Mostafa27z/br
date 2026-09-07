import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface Assistance {
    id: number;
    type: 'financial' | 'non_financial';
    description: string;
    amount: number;
    date: string;
    social_case: { id: number; name: string };
    employee: { name: string };
}

interface IndexProps {
    assistances: {
        data: Assistance[];
        links: { url: string | null; label: string; active: boolean }[];
        last_page: number;
    };
    filters: {
        type?: string;
        search?: string;
    };
}

export default function Index({ assistances, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');

    const handleFilterChange = () => {
        router.get(route('assistances.index'), { search, type }, {
            preserveState: true,
            replace: true,
        });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleFilterChange();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, type]);

    return (
        <Layout title="سجل المساعدات المصروفة">
            <Head title="سجل المساعدات" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">سجل المساعدات الاجتماعية</h1>
                    <p className="text-sm sm:text-base text-on-surface-variant mt-1">عرض وتتبع جميع المساعدات المالية والعينية المسجلة للحالات.</p>
                </div>
                <Link 
                    href={route('assistances.create')} 
                    className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary font-medium text-sm sm:text-base px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs shrink-0"
                >
                    <span className="material-symbols-outlined text-xl">add</span>
                    <span>تسجيل مساعدة جديدة</span>
                </Link>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 shadow-xs mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">بحث بالوصف أو اسم الحالة</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
                        <input 
                            className="w-full pr-9 pl-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="اكتب اسم المستفيد أو وصف المساعدة..."
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">نوع المساعدة</label>
                    <select 
                        className="w-full px-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <option value="">الكل</option>
                        <option value="financial">مساعدة مالية</option>
                        <option value="non_financial">مساعدة عينية</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs w-full min-w-0">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-right border-collapse min-w-[650px]">
                        <thead>
                            <tr className="bg-surface-container-low text-on-surface text-xs sm:text-sm font-bold border-b border-outline-variant/30">
                                <th className="p-3 sm:p-4">التاريخ</th>
                                <th className="p-3 sm:p-4">اسم الحالة المستفيدة</th>
                                <th className="p-3 sm:p-4">نوع المساعدة</th>
                                <th className="p-3 sm:p-4">الوصف والتفاصيل</th>
                                <th className="p-3 sm:p-4">القيمة المالية الكلية</th>
                                <th className="p-3 sm:p-4">الباحث المسجّل</th>
                                <th className="p-3 sm:p-4 text-center">العمليات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20 text-xs sm:text-sm">
                            {assistances.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-6 text-center text-outline">لا توجد سجلات مساعدات حالية تطابق البحث.</td>
                                </tr>
                            ) : (
                                assistances.data.map(item => (
                                    <tr key={item.id} className="hover:bg-surface-container-lowest transition-colors">
                                        <td className="p-3 sm:p-4 font-mono text-on-surface-variant">{item.date}</td>
                                        <td className="p-3 sm:p-4 font-bold text-on-surface">
                                            <Link href={route('cases.show', item.social_case.id)} className="hover:text-primary transition-colors">
                                                {item.social_case.name}
                                            </Link>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${item.type === 'financial' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-blue-800'}`}>
                                                {item.type === 'financial' ? 'مالية' : 'عينية'}
                                            </span>
                                        </td>
                                        <td className="p-3 sm:p-4 text-on-surface-variant">{item.description}</td>
                                        <td className="p-3 sm:p-4 font-bold text-primary">{item.amount.toLocaleString('ar-SA')} جنيه مصري</td>
                                        <td className="p-3 sm:p-4 text-on-surface-variant">{item.employee.name}</td>
                                        <td className="p-3 sm:p-4 text-center">
                                            <Link 
                                                href={route('assistances.show', item.id)} 
                                                className="p-1.5 text-primary hover:bg-surface-container rounded-lg transition-colors inline-block"
                                                title="عرض التفاصيل"
                                            >
                                                <span className="material-symbols-outlined text-lg">visibility</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {assistances.last_page > 1 && (
                    <div className="p-3 sm:p-4 bg-surface-container-low/50 border-t border-outline-variant/20 flex flex-wrap justify-center gap-1.5 sm:gap-2">
                        {assistances.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all ${
                                    link.active 
                                    ? 'bg-primary text-on-primary font-bold shadow-xs' 
                                    : 'bg-white hover:bg-surface-container border border-outline-variant/30 text-on-surface'
                                } ${!link.url ? 'opacity-40 cursor-default' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
