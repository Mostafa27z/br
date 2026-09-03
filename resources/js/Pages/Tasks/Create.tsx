import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface CaseOption {
    id: number;
    name: string;
}

interface EmployeeOption {
    id: number;
    name: string;
}

interface CreateProps {
    cases: CaseOption[];
    employees: EmployeeOption[];
    preselected_case_id: string | null;
}

export default function Create({ cases, employees, preselected_case_id }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        case_id: preselected_case_id || (cases[0]?.id.toString() || ''),
        user_id: employees[0]?.id.toString() || '',
        priority: 'متوسطة',
        due_date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    return (
        <Layout title="إسناد مهمة جديدة للباحث">
            <Head title="إسناد مهمة جديدة" />

            <div className="mb-8 border-b border-outline-variant/20 pb-sm">
                <div className="flex items-center gap-xs text-on-surface-variant text-sm mb-xs">
                    <Link href={route('tasks.index')} className="hover:text-primary">سجل المهام</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    <span>إسناد مهمة جديدة</span>
                </div>
                <h1 className="font-display-md text-display-md text-on-surface">إسناد مهمة ميدانية جديدة للباحث الاجتماعي</h1>
            </div>

            <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-lg text-body-md">
                    <div>
                        <label className="block text-sm text-on-surface-variant mb-xs">عنوان المهمة</label>
                        <input 
                            type="text" 
                            required
                            value={data.title} 
                            onChange={e => setData('title', e.target.value)}
                            className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                            placeholder="مثال: زيارة ميدانية للتحقق من السكن"
                        />
                        {errors.title && <span className="text-error text-xs">{errors.title}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        <div>
                            <label className="block text-sm text-on-surface-variant mb-xs">الحالة الاجتماعية المرتبطة</label>
                            <select 
                                value={data.case_id} 
                                onChange={e => setData('case_id', e.target.value)}
                                className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                            >
                                {cases.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-on-surface-variant mb-xs">الباحث الاجتماعي المكلّف</label>
                            <select 
                                value={data.user_id} 
                                onChange={e => setData('user_id', e.target.value)}
                                className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                            >
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                            {errors.user_id && <span className="text-error text-xs">{errors.user_id}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        <div>
                            <label className="block text-sm text-on-surface-variant mb-xs">مستوى الأولوية</label>
                            <select 
                                value={data.priority} 
                                onChange={e => setData('priority', e.target.value)}
                                className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                            >
                                <option value="منخفضة">منخفضة</option>
                                <option value="متوسطة">متوسطة</option>
                                <option value="عالية">عالية</option>
                                <option value="حرجة">حرجة</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-on-surface-variant mb-xs">تاريخ الاستحقاق والزيارة</label>
                            <input 
                                type="date" 
                                required
                                value={data.due_date} 
                                onChange={e => setData('due_date', e.target.value)}
                                className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-on-surface-variant mb-xs">توجيهات العمل والمطلوب</label>
                        <textarea 
                            rows={4}
                            value={data.description} 
                            onChange={e => setData('description', e.target.value)}
                            className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                            placeholder="اكتب التوجيهات والتفاصيل هنا..."
                        />
                    </div>

                    <div className="pt-md border-t border-outline-variant/20 flex gap-sm justify-end">
                        <Link href={route('tasks.index')} className="bg-white border border-outline-variant/30 text-on-surface px-lg py-sm rounded-lg hover:bg-surface-container transition-all">إلغاء</Link>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-primary text-on-primary font-bold px-xl py-sm rounded-lg hover:bg-primary-container transition-all"
                        >
                            إسناد المهمة وحفظها
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
