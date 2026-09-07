import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

interface CreateProps {
    employees: { id: number; name: string }[];
}

export default function Create({ employees }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        national_id: '',
        phone: '',
        assigned_to: '',
        income_source: '',
        governorate: 'الرياض',
        district: '',
        detailed_address: '',
        marital_status: 'متزوج',
        income: '',
        medical_condition: '',
        housing_type: 'ملك',
        notes: '',
        status: 'جديد',
        priority: 'متوسطة',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('cases.store'));
    };

    return (
        <Layout title="إضافة حالة جديدة">
            <Head title="إضافة حالة جديدة" />

            <div className="mb-6 border-b border-outline-variant/20 pb-4">
                <div className="flex items-center gap-1 text-on-surface-variant text-xs sm:text-sm mb-1">
                    <Link href={route('cases.index')} className="hover:text-primary">الحالات الاجتماعية</Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                    <span>إضافة حالة جديدة</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">إضافة حالة اجتماعية جديدة</h1>
            </div>

            <div className="bg-white rounded-2xl border border-outline-variant/30 p-4 sm:p-6 md:p-8 shadow-xs max-w-4xl w-full min-w-0">
                <form onSubmit={handleSubmit} className="space-y-6 text-sm sm:text-base">
                    
                    {/* section 1 */}
                    <div>
                        <h3 className="font-bold text-on-surface border-b border-outline-variant/10 pb-xs mb-sm">البيانات الأساسية</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                            <div>
                                <label className="block text-sm text-on-surface-variant mb-xs">اسم المستفيد بالكامل</label>
                                <input 
                                    type="text" 
                                    required
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                />
                                {errors.name && <span className="text-error text-xs">{errors.name}</span>}
                            </div>
                            <div>
                                <label className="block text-sm text-on-surface-variant mb-xs">الهوية الوطنية / الإقامة</label>
                                <input 
                                    type="text" 
                                    required
                                    maxLength={10}
                                    value={data.national_id} 
                                    onChange={e => setData('national_id', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md font-mono"
                                />
                                {errors.national_id && <span className="text-error text-xs">{errors.national_id}</span>}
                            </div>
                            <div>
                                <label className="block text-sm text-on-surface-variant mb-xs">رقم الهاتف</label>
                                <input 
                                    type="text" 
                                    value={data.phone} 
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-on-surface-variant mb-xs">الباحث الاجتماعي المسؤول</label>
                                <select 
                                    value={data.assigned_to} 
                                    onChange={e => setData('assigned_to', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                >
                                    <option value="">تحديد باحث لاحقاً</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* section 2 */}
                    <div>
                        <h3 className="font-bold text-on-surface border-b border-outline-variant/10 pb-xs mb-sm">العنوان والإقامة</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                            <div>
                                <label className="block text-sm text-on-surface-variant mb-xs">المحافظة / المنطقة</label>
                                <select 
                                    value={data.governorate} 
                                    onChange={e => setData('governorate', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                >
                                    <option value="الرياض">الرياض</option>
                                    <option value="مكة المكرمة">مكة المكرمة</option>
                                    <option value="الشرقية">الشرقية</option>
                                    <option value="المدينة المنورة">المدينة المنورة</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-on-surface-variant mb-xs">الحي / المنطقة الفرعية</label>
                                <input 
                                    type="text" 
                                    required
                                    value={data.district} 
                                    onChange={e => setData('district', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-on-surface-variant mb-xs">العنوان بالتفصيل</label>
                                <textarea 
                                    rows={2}
                                    required
                                    value={data.detailed_address} 
                                    onChange={e => setData('detailed_address', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                    placeholder="رقم الشارع، المعالم القريبة..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* section 3 */}
                    <div>
                        <h3 className="font-bold text-on-surface border-b border-outline-variant/10 pb-xs mb-sm">المعلومات المالية والسكنية</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                            <div>
                                <label className="block text-sm text-on-surface-variant mb-xs">الحالة الاجتماعية</label>
                                <select 
                                    value={data.marital_status} 
                                    onChange={e => setData('marital_status', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                >
                                    <option value="متزوج">متزوج</option>
                                    <option value="أعزب">أعزب</option>
                                    <option value="أرملة">أرملة</option>
                                    <option value="مطلق">مطلق</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-on-surface-variant mb-xs">الدخل الشهري الكلي</label>
                                <input 
                                    type="number" 
                                    required
                                    value={data.income} 
                                    onChange={e => setData('income', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-on-surface-variant mb-xs">نوع السكن</label>
                                <select 
                                    value={data.housing_type} 
                                    onChange={e => setData('housing_type', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                >
                                    <option value="ملك">ملك</option>
                                    <option value="مستأجر - شقة">مستأجر - شقة</option>
                                    <option value="مستأجر - شعبي">مستأجر - شعبي</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-on-surface-variant mb-xs">مصدر الدخل</label>
                                <input 
                                    type="text" 
                                    value={data.income_source} 
                                    onChange={e => setData('income_source', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                    placeholder="ضمان اجتماعي، تقاعد، عمل يومي..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-on-surface-variant mb-xs">الحالة الصحية العامة</label>
                                <input 
                                    type="text" 
                                    value={data.medical_condition} 
                                    onChange={e => setData('medical_condition', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                    placeholder="سليم، مرض مزمن..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* section 4 */}
                    <div>
                        <h3 className="font-bold text-on-surface border-b border-outline-variant/10 pb-xs mb-sm">الأولوية وحالة الملف</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                            <div>
                                <label className="block text-sm text-on-surface-variant mb-xs">مستوى أولوية دراسة الملف</label>
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
                                <label className="block text-sm text-on-surface-variant mb-xs">حالة ملف المعاملة</label>
                                <select 
                                    value={data.status} 
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                >
                                    <option value="جديد">جديد</option>
                                    <option value="تحت الدراسة">تحت الدراسة</option>
                                    <option value="مقبول">مقبول</option>
                                    <option value="مرفوض">مرفوض</option>
                                    <option value="مغلق">مغلق</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-on-surface-variant mb-xs">ملاحظات الباحث المبدئية</label>
                                <textarea 
                                    rows={3}
                                    value={data.notes} 
                                    onChange={e => setData('notes', e.target.value)}
                                    className="w-full px-sm py-sm bg-background border border-outline-variant/60 rounded-lg text-body-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/20 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 justify-end">
                        <Link href={route('cases.index')} className="w-full sm:w-auto text-center bg-white border border-outline-variant/30 text-on-surface px-6 py-2.5 rounded-xl hover:bg-surface-container transition-all text-sm font-medium">إلغاء</Link>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary font-bold px-6 py-2.5 rounded-xl transition-all text-sm shadow-xs"
                        >
                            حفظ الملف والإنشاء
                        </button>
                    </div>

                </form>
            </div>
        </Layout>
    );
}
