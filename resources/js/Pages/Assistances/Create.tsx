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

            <div className="mb-8 border-b border-outline-variant/20 pb-sm">
                <div className="flex items-center gap-xs text-on-surface-variant text-sm mb-xs">
                    <Link href={route('assistances.index')} className="hover:text-primary">سجل المساعدات</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    <span>تسجيل مساعدة جديدة</span>
                </div>
                <h1 className="font-display-md text-display-md text-on-surface">تسجيل مساعدة مالية أو عينية جديدة</h1>
            </div>

            <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-lg text-body-md">
                    <div>
                        <label className="block text-sm text-on-surface-variant mb-xs">اختر الحالة المستفيدة</label>
                        <select 
                            value={data.case_id} 
                            onChange={e => setData('case_id', e.target.value)}
                            className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                        >
                            {cases.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.case_id && <span className="text-error text-xs">{errors.case_id}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        <div>
                            <label className="block text-sm text-on-surface-variant mb-xs">نوع المساعدة</label>
                            <select 
                                value={data.type} 
                                onChange={e => setData('type', e.target.value)}
                                className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                            >
                                <option value="financial">مالية (نقدية)</option>
                                <option value="non_financial">عينية (مواد، أجهزة...)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-on-surface-variant mb-xs">القيمة المالية الكلية (أو القيمة التقديرية للعينية)</label>
                            <input 
                                type="number" 
                                required
                                value={data.amount} 
                                onChange={e => setData('amount', e.target.value)}
                                className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                placeholder="مثال: 1500"
                            />
                            {errors.amount && <span className="text-error text-xs">{errors.amount}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        <div>
                            <label className="block text-sm text-on-surface-variant mb-xs">تاريخ الصرف والتسجيل</label>
                            <input 
                                type="date" 
                                required
                                value={data.date} 
                                onChange={e => setData('date', e.target.value)}
                                className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-on-surface-variant mb-xs">المستندات / المرفقات (اختياري)</label>
                            <input 
                                type="text" 
                                value={data.attachments} 
                                onChange={e => setData('attachments', e.target.value)}
                                className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                placeholder="رابط المستند، رقم السند..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-on-surface-variant mb-xs">الوصف والتفاصيل</label>
                        <textarea 
                            rows={3}
                            required
                            value={data.description} 
                            onChange={e => setData('description', e.target.value)}
                            className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                            placeholder="اكتب وصف المساعدة المصروفة بالتفصيل..."
                        />
                        {errors.description && <span className="text-error text-xs">{errors.description}</span>}
                    </div>

                    <div className="pt-md border-t border-outline-variant/20 flex gap-sm justify-end">
                        <Link href={route('assistances.index')} className="bg-white border border-outline-variant/30 text-on-surface px-lg py-sm rounded-lg hover:bg-surface-container transition-all">إلغاء</Link>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-primary text-on-primary font-bold px-xl py-sm rounded-lg hover:bg-primary-container transition-all"
                        >
                            تسجيل المساعدة وصرفها
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
