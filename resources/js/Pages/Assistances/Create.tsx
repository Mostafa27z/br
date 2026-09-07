import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface CaseOption {
    id: number;
    name: string;
}

interface CreateProps {
    cases: CaseOption[];
    preselected_case_id: string | null;
}

export default function Create({ cases, preselected_case_id }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        case_id: preselected_case_id || (cases[0]?.id.toString() || ''),
        type: 'financial',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        attachments: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('assistances.store'));
    };

    return (
        <Layout title="تسجيل مساعدة جديدة">
            <Head title="تسجيل مساعدة جديدة" />

            <div className="mb-6 border-b border-outline-variant/20 pb-4">
                <div className="flex items-center gap-1 text-on-surface-variant text-xs sm:text-sm mb-1">
                    <Link href={route('assistances.index')} className="hover:text-primary">سجل المساعدات</Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                    <span>تسجيل مساعدة جديدة</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">تسجيل مساعدة مالية أو عينية جديدة</h1>
            </div>

            <div className="bg-white rounded-2xl border border-outline-variant/30 p-4 sm:p-6 md:p-8 shadow-xs max-w-2xl w-full min-w-0">
                <form onSubmit={handleSubmit} className="space-y-6 text-sm sm:text-base">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">اختر الحالة المستفيدة</label>
                        <select 
                            value={data.case_id} 
                            onChange={e => setData('case_id', e.target.value)}
                            className="w-full px-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        >
                            {cases.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.case_id && <span className="text-error text-xs">{errors.case_id}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">نوع المساعدة</label>
                            <select 
                                value={data.type} 
                                onChange={e => setData('type', e.target.value)}
                                className="w-full px-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            >
                                <option value="financial">مالية (نقدية)</option>
                                <option value="non_financial">عينية (مواد، أجهزة...)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">القيمة المالية الكلية</label>
                            <input 
                                type="number" 
                                required
                                value={data.amount} 
                                onChange={e => setData('amount', e.target.value)}
                                className="w-full px-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                placeholder="مثال: 1500"
                            />
                            {errors.amount && <span className="text-error text-xs">{errors.amount}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">تاريخ الصرف والتسجيل</label>
                            <input 
                                type="date" 
                                required
                                value={data.date} 
                                onChange={e => setData('date', e.target.value)}
                                className="w-full px-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">المستندات / المرفقات (اختياري)</label>
                            <input 
                                type="text" 
                                value={data.attachments} 
                                onChange={e => setData('attachments', e.target.value)}
                                className="w-full px-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                placeholder="رابط المستند، رقم السند..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-on-surface-variant mb-1.5">الوصف والتفاصيل</label>
                        <textarea 
                            rows={3}
                            required
                            value={data.description} 
                            onChange={e => setData('description', e.target.value)}
                            className="w-full px-3 py-2 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="اكتب وصف المساعدة المصروفة بالتفصيل..."
                        />
                        {errors.description && <span className="text-error text-xs">{errors.description}</span>}
                    </div>

                    <div className="pt-4 border-t border-outline-variant/20 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 justify-end">
                        <Link href={route('assistances.index')} className="w-full sm:w-auto text-center bg-white border border-outline-variant/30 text-on-surface px-6 py-2.5 rounded-xl hover:bg-surface-container transition-all text-sm font-medium">إلغاء</Link>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary font-bold px-6 py-2.5 rounded-xl transition-all text-sm shadow-xs"
                        >
                            تسجيل المساعدة وصرفها
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
