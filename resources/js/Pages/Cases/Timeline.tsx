import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface Activity {
    id: number;
    type: string;
    title: string;
    description: string | null;
    created_at: string;
    user: { name: string } | null;
}

interface TimelineProps {
    socialCase: { id: number; name: string };
    activities: Activity[];
}

export default function Timeline({ socialCase, activities }: TimelineProps) {
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'case_created': return 'add_circle';
            case 'case_updated': return 'edit';
            case 'assistance_added': return 'volunteer_activism';
            case 'visit_added': return 'home';
            case 'note_added': return 'description';
            case 'task_updated': return 'assignment';
            case 'assignment_changed': return 'person_add';
            default: return 'info';
        }
    };

    const getActivityColorClass = (type: string) => {
        switch (type) {
            case 'case_created': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300';
            case 'assistance_added': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300';
            case 'visit_added': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300';
            case 'task_updated': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300';
            case 'assignment_changed': return 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300';
            default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300';
        }
    };

    return (
        <Layout title={`السجل الزمني - ${socialCase.name}`}>
            <Head title={`سجل ${socialCase.name}`} />

            <div className="mb-8 border-b border-outline-variant/20 pb-4">
                <div className="flex items-center gap-1 text-on-surface-variant text-xs mb-2">
                    <Link href={route('cases.index')} className="hover:text-primary transition-colors">الحالات الاجتماعية</Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                    <Link href={route('cases.show', socialCase.id)} className="hover:text-primary transition-colors">{socialCase.name}</Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                    <span className="text-outline">السجل الزمني للأحداث</span>
                </div>
                <h1 className="font-bold text-3xl text-on-surface">سجل نشاط ملف المستفيد</h1>
            </div>

            <div className="max-w-3xl relative">
                {/* Vertical Timeline Thread */}
                {activities.length > 0 && (
                    <div className="absolute right-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary/40 via-outline-variant/30 to-transparent pointer-events-none" />
                )}

                <div className="space-y-6">
                    {activities.length === 0 ? (
                        <div className="bg-white rounded-xl border border-outline-variant/30 p-8 shadow-sm text-center">
                            <p className="text-outline text-sm">لا توجد سجلات تاريخية مسجلة بعد لهذه الحالة.</p>
                        </div>
                    ) : (
                        activities.map((act, index) => (
                            <div 
                                key={act.id} 
                                className="relative flex gap-4 animate-slide-up group"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Bullet Node */}
                                <div className="z-10 flex-shrink-0">
                                    <span className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow ${getActivityColorClass(act.type)}`}>
                                        <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:rotate-12">{getActivityIcon(act.type)}</span>
                                    </span>
                                </div>
                                
                                {/* Content Card */}
                                <div className="flex-1 bg-white rounded-xl border border-outline-variant/20 p-5 shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-x-1.5 transition-all duration-300 ease-out text-sm">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-50">
                                        <h3 className="font-bold text-on-surface text-base group-hover:text-primary transition-colors">{act.title}</h3>
                                        <span className="text-xs text-outline bg-slate-50 px-2.5 py-1 rounded-full font-mono font-medium self-start sm:self-center">
                                            {new Date(act.created_at).toLocaleString('ar-SA')}
                                        </span>
                                    </div>
                                    
                                    <p className="text-on-surface-variant leading-relaxed text-sm whitespace-pre-line mb-3">
                                        {act.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-1.5 text-xs text-outline">
                                        <span className="material-symbols-outlined text-[14px]">person</span>
                                        <span>المسؤول عن الإجراء:</span>
                                        <span className="font-bold text-on-surface-variant bg-slate-100/60 px-2 py-0.5 rounded">{act.user?.name || 'نظام بر'}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
}
