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

            <div className="mb-8">
                <h1 className="text-display-md font-display-md text-on-surface">إدارة الموظفين والباحثين</h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">إضافة وتعديل الباحثين الاجتماعيين وتتبع حجم العمل والمهام المسندة إليهم.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
                {/* Employee List (Col 1-8) */}
                <div className="lg:col-span-8 bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low text-on-surface font-label-lg border-b border-outline-variant/30">
                                <th className="p-md">الاسم</th>
                                <th className="p-md">البريد الإلكتروني</th>
                                <th className="p-md">الهاتف</th>
                                <th className="p-md text-center">الملفات الموكلة</th>
                                <th className="p-md text-center">المهام النشطة</th>
                                <th className="p-md text-center">العمليات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20 text-body-md">
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-lg text-center text-outline">لا يوجد موظفون مسجلون حالياً.</td>
                                </tr>
                            ) : (
                                employees.map(emp => (
                                    <tr key={emp.id} className="hover:bg-surface-container-lowest transition-colors">
                                        <td className="p-md font-semibold text-on-surface">{emp.name}</td>
                                        <td className="p-md font-mono text-on-surface-variant">{emp.email}</td>
                                        <td className="p-md font-mono text-on-surface-variant">{emp.phone || '—'}</td>
                                        <td className="p-md text-center font-bold text-primary">{emp.cases_count} حالة</td>
                                        <td className="p-md text-center font-bold text-amber-800">{emp.tasks_count} مهمة</td>
                                        <td className="p-md">
                                            <div className="flex justify-center gap-sm">
                                                <button 
                                                    onClick={() => startEdit(emp)}
                                                    className="p-sm text-secondary hover:bg-surface-container rounded-full"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(emp.id)}
                                                    className="p-sm text-error hover:bg-red-50 rounded-full"
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

                {/* Add/Edit Form Sidebar (Col 1-4) */}
                <div className="lg:col-span-4">
                    {editingEmployee ? (
                        <div className="bg-white rounded-xl border border-primary p-lg shadow-sm">
                            <h3 className="font-bold text-on-surface border-b border-outline-variant/10 pb-xs mb-md flex justify-between items-center">
                                <span>تعديل بيانات الباحث</span>
                                <button onClick={() => setEditingEmployee(null)} className="text-xs text-outline hover:underline">إلغاء</button>
                            </h3>
                            <form onSubmit={handleEditSubmit} className="space-y-sm text-sm">
                                <div>
                                    <label className="block text-on-surface-variant mb-xs">الاسم</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={editForm.data.name} 
                                        onChange={e => editForm.setData('name', e.target.value)}
                                        className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-on-surface-variant mb-xs">البريد الإلكتروني</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={editForm.data.email} 
                                        onChange={e => editForm.setData('email', e.target.value)}
                                        className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-left"
                                        dir="ltr"
                                    />
                                    {editForm.errors.email && <span className="text-xs text-error">{editForm.errors.email}</span>}
                                </div>
                                <div>
                                    <label className="block text-on-surface-variant mb-xs">الهاتف</label>
                                    <input 
                                        type="text" 
                                        value={editForm.data.phone} 
                                        onChange={e => editForm.setData('phone', e.target.value)}
                                        className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-on-surface-variant mb-xs">كلمة المرور الجديدة (اختياري)</label>
                                    <input 
                                        type="password" 
                                        value={editForm.data.password} 
                                        onChange={e => editForm.setData('password', e.target.value)}
                                        className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-left"
                                        dir="ltr"
                                        placeholder="اتركها فارغة لعدم التغيير"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={editForm.processing}
                                    className="w-full bg-primary text-on-primary font-bold py-sm rounded-lg hover:bg-primary-container transition-all"
                                >
                                    تحديث بيانات الموظف
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-outline-variant/30 p-lg shadow-sm">
                            <h3 className="font-bold text-on-surface border-b border-outline-variant/10 pb-xs mb-md">تسجيل باحث اجتماعي جديد</h3>
                            <form onSubmit={handleAddSubmit} className="space-y-sm text-sm">
                                <div>
                                    <label className="block text-on-surface-variant mb-xs">الاسم</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={addForm.data.name} 
                                        onChange={e => addForm.setData('name', e.target.value)}
                                        className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-on-surface-variant mb-xs">البريد الإلكتروني</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={addForm.data.email} 
                                        onChange={e => addForm.setData('email', e.target.value)}
                                        className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-left"
                                        dir="ltr"
                                    />
                                    {addForm.errors.email && <span className="text-xs text-error">{addForm.errors.email}</span>}
                                </div>
                                <div>
                                    <label className="block text-on-surface-variant mb-xs">الهاتف</label>
                                    <input 
                                        type="text" 
                                        value={addForm.data.phone} 
                                        onChange={e => addForm.setData('phone', e.target.value)}
                                        className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-on-surface-variant mb-xs">كلمة المرور المؤقتة</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={addForm.data.password} 
                                        onChange={e => addForm.setData('password', e.target.value)}
                                        className="w-full px-sm py-xs bg-background border border-outline-variant/60 rounded-lg text-left"
                                        dir="ltr"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={addForm.processing}
                                    className="w-full bg-primary text-on-primary font-bold py-sm rounded-lg hover:bg-primary-container transition-all"
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
