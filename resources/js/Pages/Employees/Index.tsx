import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    cases_count: number;
    tasks_count: number;
}

interface IndexProps {
    employees: Employee[];
}

export default function Index({ employees }: IndexProps) {
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const addForm = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const editForm = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addForm.post(route('employees.store'), {
            onSuccess: () => addForm.reset(),
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingEmployee) return;
        editForm.put(route('employees.update', editingEmployee.id), {
            onSuccess: () => {
                setEditingEmployee(null);
                editForm.reset();
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف حساب هذا الباحث الاجتماعي؟')) {
            useForm().delete(route('employees.destroy', id));
        }
    };

    const startEdit = (emp: Employee) => {
        setEditingEmployee(emp);
        editForm.setData({
            name: emp.name,
            email: emp.email,
            phone: emp.phone || '',
            password: '',
        });
    };

    return (
        <Layout title="إدارة الموظفين والباحثين">
            <Head title="إدارة الموظفين" />

            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">إدارة الموظفين والباحثين</h1>
                <p className="text-sm sm:text-base text-on-surface-variant mt-1.5">إضافة وتعديل الباحثين الاجتماعيين وتتبع حجم العمل والمهام المسندة إليهم.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Employee List (Col 1-8) */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs min-w-0 order-2 lg:order-1">
                    <div className="p-4 sm:p-5 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-lowest">
                        <h2 className="font-bold text-base sm:text-lg text-on-surface">سجل الباحثين الاجتماعيين</h2>
                        <span className="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">{employees.length} موظف</span>
                    </div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-right border-collapse min-w-[620px]">
                            <thead>
                                <tr className="bg-surface-container-low/50 text-on-surface font-semibold text-xs sm:text-sm border-b border-outline-variant/30">
                                    <th className="p-3 sm:p-4">الاسم</th>
                                    <th className="p-3 sm:p-4">البريد الإلكتروني</th>
                                    <th className="p-3 sm:p-4">الهاتف</th>
                                    <th className="p-3 sm:p-4 text-center">الملفات الموكلة</th>
                                    <th className="p-3 sm:p-4 text-center">المهام النشطة</th>
                                    <th className="p-3 sm:p-4 text-center">العمليات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/20 text-xs sm:text-sm">
                                {employees.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-outline">لا يوجد موظفون مسجلون حالياً.</td>
                                    </tr>
                                ) : (
                                    employees.map(emp => (
                                        <tr key={emp.id} className="hover:bg-surface-container-lowest transition-colors">
                                            <td className="p-3 sm:p-4 font-semibold text-on-surface">{emp.name}</td>
                                            <td className="p-3 sm:p-4 font-mono text-on-surface-variant text-xs">{emp.email}</td>
                                            <td className="p-3 sm:p-4 font-mono text-on-surface-variant text-xs">{emp.phone || '—'}</td>
                                            <td className="p-3 sm:p-4 text-center font-bold text-primary">{emp.cases_count} حالة</td>
                                            <td className="p-3 sm:p-4 text-center font-bold text-amber-800">{emp.tasks_count} مهمة</td>
                                            <td className="p-3 sm:p-4">
                                                <div className="flex justify-center gap-1.5 sm:gap-2">
                                                    <button 
                                                        onClick={() => startEdit(emp)}
                                                        className="p-1.5 text-secondary hover:bg-surface-container rounded-lg transition-colors"
                                                        title="تعديل"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(emp.id)}
                                                        className="p-1.5 text-error hover:bg-red-50 rounded-lg transition-colors"
                                                        title="حذف"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add/Edit Form Sidebar (Col 1-4) */}
                <div className="lg:col-span-4 min-w-0 order-1 lg:order-2">
                    {editingEmployee ? (
                        <div className="bg-white rounded-2xl border-2 border-primary/40 p-4 sm:p-6 shadow-xs">
                            <div className="border-b border-outline-variant/10 pb-3 mb-4 flex justify-between items-center">
                                <h3 className="font-bold text-base sm:text-lg text-on-surface">تعديل بيانات الباحث</h3>
                                <button onClick={() => setEditingEmployee(null)} className="text-xs text-outline hover:text-primary transition-colors">إلغاء</button>
                            </div>
                            <form onSubmit={handleEditSubmit} className="space-y-3.5 text-xs sm:text-sm">
                                <div>
                                    <label className="block font-medium text-on-surface-variant mb-1">الاسم</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={editForm.data.name} 
                                        onChange={e => editForm.setData('name', e.target.value)}
                                        className="w-full px-3 py-2 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-on-surface-variant mb-1">البريد الإلكتروني</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={editForm.data.email} 
                                        onChange={e => editForm.setData('email', e.target.value)}
                                        className="w-full px-3 py-2 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-left text-sm font-mono"
                                        dir="ltr"
                                    />
                                    {editForm.errors.email && <span className="text-xs text-error block mt-1">{editForm.errors.email}</span>}
                                </div>
                                <div>
                                    <label className="block font-medium text-on-surface-variant mb-1">الهاتف</label>
                                    <input 
                                        type="text" 
                                        value={editForm.data.phone} 
                                        onChange={e => editForm.setData('phone', e.target.value)}
                                        className="w-full px-3 py-2 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-on-surface-variant mb-1">كلمة المرور الجديدة (اختياري)</label>
                                    <input 
                                        type="password" 
                                        value={editForm.data.password} 
                                        onChange={e => editForm.setData('password', e.target.value)}
                                        className="w-full px-3 py-2 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-left text-sm"
                                        dir="ltr"
                                        placeholder="اتركها فارغة لعدم التغيير"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={editForm.processing}
                                    className="w-full bg-primary text-on-primary font-bold py-2.5 rounded-xl hover:bg-primary-container transition-all shadow-xs active:scale-[0.99] disabled:opacity-50 mt-2"
                                >
                                    تحديث بيانات الموظف
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-outline-variant/30 p-4 sm:p-6 shadow-xs">
                            <h3 className="font-bold text-base sm:text-lg text-on-surface border-b border-outline-variant/10 pb-3 mb-4">تسجيل باحث اجتماعي جديد</h3>
                            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs sm:text-sm">
                                <div>
                                    <label className="block font-medium text-on-surface-variant mb-1">الاسم</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={addForm.data.name} 
                                        onChange={e => addForm.setData('name', e.target.value)}
                                        className="w-full px-3 py-2 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-on-surface-variant mb-1">البريد الإلكتروني</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={addForm.data.email} 
                                        onChange={e => addForm.setData('email', e.target.value)}
                                        className="w-full px-3 py-2 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-left text-sm font-mono"
                                        dir="ltr"
                                    />
                                    {addForm.errors.email && <span className="text-xs text-error block mt-1">{addForm.errors.email}</span>}
                                </div>
                                <div>
                                    <label className="block font-medium text-on-surface-variant mb-1">الهاتف</label>
                                    <input 
                                        type="text" 
                                        value={addForm.data.phone} 
                                        onChange={e => addForm.setData('phone', e.target.value)}
                                        className="w-full px-3 py-2 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-on-surface-variant mb-1">كلمة المرور المؤقتة</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={addForm.data.password} 
                                        onChange={e => addForm.setData('password', e.target.value)}
                                        className="w-full px-3 py-2 bg-background border border-outline-variant/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-left text-sm"
                                        dir="ltr"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={addForm.processing}
                                    className="w-full bg-primary text-on-primary font-bold py-2.5 rounded-xl hover:bg-primary-container transition-all shadow-xs active:scale-[0.99] disabled:opacity-50 mt-2"
                                >
                                    تسجيل الحساب الجديد
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
