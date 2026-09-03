import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface FamilyMember {
    id: number;
    name: string;
    national_id: string | null;
    relationship: string;
    age: number;
    medical_condition: string | null;
}

interface Visit {
    id: number;
    visit_date: string;
    status: string;
    notes: string | null;
    employee: { name: string } | null;
}

interface Assistance {
    id: number;
    type: 'financial' | 'non_financial';
    description: string;
    amount: number;
    date: string;
    employee: { name: string };
}

interface Task {
    id: number;
    title: string;
    priority: string;
    status: string;
    due_date: string | null;
    assigned_employee: { name: string } | null;
}

interface Activity {
    id: number;
    type: string;
    title: string;
    description: string | null;
    created_at: string;
    user: { name: string } | null;
}

interface CaseDetails {
    id: number;
    name: string;
    national_id: string;
    phone: string | null;
    assigned_to: number | null;
    assigned_employee: { id: number; name: string } | null;
    income_source: string | null;
    governorate: string;
    district: string;
    detailed_address: string;
    marital_status: string;
    income: number;
    medical_condition: string | null;
    housing_type: string | null;
    notes: string | null;
    status: string;
    priority: string;
    family_members: FamilyMember[];
    visits: Visit[];
    assistances: Assistance[];
    tasks: Task[];
    activities: Activity[];
}

interface ShowProps {
    socialCase: CaseDetails;
    employees: { id: number; name: string }[];
}

