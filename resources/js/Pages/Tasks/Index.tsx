import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface Task {
    id: number;
    title: string;
    description: string | null;
    priority: string;
    status: string;
    due_date: string | null;
    social_case: { id: number; name: string };
    assigned_employee: { name: string } | null;
}

interface IndexProps {
    tasks: {
        data: Task[];
        links: { url: string | null; label: string; active: boolean }[];
        last_page: number;
    };
    filters: {
        status?: string;
        priority?: string;
        search?: string;
    };
}

export default function Index({ tasks, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [priority, setPriority] = useState(filters.priority || '');

    const handleFilterChange = () => {
        router.get(route('tasks.index'), { search, status, priority }, {
            preserveState: true,
            replace: true,
        });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleFilterChange();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, status, priority]);

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'حرجة': return 'bg-red-50 text-red-800 border-red-200';
            case 'عالية': return 'bg-orange-50 text-orange-800 border-orange-200';
            case 'متوسطة': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-50 text-gray-800 border-gray-200';
        }
    };

    return (
        <Layout title="إدارة المهام الميدانية">
            <Head title="قائمة المهام" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">مهام الباحثين الميدانية</h1>
                    <p className="text-sm sm:text-base text-on-surface-variant mt-1">تتبع وتنظيم الزيارات الميدانية والتحقق من الحالات الموكلة.</p>
                </div>
                <Link 
                    href={route('tasks.create')} 
                    className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary font-medium text-sm sm:text-base px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs shrink-0"
                >
                    <span className="material-symbols-outlined text-xl">add</span>
                    <span>إسناد مهمة جديدة</span>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-outline-variant/30 shadow-xs mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">بحث بعنوان المهمة أو اسم الحالة</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
                        <input 
                            className="w-full pr-9 pl-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="ابحث هنا..."
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">حالة المهمة</label>
                    <select 
                        className="w-full px-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    >
                        <option value="">الكل</option>
                        <option value="معلقة">معلقة</option>
                        <option value="قيد التنفيذ">قيد التنفيذ</option>
                        <option value="مكتملة">مكتملة</option>
                        <option value="ملغاة">ملغاة</option>
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

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {tasks.data.length === 0 ? (
                    <p className="text-center text-outline py-8 sm:col-span-2 lg:col-span-3">لا توجد مهام مطابقة حالياً.</p>
                ) : (
                    tasks.data.map(task => (
                        <div key={task.id} className="bg-white border border-outline-variant/30 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow">
                            <div>
                                <div className="flex justify-between items-start mb-md">
                                    <span className={`px-sm py-xs rounded-full font-bold text-xs border ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                    <span className="text-xs bg-surface-container-high text-on-surface px-sm py-xs rounded-full font-bold">{task.status}</span>
                                </div>
                                <h3 className="font-bold text-on-surface text-base mb-xs">{task.title}</h3>
                                <p className="text-xs text-outline mb-sm">تاريخ الاستحقاق: {task.due_date || 'غير محدد'}</p>
                                
                                <div className="text-xs text-on-surface-variant space-y-xs border-t border-outline-variant/10 pt-sm">
                                    <p>الحالة المستفيدة: <span className="font-bold">{task.social_case.name}</span></p>
                                    <p>الباحث الاجتماعي: <span className="font-bold">{task.assigned_employee?.name || 'غير معين'}</span></p>
                                </div>
                            </div>
                            <div className="mt-lg pt-sm border-t border-outline-variant/10 flex justify-end">
                                <Link href={route('tasks.show', task.id)} className="text-primary font-bold text-sm hover:underline">عرض تفاصيل المهمة ←</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}
