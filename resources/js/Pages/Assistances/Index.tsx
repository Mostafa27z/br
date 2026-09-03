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

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">سجل المساعدات الاجتماعية</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">عرض وتتبع جميع المساعدات المالية والعينية المسجلة للحالات.</p>
                </div>
                <Link 
                    href={route('assistances.create')} 
                    className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <span className="material-symbols-outlined">add</span>
                    تسجيل مساعدة جديدة
                </Link>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-xl p-lg border border-outline-variant/30 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-md">
                <div className="md:col-span-2">
                    <label className="block font-label-sm text-on-surface-variant mb-2">بحث بالوصف أو اسم الحالة</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                        <input 
                            className="w-full pr-10 pl-4 py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                            placeholder="اكتب اسم المستفيد أو وصف المساعدة..."
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-label-sm text-on-surface-variant mb-2">نوع المساعدة</label>
                    <select 
                        className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
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
            <div className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low text-on-surface font-label-lg border-b border-outline-variant/30">
                                <th className="p-md">التاريخ</th>
                                <th className="p-md">اسم الحالة المستفيدة</th>
                                <th className="p-md">نوع المساعدة</th>
                                <th className="p-md">الوصف والتفاصيل</th>
                                <th className="p-md">القيمة المالية الكلية</th>
                                <th className="p-md">الباحث المسجّل</th>
                                <th className="p-md text-center">العمليات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20 text-body-md">
                            {assistances.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-lg text-center text-outline">لا توجد سجلات مساعدات حالية تطابق البحث.</td>
                                </tr>
                            ) : (
                                assistances.data.map(item => (
                                    <tr key={item.id} className="hover:bg-surface-container-lowest transition-colors">
                                        <td className="p-md font-mono text-on-surface-variant">{item.date}</td>
                                        <td className="p-md font-semibold">
                                            <Link href={route('cases.show', item.social_case.id)} className="hover:text-primary transition-colors">
                                                {item.social_case.name}
                                            </Link>
                                        </td>
                                        <td className="p-md">
                                            <span className={`px-sm py-xs rounded-full font-bold text-xs ${item.type === 'financial' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-blue-800'}`}>
                                                {item.type === 'financial' ? 'مالية' : 'عينية'}
                                            </span>
                                        </td>
                                        <td className="p-md text-on-surface-variant">{item.description}</td>
                                        <td className="p-md font-bold text-primary">{item.amount.toLocaleString('ar-SA')} جنيه مصري</td>
                                        <td className="p-md text-on-surface-variant">{item.employee.name}</td>
                                        <td className="p-md text-center">
                                            <Link 
                                                href={route('assistances.show', item.id)} 
                                                className="p-sm text-primary hover:bg-surface-container rounded-full transition-colors inline-block"
                                                title="عرض التفاصيل"
                                            >
                                                <span className="material-symbols-outlined">visibility</span>
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
                    <div className="p-md bg-surface-container-low border-t border-outline-variant/20 flex justify-center gap-sm">
                        {assistances.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-md py-sm rounded-lg text-sm transition-all ${
                                    link.active 
                                    ? 'bg-primary text-on-primary font-bold' 
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
