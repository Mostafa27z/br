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

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">إدارة الحالات الاجتماعية</h1>
                    <p className="text-sm sm:text-base text-on-surface-variant mt-1">عرض وتصفية وتعديل جميع ملفات المستفيدين المسجلة.</p>
                </div>
                <Link 
                    href={route('cases.create')} 
                    className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary font-medium text-sm sm:text-base px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs shrink-0"
                >
                    <span className="material-symbols-outlined text-xl">add</span>
                    <span>إضافة حالة جديدة</span>
                </Link>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 shadow-xs mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">بحث عن حالة</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
                        <input 
                            className="w-full pr-9 pl-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="الاسم، الهوية، الهاتف..."
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">حالة الملف</label>
                    <select 
                        className="w-full px-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
                    <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">المحافظة</label>
                    <select 
                        className="w-full px-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
                    <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">مستوى الأولوية</label>
                    <select 
                        className="w-full px-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
            <div className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs w-full min-w-0">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-right border-collapse min-w-[680px]">
                        <thead>
                            <tr className="bg-surface-container-low text-on-surface text-xs sm:text-sm font-bold border-b border-outline-variant/30">
                                <th onClick={() => handleSort('name')} className="p-3 sm:p-4 cursor-pointer hover:bg-surface-container select-none">اسم الحالة</th>
                                <th onClick={() => handleSort('national_id')} className="p-3 sm:p-4 cursor-pointer hover:bg-surface-container select-none">الهوية الوطنية</th>
                                <th className="p-3 sm:p-4">المنطقة / المحافظة</th>
                                <th className="p-3 sm:p-4">الباحث المسؤول</th>
                                <th className="p-3 sm:p-4">الأولوية</th>
                                <th className="p-3 sm:p-4">الحالة</th>
                                <th className="p-3 sm:p-4 text-center">العمليات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20 text-xs sm:text-sm">
                            {cases.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-6 text-center text-outline">لا توجد حالات تطابق خيارات التصفية الحالية.</td>
                                </tr>
                            ) : (
                                cases.data.map(item => (
                                    <tr key={item.id} className="hover:bg-surface-container-lowest transition-colors group">
                                        <td className="p-3 sm:p-4 font-bold text-on-surface">
                                            <Link href={route('cases.show', item.id)} className="hover:text-primary transition-colors">
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="p-3 sm:p-4 text-on-surface-variant font-mono">{item.national_id}</td>
                                        <td className="p-3 sm:p-4 text-on-surface-variant">{item.governorate} - {item.district}</td>
                                        <td className="p-3 sm:p-4 text-on-surface-variant">
                                            {item.assigned_employee ? (
                                                <span className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-[16px]">person</span>
                                                    <span>{item.assigned_employee.name}</span>
                                                </span>
                                            ) : (
                                                <span className="text-outline text-xs">غير معين</span>
                                            )}
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${getPriorityBadgeClass(item.priority)}`}>
                                                {item.priority}
                                            </span>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${getStatusBadgeClass(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <div className="flex items-center justify-center gap-1">
                                                <Link 
                                                    href={route('cases.show', item.id)} 
                                                    className="p-1.5 text-primary hover:bg-surface-container rounded-lg transition-colors"
                                                    title="عرض الملف"
                                                >
                                                    <span className="material-symbols-outlined text-lg">visibility</span>
                                                </Link>
                                                <Link 
                                                    href={route('cases.edit', item.id)} 
                                                    className="p-1.5 text-secondary hover:bg-surface-container rounded-lg transition-colors"
                                                    title="تعديل"
                                                >
                                                    <span className="material-symbols-outlined text-lg">edit</span>
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
                    <div className="p-3 sm:p-4 bg-surface-container-low/50 border-t border-outline-variant/20 flex flex-wrap justify-center gap-1.5 sm:gap-2">
                        {cases.links.map((link, idx) => (
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
