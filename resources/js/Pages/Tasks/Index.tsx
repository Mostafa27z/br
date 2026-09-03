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

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">مهام الباحثين الميدانية</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">تتبع وتنظيم الزيارات الميدانية والتحقق من الحالات الموكلة.</p>
                </div>
                <Link 
                    href={route('tasks.create')} 
                    className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <span className="material-symbols-outlined">add</span>
                    إسناد مهمة جديدة
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-lg border border-outline-variant/30 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-md">
                <div>
                    <label className="block font-label-sm text-on-surface-variant mb-2">بحث بعنوان المهمة أو اسم الحالة</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                        <input 
                            className="w-full pr-10 pl-4 py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                            placeholder="ابحث هنا..."
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-label-sm text-on-surface-variant mb-2">حالة المهمة</label>
                    <select 
                        className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
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
                    <label className="block font-label-sm text-on-surface-variant mb-2">مستوى الأولوية</label>
                    <select 
                        className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-xl">
                {tasks.data.length === 0 ? (
                    <p className="text-center text-outline py-lg md:col-span-3">لا توجد مهام مطابقة حالياً.</p>
                ) : (
                    tasks.data.map(task => (
                        <div key={task.id} className="bg-white border border-outline-variant/30 rounded-xl p-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
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
