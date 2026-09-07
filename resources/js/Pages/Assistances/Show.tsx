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

            <div className="mb-6 border-b border-outline-variant/20 pb-4">
                <div className="flex items-center gap-1 text-on-surface-variant text-xs sm:text-sm mb-1">
                    <Link href={route('assistances.index')} className="hover:text-primary">سجل المساعدات</Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                    <span>تفاصيل المساعدة رقم {assistance.id}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">تفاصيل الدعم المنصرف للحالة</h1>
            </div>

            <div className="bg-white rounded-2xl border border-outline-variant/30 p-4 sm:p-6 md:p-8 shadow-xs max-w-2xl w-full min-w-0 text-sm sm:text-base space-y-4">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
                    <h3 className="font-bold text-on-surface text-base sm:text-lg">بيانات صرف المساعدة</h3>
                    <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${assistance.type === 'financial' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-blue-800'}`}>
                        {assistance.type === 'financial' ? 'مساعدة مالية' : 'مساعدة عينية'}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                        <span className="font-bold text-primary text-lg sm:text-xl">{assistance.amount.toLocaleString('ar-SA')} جنيه مصري</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/10">
                    <span className="text-outline text-xs block mb-1">تفاصيل ووصف المساعدة</span>
                    <p className="text-on-surface leading-relaxed text-sm">{assistance.description}</p>
                </div>

                <div className="pt-3 border-t border-outline-variant/10 text-xs text-outline">
                    تم التسجيل في النظام بواسطة الباحث الاجتماعي: {assistance.employee.name}
                </div>
            </div>
        </Layout>
    );
}