export default function Show({ socialCase, employees }: ShowProps) {
    const { auth } = usePage().props as any;
    const isAdmin = auth?.user?.role === 'admin';
    const [activeTab, setActiveTab] = useState<'overview' | 'family' | 'visits' | 'assistances' | 'tasks' | 'notes'>('overview');

    // Forms
    const assignForm = useForm({ assigned_to: socialCase.assigned_to || '' });
    const familyForm = useForm({
        name: '',
        national_id: '',
        relationship: 'ابن',
        age: '',
        medical_condition: '',
    });
    const visitForm = useForm({
        visit_date: '',
        status: 'مخطط لها',
        notes: '',
    });
    const noteForm = useForm({
        type: 'ملاحظة عامة',
        content: '',
    });

    const [healthStatus, setHealthStatus] = useState<'healthy' | 'sick'>('healthy');
    const [illnessComment, setIllnessComment] = useState('');

    const handleAssign = (e: React.FormEvent) => {
        e.preventDefault();
        assignForm.post(route('cases.assign', socialCase.id));
    };

    const handleAddFamily = (e: React.FormEvent) => {
        e.preventDefault();
        const finalCondition = healthStatus === 'sick' ? (illnessComment || 'مريض') : 'معافى';
        
        familyForm.transform((data) => ({
            ...data,
            medical_condition: finalCondition
        })).post(route('cases.family.store', socialCase.id), {
            onSuccess: () => {
                familyForm.reset();
                setHealthStatus('healthy');
                setIllnessComment('');
            },
        });
    };

    const handleRemoveFamily = (memberId: number) => {
        if (confirm('هل أنت متأكد من حذف فرد الأسرة هذا؟')) {
            useForm().delete(route('cases.family.destroy', [socialCase.id, memberId]));
        }
    };

    const handleAddVisit = (e: React.FormEvent) => {
        e.preventDefault();
        visitForm.post(route('cases.visit.store', socialCase.id), {
            onSuccess: () => visitForm.reset(),
        });
    };

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        noteForm.post(route('cases.note.store', socialCase.id), {
            onSuccess: () => noteForm.reset(),
        });
    };

    return (
        <Layout title={`ملف الحالة - ${socialCase.name}`}>
            <Head title={`ملف ${socialCase.name}`} />

            {/* Header info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-outline-variant/20 pb-md">
                <div>
                    <div className="flex items-center gap-xs text-on-surface-variant text-sm mb-xs">
                        <Link href={route('cases.index')} className="hover:text-primary">الحالات الاجتماعية</Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        <span>{socialCase.name}</span>
                    </div>
                    <h1 className="font-display-md text-display-md text-on-surface flex items-center gap-sm">
                        {socialCase.name}
                        <span className="text-xs px-sm py-xs rounded-full font-bold bg-surface-container-low text-on-surface">رقم الملف: {socialCase.id}</span>
                    </h1>
                </div>

                <div className="flex items-center gap-sm">
                    <Link href={route('cases.edit', socialCase.id)} className="bg-white border border-outline-variant/30 text-on-surface font-label-lg text-label-lg px-md py-sm rounded-lg hover:bg-surface-container transition-all">
                        تعديل البيانات
                    </Link>
                    <Link href={route('cases.timeline', socialCase.id)} className="bg-primary-container text-on-primary-container font-label-lg text-label-lg px-md py-sm rounded-lg hover:bg-primary hover:text-white transition-all flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[18px]">history</span>
                        السجل الزمني
                    </Link>
                </div>
            </div>

            {/* Quick Details Sidebar + Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
                
                {/* Left Card: Case Meta (Col 1-4) */}
                <div className="lg:col-span-4 flex flex-col gap-lg">
                    {/* Basic Info Box */}
                    <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm">
                        <h3 className="font-headline-sm text-on-surface mb-md">البيانات الأساسية</h3>
                        <div className="space-y-sm text-body-md">
                            <div>
                                <span className="text-outline text-xs block">الهوية الوطنية</span>
                                <span className="font-bold text-on-surface font-mono">{socialCase.national_id}</span>
                            </div>
                            <div>
                                <span className="text-outline text-xs block">رقم الهاتف</span>
                                <span className="font-bold text-on-surface">{socialCase.phone || 'غير مسجل'}</span>
                            </div>
                            <div>
                                <span className="text-outline text-xs block">العنوان</span>
                                <span className="font-bold text-on-surface">{socialCase.governorate} - {socialCase.district}</span>
                                <p className="text-xs text-on-surface-variant mt-xs">{socialCase.detailed_address}</p>
                            </div>
                            <div>
                                <span className="text-outline text-xs block">الحالة الاجتماعية</span>
                                <span className="font-bold text-on-surface">{socialCase.marital_status}</span>
                            </div>
                        </div>
                    </div>

                    {/* Assignment Settings */}
                    <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm">
                        <h3 className="font-headline-sm text-on-surface mb-sm">توزيع الباحث المسؤول</h3>
                        {isAdmin ? (
                            <form onSubmit={handleAssign} className="flex flex-col gap-sm">
                                <select 
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                    value={assignForm.data.assigned_to}
                                    onChange={e => assignForm.setData('assigned_to', e.target.value)}
                                >
                                    <option value="">غير معين</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                                    ))}
                                </select>
                                <button 
                                    type="submit" 
                                    disabled={assignForm.processing}
                                    className="bg-primary text-on-primary font-bold px-md py-sm rounded-lg text-xs hover:bg-primary-container transition-all"
                                >
                                    حفظ التعديل
                                </button>
                            </form>
                        ) : (
                            <div className="text-body-md font-bold text-primary">
                                {socialCase.assigned_employee?.name || 'غير معين لموظف'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Card: Content Tab View (Col 1-8) */}
                <div className="lg:col-span-8 flex flex-col gap-lg">
                    {/* Tab Navigation */}
                    <div className="flex gap-sm border-b border-outline-variant/20 pb-sm overflow-x-auto">
                        {(['overview', 'family', 'visits', 'assistances', 'tasks', 'notes'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-lg py-sm font-label-lg rounded-full transition-all whitespace-nowrap ${
                                    activeTab === tab 
                                    ? 'bg-primary text-on-primary font-bold' 
                                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                                }`}
                            >
                                {tab === 'overview' && 'نظرة تفصيلية'}
                                {tab === 'family' && `أفراد الأسرة (${socialCase.family_members.length})`}
                                {tab === 'visits' && 'الزيارات الميدانية'}
                                {tab === 'assistances' && 'سجل الدعم'}
                                {tab === 'tasks' && 'مهام الباحث'}
                                {tab === 'notes' && 'التحديثات والملاحظات'}
                            </button>
                        ))}
                    </div>

                    {/* Tab 1: Detailed Overview */}
                    {activeTab === 'overview' && (
                        <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm space-y-lg text-body-md">
                            <div>
                                <h3 className="font-bold text-on-surface border-b border-outline-variant/10 pb-xs mb-sm">الوضع المالي</h3>
                                <div className="grid grid-cols-2 gap-md">
                                    <div>
                                        <span className="text-outline text-xs block">مصدر الدخل</span>
                                        <span className="font-bold text-on-surface">{socialCase.income_source || 'لا يوجد'}</span>
                                    </div>
                                    <div>
                                        <span className="text-outline text-xs block">الدخل الكلي التقريبي</span>
                                        <span className="font-bold text-primary">{Number(socialCase.income || 0).toLocaleString('ar-SA')} جنيه مصري</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-on-surface border-b border-outline-variant/10 pb-xs mb-sm">البيئة السكنية والصحية</h3>
                                <div className="grid grid-cols-2 gap-md">
                                    <div>
                                        <span className="text-outline text-xs block">نوع السكن</span>
                                        <span className="font-bold text-on-surface">{socialCase.housing_type || 'غير محدد'}</span>
                                    </div>
                                    <div>
                                        <span className="text-outline text-xs block">الوضع الصحي العام للأسرة</span>
                                        <span className="font-bold text-on-surface">{socialCase.medical_condition || 'سليم'}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-on-surface border-b border-outline-variant/10 pb-xs mb-sm">ملاحظات دراسة الحالة</h3>
                                <p className="text-on-surface-variant whitespace-pre-line leading-relaxed">{socialCase.notes || 'لا توجد ملاحظات إضافية.'}</p>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Family Members */}
                    {activeTab === 'family' && (
                        <div className="space-y-lg">
                            {/* Member Form */}
                            <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm">
                                <h3 className="font-headline-sm text-on-surface mb-md">إضافة فرد أسرة جديد</h3>
                                <form onSubmit={handleAddFamily} className="grid grid-cols-1 md:grid-cols-2 gap-md items-end">
                                    <div>
                                        <label className="block text-xs text-on-surface-variant mb-xs">الاسم بالكامل</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={familyForm.data.name} 
                                            onChange={e => familyForm.setData('name', e.target.value)}
                                            className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-on-surface-variant mb-xs">صلة القرابة</label>
                                        <input 
                                            type="text" 
                                            required
                                            placeholder="ابن، ابنة، زوجة..."
                                            value={familyForm.data.relationship} 
                                            onChange={e => familyForm.setData('relationship', e.target.value)}
                                            className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-on-surface-variant mb-xs">العمر</label>
                                        <input 
                                            type="number" 
                                            required
                                            value={familyForm.data.age} 
                                            onChange={e => familyForm.setData('age', e.target.value)}
                                            className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-on-surface-variant mb-xs">الوضع الصحي</label>
                                        <select 
                                            value={healthStatus} 
                                            onChange={e => setHealthStatus(e.target.value as 'healthy' | 'sick')}
                                            className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-sm"
                                        >
                                            <option value="healthy">معافى</option>
                                            <option value="sick">مريض</option>
                                        </select>
                                    </div>
                                    {healthStatus === 'sick' && (
                                        <div>
                                            <label className="block text-xs text-on-surface-variant mb-xs">نوع المرض / التفاصيل</label>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="مثال: ربو، سكري، ضغط..."
                                                value={illnessComment} 
                                                onChange={e => setIllnessComment(e.target.value)}
                                                className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-sm"
                                            />
                                        </div>
                                    )}
                                    <div className="md:col-span-2">
                                        <button 
                                            type="submit" 
                                            disabled={familyForm.processing}
                                            className="w-full bg-primary text-on-primary font-bold py-sm rounded-lg text-sm hover:bg-primary-container transition-all"
                                        >
                                            إضافة للجدول
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Members Table */}
                            <div className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
                                <table className="w-full text-right border-collapse">
                                    <thead>
                                        <tr className="bg-surface-container-low text-on-surface font-label-lg border-b border-outline-variant/30">
                                            <th className="p-sm">الاسم</th>
                                            <th className="p-sm">صلة القرابة</th>
                                            <th className="p-sm">العمر</th>
                                            <th className="p-sm">الحالة الطبية</th>
                                            <th className="p-sm text-center">العمليات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/20 text-body-md">
                                        {socialCase.family_members.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="p-md text-center text-outline">لم يتم تسجيل أفراد عائلة بعد.</td>
                                            </tr>
                                        ) : (
                                            socialCase.family_members.map(member => (
                                                <tr key={member.id}>
                                                    <td className="p-sm font-medium">{member.name}</td>
                                                    <td className="p-sm">{member.relationship}</td>
                                                    <td className="p-sm font-mono">{member.age} سنة</td>
                                                    <td className="p-sm">{member.medical_condition || 'سليم'}</td>
                                                    <td className="p-sm text-center">
                                                        <button 
                                                            onClick={() => handleRemoveFamily(member.id)}
                                                            className="text-error hover:bg-red-50 p-xs rounded-full"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Field Visits */}
                    {activeTab === 'visits' && (
                        <div className="space-y-lg">
                            <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm">
                                <h3 className="font-headline-sm text-on-surface mb-md">تسجيل زيارة ميدانية جديدة</h3>
                                <form onSubmit={handleAddVisit} className="grid grid-cols-1 md:grid-cols-2 gap-md items-end">
                                    <div>
                                        <label className="block text-xs text-on-surface-variant mb-xs">تاريخ الزيارة</label>
                                        <input 
                                            type="date" 
                                            required
                                            value={visitForm.data.visit_date} 
                                            onChange={e => visitForm.setData('visit_date', e.target.value)}
                                            className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-on-surface-variant mb-xs">حالة الزيارة</label>
                                        <select 
                                            value={visitForm.data.status} 
                                            onChange={e => visitForm.setData('status', e.target.value)}
                                            className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-sm"
                                        >
                                            <option value="مخطط لها">مخطط لها</option>
                                            <option value="تمت">تمت بنجاح</option>
                                            <option value="ملغاة">ملغاة</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs text-on-surface-variant mb-xs">تقرير / ملاحظات الزيارة</label>
                                        <textarea 
                                            rows={3}
                                            value={visitForm.data.notes} 
                                            onChange={e => visitForm.setData('notes', e.target.value)}
                                            className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-sm"
                                            placeholder="اكتب تفاصيل الزيارة وما تم رصده..."
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button 
                                            type="submit" 
                                            disabled={visitForm.processing}
                                            className="w-full bg-primary text-on-primary font-bold py-sm rounded-lg text-sm hover:bg-primary-container transition-all"
                                        >
                                            حفظ الزيارة الميدانية
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Visits Log List */}
                            <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm space-y-md">
                                <h3 className="font-bold text-on-surface border-b border-outline-variant/10 pb-xs mb-sm">سجل الزيارات السابقة</h3>
                                {socialCase.visits.length === 0 ? (
                                    <p className="text-center text-outline text-sm">لا توجد زيارات مسجلة.</p>
                                ) : (
                                    socialCase.visits.map(visit => (
                                        <div key={visit.id} className="p-md bg-surface-container-low rounded-lg flex flex-col gap-xs">
                                            <div className="flex justify-between items-center text-sm font-semibold">
                                                <span>زيارة بواسطة: {visit.employee?.name || 'غير معروف'}</span>
                                                <span className="font-mono text-outline">{visit.visit_date}</span>
                                            </div>
                                            <p className="text-body-md mt-sm">{visit.notes || 'لا يوجد تقرير مكتوب.'}</p>
                                            <span className="text-xs bg-primary-fixed text-on-primary-fixed px-sm py-xs rounded-full w-max mt-xs font-bold">{visit.status}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tab 4: Assistances */}
                    {activeTab === 'assistances' && (
                        <div className="space-y-lg">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-on-surface">مساعدات مسجلة للحالة</h3>
                                <Link 
                                    href={route('assistances.create', { case_id: socialCase.id })} 
                                    className="bg-primary text-on-primary font-bold px-md py-sm rounded-lg text-xs hover:bg-primary-container transition-all flex items-center gap-xs"
                                >
                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                    تسجيل مساعدة جديدة
                                </Link>
                            </div>

                            <div className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
                                <table className="w-full text-right border-collapse">
                                    <thead>
                                        <tr className="bg-surface-container-low text-on-surface font-label-lg border-b border-outline-variant/30">
                                            <th className="p-sm">التاريخ</th>
                                            <th className="p-sm">النوع</th>
                                            <th className="p-sm">الوصف</th>
                                            <th className="p-sm">القيمة المالية</th>
                                            <th className="p-sm">الباحث المسجل</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/20 text-body-md">
                                        {socialCase.assistances.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="p-md text-center text-outline">لم يتم صرف أي مساعدات لهذه الحالة بعد.</td>
                                            </tr>
                                        ) : (
                                            socialCase.assistances.map(assist => (
                                                <tr key={assist.id}>
                                                    <td className="p-sm font-mono">{assist.date}</td>
                                                    <td className="p-sm">{assist.type === 'financial' ? 'مالية' : 'عينية'}</td>
                                                    <td className="p-sm">{assist.description}</td>
                                                    <td className="p-sm font-bold text-primary">{Number(assist.amount || 0).toLocaleString('ar-SA')} جنيه مصري</td>
                                                    <td className="p-sm">{assist.employee?.name}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Tab 5: Tasks */}
                    {activeTab === 'tasks' && (
                        <div className="space-y-lg">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-on-surface">المهام الموكلة للحالة</h3>
                                {isAdmin && (
                                    <Link 
                                        href={route('tasks.create', { case_id: socialCase.id })} 
                                        className="bg-primary text-on-primary font-bold px-md py-sm rounded-lg text-xs hover:bg-primary-container transition-all flex items-center gap-xs"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                        إسناد مهمة
                                    </Link>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                                {socialCase.tasks.length === 0 ? (
                                    <p className="text-center text-outline py-lg md:col-span-2">لا توجد مهام موكلة حالياً.</p>
                                ) : (
                                    socialCase.tasks.map(task => (
                                        <div key={task.id} className="bg-white rounded-lg border border-outline-variant/30 p-md flex flex-col justify-between shadow-sm">
                                            <div>
                                                <div className="flex justify-between items-start mb-sm">
                                                    <h4 className="font-bold text-on-surface">{task.title}</h4>
                                                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-sm py-xs rounded-full">{task.status}</span>
                                                </div>
                                                <p className="text-xs text-outline mb-xs">تاريخ الاستحقاق: {task.due_date || 'غير محدد'}</p>
                                                <p className="text-xs text-on-surface-variant">الباحث المكلّف: {task.assigned_employee?.name || 'غير معين'}</p>
                                            </div>
                                            <div className="mt-md pt-sm border-t border-outline-variant/10 flex justify-end">
                                                <Link href={route('tasks.show', task.id)} className="text-primary text-xs font-bold hover:underline">تفاصيل المهمة ←</Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tab 6: Notes & Updates */}
                    {activeTab === 'notes' && (
                        <div className="space-y-lg">
                            <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm">
                                <h3 className="font-headline-sm text-on-surface mb-md">إضافة تحديث جديد</h3>
                                <form onSubmit={handleAddNote} className="space-y-md">
                                    <div>
                                        <label className="block text-xs text-on-surface-variant mb-xs">نوع التحديث</label>
                                        <select 
                                            value={noteForm.data.type} 
                                            onChange={e => noteForm.setData('type', e.target.value)}
                                            className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                        >
                                            <option value="ملاحظة عامة">ملاحظة عامة</option>
                                            <option value="تحديث حالة">تحديث حالة</option>
                                            <option value="تواصل هاتفي">تواصل هاتفي</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-on-surface-variant mb-xs">التفاصيل</label>
                                        <textarea 
                                            rows={4}
                                            required
                                            value={noteForm.data.content} 
                                            onChange={e => noteForm.setData('content', e.target.value)}
                                            className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                            placeholder="اكتب تفاصيل التحديث أو الملاحظة هنا..."
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={noteForm.processing}
                                        className="w-full bg-primary text-on-primary font-bold py-sm rounded-lg text-body-md hover:bg-primary-container transition-all"
                                    >
                                        تسجيل التحديث
                                    </button>
                                </form>
                            </div>

                            {/* Timeline Notes */}
                            <div className="space-y-md">
                                {socialCase.activities.filter(act => act.type === 'note_added' || act.type === 'case_created').map(activity => (
                                    <div key={activity.id} className="bg-white border border-outline-variant/20 rounded-xl p-md shadow-sm">
                                        <div className="flex justify-between items-center text-xs text-outline mb-sm">
                                            <span className="font-bold text-on-surface">{activity.title}</span>
                                            <span>بواسطة: {activity.user?.name || 'النظام'}</span>
                                        </div>
                                        <p className="text-body-md text-on-surface-variant">{activity.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
