import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface Task {
    id: number;
    title: string;
    description: string | null;
    priority: string;
    status: string;
    due_date: string | null;
    updates: string | null;
    social_case: { id: number; name: string };
    assigned_employee: { name: string } | null;
    creator: { name: string };
}

interface ShowProps {
    task: Task;
}

export default function Show({ task }: ShowProps) {
    const { data, setData, put, processing } = useForm({
        status: task.status,
        updates: task.updates || '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('tasks.update', task.id));
    };

    return (
        <Layout title={`تفاصيل المهمة - ${task.title}`}>
            <Head title="تفاصيل المهمة" />

            <div className="mb-6 sm:mb-8 border-b border-outline-variant/20 pb-3 sm:pb-4">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-on-surface-variant text-xs sm:text-sm mb-1.5 sm:mb-2">
                    <Link href={route('tasks.index')} className="hover:text-primary transition-colors">قائمة المهام</Link>
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px]">chevron_left</span>
                    <span className="text-on-surface font-medium">تفاصيل المهمة #{task.id}</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface">متابعة وتحديث المهمة الميدانية</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                {/* Left side: Task Info Cards */}
                <div className="lg:col-span-6 space-y-4 sm:space-y-6 min-w-0">
                    <div className="bg-white rounded-2xl border border-outline-variant/30 p-4 sm:p-6 shadow-xs">
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-4 border-b border-outline-variant/10 pb-3">
                            <h3 className="font-bold text-on-surface text-base sm:text-lg">بيانات المهمة الأساسية</h3>
                            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">{task.priority}</span>
                        </div>
                        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                            <div>
                                <span className="text-outline text-xs block mb-0.5">عنوان المهمة</span>
                                <span className="font-bold text-on-surface">{task.title}</span>
                            </div>
                            <div>
                                <span className="text-outline text-xs block mb-0.5">تاريخ الاستحقاق والزيارة</span>
                                <span className="font-bold text-on-surface font-mono">{task.due_date || 'مفتوح'}</span>
                            </div>
                            <div>
                                <span className="text-outline text-xs block mb-0.5">الحالة الاجتماعية المرتبطة</span>
                                <Link href={route('cases.show', task.social_case.id)} className="font-bold text-primary hover:underline inline-flex items-center gap-1">
                                    <span>{task.social_case.name}</span>
                                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                </Link>
                            </div>
                            <div>
                                <span className="text-outline text-xs block mb-0.5">الباحث الاجتماعي المكلّف</span>
                                <span className="font-bold text-on-surface">{task.assigned_employee?.name || 'غير معين'}</span>
                            </div>
                            <div>
                                <span className="text-outline text-xs block mb-0.5">تاريخ الإنشاء والمسند</span>
                                <span className="text-xs text-outline block">أنشأها المشرف: {task.creator.name}</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-outline-variant/10 mt-4">
                            <span className="text-outline text-xs block mb-1">توجيهات العمل والمطلوب</span>
                            <p className="text-on-surface leading-relaxed text-sm sm:text-base bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">{task.description || 'لا توجد تفاصيل إضافية.'}</p>
                        </div>
                    </div>
                </div>

                {/* Right side: Update Status Form */}
                <div className="lg:col-span-6 min-w-0">
                    <div className="bg-white rounded-2xl border border-outline-variant/30 p-4 sm:p-6 shadow-xs">
                        <h3 className="font-bold text-on-surface text-base sm:text-lg border-b border-outline-variant/10 pb-3 mb-4">تحديث التقدم والتقرير الميداني</h3>
                        <form onSubmit={handleUpdate} className="space-y-4 text-sm sm:text-base">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">حالة المهمة الحالية</label>
                                <select 
                                    value={data.status} 
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base"
                                >
                                    <option value="معلقة">معلقة</option>
                                    <option value="قيد التنفيذ">قيد التنفيذ</option>
                                    <option value="مكتملة">مكتملة</option>
                                    <option value="ملغاة">ملغاة</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">التحديثات والتقرير الميداني</label>
                                <textarea 
                                    rows={5}
                                    value={data.updates} 
                                    onChange={e => setData('updates', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base"
                                    placeholder="اكتب ما تم إنجازه أو أي ملاحظات ميدانية للتوثيق..."
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-primary text-on-primary font-bold py-3 rounded-xl text-sm sm:text-base hover:bg-primary-container transition-all shadow-xs active:scale-[0.99] disabled:opacity-50"
                            >
                                حفظ التحديثات والتقرير
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
