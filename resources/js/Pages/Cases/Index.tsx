import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface Case {
    id: number;
    name: string;
    national_id: string;
    phone: string;
    assigned_to: number | null;
    assigned_employee: { id: number; name: string } | null;
    governorate: string;
    district: string;
    status: string;
    priority: string;
    created_at: string;
}

interface IndexProps {
    cases: {
        data: Case[];
        current_page: number;
        last_page: number;
        prev_page_url: string | null;
        next_page_url: string | null;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        search?: string;
        status?: string;
        priority?: string;
        governorate?: string;
        sort?: string;
        direction?: 'asc' | 'desc';
    };
    employees: { id: number; name: string }[];
}

export default function Index({ cases, filters, employees }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [priority, setPriority] = useState(filters.priority || '');
    const [governorate, setGovernorate] = useState(filters.governorate || '');

    const handleFilterChange = () => {
        router.get(route('cases.index'), {
            search,
            status,
            priority,
            governorate,
            sort: filters.sort,
            direction: filters.direction,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleFilterChange();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, status, priority, governorate]);

    const handleSort = (field: string) => {
        const direction = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(route('cases.index'), {
            ...filters,
            sort: field,
            direction,
        });
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'جديد': return 'bg-blue-50 text-blue-800';
            case 'تحت الدراسة': return 'bg-amber-50 text-amber-800 border border-amber-200';
            case 'مقبول': return 'bg-emerald-50 text-emerald-800';
            case 'مرفوض': return 'bg-rose-50 text-rose-800';
            default: return 'bg-gray-50 text-gray-800';
        }
    };

    const getPriorityBadgeClass = (priority: string) => {
        switch (priority) {
            case 'حرجة': return 'bg-red-100 text-red-800';
            case 'عالية': return 'bg-orange-100 text-orange-800';
            case 'متوسطة': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Layout title="إدارة الحالات الاجتماعية">
            <Head title="الحالات الاجتماعية" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">إدارة الحالات الاجتماعية</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">عرض وتصفية وتعديل جميع ملفات المستفيدين المسجلة.</p>
                </div>
                <Link 
                    href={route('cases.create')} 
                    className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <span className="material-symbols-outlined">add</span>
                    إضافة حالة جديدة
                </Link>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-xl p-lg border border-outline-variant/30 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
                <div>
                    <label className="block font-label-sm text-on-surface-variant mb-2">بحث عن حالة</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                        <input 
                            className="w-full pr-10 pl-4 py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="الاسم، الهوية، الهاتف..."
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-label-sm text-on-surface-variant mb-2">حالة الملف</label>
                    <select 
                        className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md outline-none"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    >
                        <option value="">الكل</option>
                        <option value="جديد">جديد</option>
                        <option value="تحت الدراسة">تحت الدراسة</option>
                        <option value="مقبول">مقبول</option>
                        <option value="مرفوض">مرفوض</option>
                        <option value="مغلق">مغلق</option>
                    </select>
                </div>

                <div>
                    <label className="block font-label-sm text-on-surface-variant mb-2">المحافظة</label>
                    <select 
                        className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md outline-none"
                        value={governorate}
                        onChange={e => setGovernorate(e.target.value)}
                    >
                        <option value="">الكل</option>
                        <option value="الرياض">الرياض</option>
                        <option value="مكة المكرمة">مكة المكرمة</option>
                        <option value="الشرقية">الشرقية</option>
                    </select>
                </div>

                <div>
                    <label className="block font-label-sm text-on-surface-variant mb-2">مستوى الأولوية</label>
                    <select 
                        className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md outline-none"
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                    >
                        <option value="">الكل</option>
                        <option value="حرجة">حرجة</option>
                        <option value="عالية">عالية</option>
                        <option value="متوسطة">متوسطة</option>
                        <option value="منخفضة">منخفضة</option>
                    </select>
                </div>
            </div>

            {/* Cases Table */}
            <div className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low text-on-surface font-label-lg border-b border-outline-variant/30">
                                <th onClick={() => handleSort('name')} className="p-md cursor-pointer hover:bg-surface-container select-none">اسم الحالة</th>
                                <th onClick={() => handleSort('national_id')} className="p-md cursor-pointer hover:bg-surface-container select-none">الهوية الوطنية</th>
                                <th className="p-md">المنطقة / المحافظة</th>
                                <th className="p-md">الباحث المسؤول</th>
                                <th className="p-md">الأولوية</th>
                                <th className="p-md">الحالة</th>
                                <th className="p-md text-center">العمليات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20 text-body-md">
                            {cases.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-lg text-center text-outline">لا توجد حالات تطابق خيارات التصفية الحالية.</td>
                                </tr>
                            ) : (
                                cases.data.map(item => (
                                    <tr key={item.id} className="hover:bg-surface-container-lowest transition-colors group">
                                        <td className="p-md font-medium text-on-surface">
                                            <Link href={route('cases.show', item.id)} className="hover:text-primary transition-colors">
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="p-md text-on-surface-variant font-mono">{item.national_id}</td>
                                        <td className="p-md text-on-surface-variant">{item.governorate} - {item.district}</td>
                                        <td className="p-md text-on-surface-variant">
                                            {item.assigned_employee ? (
                                                <span className="flex items-center gap-xs">
                                                    <span className="material-symbols-outlined text-[18px]">person</span>
                                                    {item.assigned_employee.name}
                                                </span>
                                            ) : (
                                                <span className="text-outline text-xs">غير معين</span>
                                            )}
                                        </td>
                                        <td className="p-md">
                                            <span className={`px-sm py-xs rounded-full font-bold text-xs ${getPriorityBadgeClass(item.priority)}`}>
                                                {item.priority}
                                            </span>
                                        </td>
                                        <td className="p-md">
                                            <span className={`px-sm py-xs rounded-full font-bold text-xs ${getStatusBadgeClass(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-md">
                                            <div className="flex items-center justify-center gap-sm">
                                                <Link 
                                                    href={route('cases.show', item.id)} 
                                                    className="p-sm text-primary hover:bg-surface-container rounded-full transition-colors"
                                                    title="عرض الملف"
                                                >
                                                    <span className="material-symbols-outlined">visibility</span>
                                                </Link>
                                                <Link 
                                                    href={route('cases.edit', item.id)} 
                                                    className="p-sm text-secondary hover:bg-surface-container rounded-full transition-colors"
                                                    title="تعديل"
                                                >
                                                    <span className="material-symbols-outlined">edit</span>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Links */}
                {cases.last_page > 1 && (
                    <div className="p-md bg-surface-container-low border-t border-outline-variant/20 flex justify-center gap-sm">
                        {cases.links.map((link, idx) => (
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
