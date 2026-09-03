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

            <div className="mb-8 border-b border-outline-variant/20 pb-sm">
                <div className="flex items-center gap-xs text-on-surface-variant text-sm mb-xs">
                    <Link href={route('tasks.index')} className="hover:text-primary">قائمة المهام</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    <span>تفاصيل المهمة رقم {task.id}</span>
                </div>
                <h1 className="font-display-md text-display-md text-on-surface">متابعة وتحديث المهمة الميدانية</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
                {/* Left side: Task Info Cards */}
                <div className="lg:col-span-6 space-y-lg">
                    <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm">
                        <div className="flex justify-between items-center mb-md border-b border-outline-variant/10 pb-xs">
                            <h3 className="font-bold text-on-surface text-lg">بيانات المهمة الأساسية</h3>
                            <span className="text-xs bg-primary-fixed text-on-primary-fixed px-sm py-xs rounded-full font-bold">{task.priority}</span>
                        </div>
                        <div className="space-y-sm text-body-md">
                            <div>
                                <span className="text-outline text-xs block">عنوان المهمة</span>
                                <span className="font-bold text-on-surface">{task.title}</span>
                            </div>
                            <div>
                                <span className="text-outline text-xs block">تاريخ الاستحقاق والزيارة</span>
                                <span className="font-bold text-on-surface font-mono">{task.due_date || 'مفتوح'}</span>
                            </div>
                            <div>
                                <span className="text-outline text-xs block">الحالة الاجتماعية المرتبطة</span>
                                <Link href={route('cases.show', task.social_case.id)} className="font-bold text-primary hover:underline">
                                    {task.social_case.name}
                                </Link>
                            </div>
                            <div>
                                <span className="text-outline text-xs block">الباحث الاجتماعي المكلّف</span>
                                <span className="font-bold text-on-surface">{task.assigned_employee?.name || 'غير معين'}</span>
                            </div>
                            <div>
                                <span className="text-outline text-xs block">تاريخ الإنشاء والمسند</span>
                                <span className="text-xs text-outline block">أنشأها المشرف: {task.creator.name}</span>
                            </div>
                        </div>

                        <div className="pt-md border-t border-outline-variant/10 mt-md">
                            <span className="text-outline text-xs block mb-xs">توجيهات العمل والمطلوب</span>
                            <p className="text-on-surface leading-relaxed">{task.description || 'لا توجد تفاصيل إضافية.'}</p>
                        </div>
                    </div>
                </div>

                {/* Right side: Update Status Form */}
                <div className="lg:col-span-6">
                    <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm">
                        <h3 className="font-bold text-on-surface text-lg border-b border-outline-variant/10 pb-xs mb-md">تحديث التقدم والتقرير الميداني</h3>
                        <form onSubmit={handleUpdate} className="space-y-md text-body-md">
                            <div>
                                <label className="block text-xs text-on-surface-variant mb-xs">حالة المهمة الحالية</label>
                                <select 
                                    value={data.status} 
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                >
                                    <option value="معلقة">معلقة</option>
                                    <option value="قيد التنفيذ">قيد التنفيذ</option>
                                    <option value="مكتملة">مكتملة</option>
                                    <option value="ملغاة">ملغاة</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-on-surface-variant mb-xs">التحديثات والتقرير الميداني</label>
                                <textarea 
                                    rows={5}
                                    value={data.updates} 
                                    onChange={e => setData('updates', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md font-sans"
                                    placeholder="اكتب ما تم إنجازه أو أي ملاحظات ميدانية للتوثيق..."
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-primary text-on-primary font-bold py-sm rounded-lg text-body-md hover:bg-primary-container transition-all"
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
