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

            <div className="mb-6 sm:mb-8 border-b border-outline-variant/20 pb-3 sm:pb-4">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-on-surface-variant text-xs sm:text-sm mb-1.5 sm:mb-2">
                    <Link href={route('tasks.index')} className="hover:text-primary transition-colors">سجل المهام</Link>
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px]">chevron_left</span>
                    <span className="text-on-surface font-medium">إسناد مهمة جديدة</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface">إسناد مهمة ميدانية جديدة للباحث الاجتماعي</h1>
            </div>

            <div className="bg-white rounded-2xl border border-outline-variant/30 p-4 sm:p-6 md:p-8 shadow-xs max-w-2xl w-full min-w-0">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-sm sm:text-base">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">عنوان المهمة</label>
                        <input 
                            type="text" 
                            required
                            value={data.title} 
                            onChange={e => setData('title', e.target.value)}
                            className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base"
                            placeholder="مثال: زيارة ميدانية للتحقق من السكن"
                        />
                        {errors.title && <span className="text-error text-xs block mt-1">{errors.title}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">الحالة الاجتماعية المرتبطة</label>
                            <select 
                                value={data.case_id} 
                                onChange={e => setData('case_id', e.target.value)}
                                className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base"
                            >
                                {cases.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">الباحث الاجتماعي المكلّف</label>
                            <select 
                                value={data.user_id} 
                                onChange={e => setData('user_id', e.target.value)}
                                className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base"
                            >
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                            {errors.user_id && <span className="text-error text-xs block mt-1">{errors.user_id}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">مستوى الأولوية</label>
                            <select 
                                value={data.priority} 
                                onChange={e => setData('priority', e.target.value)}
                                className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base"
                            >
                                <option value="منخفضة">منخفضة</option>
                                <option value="متوسطة">متوسطة</option>
                                <option value="عالية">عالية</option>
                                <option value="حرجة">حرجة</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">تاريخ الاستحقاق والزيارة</label>
                            <input 
                                type="date" 
                                required
                                value={data.due_date} 
                                onChange={e => setData('due_date', e.target.value)}
                                className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base font-mono"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">توجيهات العمل والمطلوب</label>
                        <textarea 
                            rows={4}
                            value={data.description} 
                            onChange={e => setData('description', e.target.value)}
                            className="w-full px-3 py-2.5 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm sm:text-base"
                            placeholder="اكتب التوجيهات والتفاصيل هنا..."
                        />
                    </div>

                    <div className="pt-4 border-t border-outline-variant/20 flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 justify-end">
                        <Link 
                            href={route('tasks.index')} 
                            className="w-full sm:w-auto text-center bg-white border border-outline-variant/30 text-on-surface px-5 py-2.5 rounded-xl hover:bg-surface-container font-medium transition-all"
                        >
                            إلغاء
                        </Link>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full sm:w-auto text-center bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary-container transition-all shadow-xs active:scale-[0.99] disabled:opacity-50"
                        >
                            إسناد المهمة وحفظها
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
