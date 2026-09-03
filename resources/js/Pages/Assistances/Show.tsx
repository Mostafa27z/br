import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface Assistance {
    id: number;
    type: 'financial' | 'non_financial';
    description: string;
    amount: number;
    date: string;
    attachments: string | null;
    social_case: { id: number; name: string };
    employee: { name: string };
}

interface ShowProps {
    assistance: Assistance;
}

export default function Show({ assistance }: ShowProps) {
    return (
        <Layout title={`تفاصيل مساعدة - ${assistance.social_case.name}`}>
            <Head title="تفاصيل المساعدة" />

            <div className="mb-8 border-b border-outline-variant/20 pb-sm">
                <div className="flex items-center gap-xs text-on-surface-variant text-sm mb-xs">
                    <Link href={route('assistances.index')} className="hover:text-primary">سجل المساعدات</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    <span>تفاصيل المساعدة رقم {assistance.id}</span>
                </div>
                <h1 className="font-display-md text-display-md text-on-surface">تفاصيل الدعم المنصرف للحالة</h1>
            </div>

            <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm max-w-2xl text-body-md space-y-md">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-xs mb-sm">
                    <h3 className="font-bold text-on-surface text-lg">بيانات صرف المساعدة</h3>
                    <span className={`px-sm py-xs rounded-full font-bold text-xs ${assistance.type === 'financial' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-blue-800'}`}>
                        {assistance.type === 'financial' ? 'مساعدة مالية' : 'مساعدة عينية'}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-lg">
                    <div>
                        <span className="text-outline text-xs block">تاريخ الصرف</span>
                        <span className="font-bold text-on-surface font-mono">{assistance.date}</span>
                    </div>
                    <div>
                        <span className="text-outline text-xs block">مستند الصرف</span>
                        <span className="font-bold text-on-surface">{assistance.attachments || 'لا يوجد مستند مرفق'}</span>
                    </div>
                    <div>
                        <span className="text-outline text-xs block">المستفيد المباشر</span>
                        <Link href={route('cases.show', assistance.social_case.id)} className="font-bold text-primary hover:underline block">
                            {assistance.social_case.name}
                        </Link>
                    </div>
                    <div>
                        <span className="text-outline text-xs block">المبلغ المالي الكلي</span>
                        <span className="font-bold text-primary text-xl">{assistance.amount.toLocaleString('ar-SA')} جنيه مصري</span>
                    </div>
                </div>

                <div className="pt-md border-t border-outline-variant/10">
                    <span className="text-outline text-xs block mb-xs">تفاصيل ووصف المساعدة</span>
                    <p className="text-on-surface leading-relaxed">{assistance.description}</p>
                </div>

                <div className="pt-md border-t border-outline-variant/10 text-xs text-outline">
                    تم التسجيل في النظام بواسطة الباحث الاجتماعي: {assistance.employee.name}
                </div>
            </div>
        </Layout>
    );
}
