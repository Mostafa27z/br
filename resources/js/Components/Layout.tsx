import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function Layout({ children, title }: LayoutProps) {
    const { auth, flash } = usePage().props as any;
    const user = auth?.user;
    const [search, setSearch] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('cases.index'), { search });
    };

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const currentRoute = (name: string) => {
        try {
            return route().current(name);
        } catch {
            return false;
        }
    };

    return (
        <div className="bg-background text-on-background min-h-screen font-sans flex flex-col" dir="rtl">
            {/* Top Navbar */}
            <nav className="hidden md:flex flex-row justify-between items-center px-margin-desktop w-full h-16 z-50 bg-surface-container-lowest shadow-sm sticky top-0">
                <div className="flex items-center gap-md">
                    <span className="font-headline-lg text-headline-lg font-black text-primary">نظام بر</span>
                    <span className="text-label-sm text-outline border border-outline/20 px-sm py-xs rounded-full bg-surface-container-low font-bold">
                        {user?.role === 'admin' ? 'مدير النظام' : 'باحث اجتماعي'}
                    </span>
                </div>
                <div className="flex items-center gap-lg">
                    <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface-container-low rounded-full px-md py-sm">
                        <span className="material-symbols-outlined text-outline">search</span>
                        <input 
                            className="bg-transparent border-none focus:ring-0 text-body-md w-64 mr-sm outline-none text-right" 
                            placeholder="بحث بالاسم أو الهوية..." 
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    
                    <div className="flex gap-sm">
                        <Link href={route('tasks.index')} className="p-sm rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                        </Link>
                        <Link href={route('settings.index')} className="p-sm rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-sm">
                        <div className="text-left hidden lg:block mr-2">
                            <p className="font-label-lg text-on-surface font-bold text-sm">{user?.name}</p>
                            <p className="font-label-sm text-outline text-xs">{user?.email}</p>
                        </div>
                        <img 
                            alt="الصورة الشخصية" 
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" 
                            src={user?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuATnH5pnfYUjAXIxtNGf1O7ZMKIv-hzLSSe81UuGGCdfYrrBaLJ7HlMQDn575UTlrv3LbwR61bRoCf9GjawgfyIxg20SXBGJBkh9Khw0W-snyBtmePVIeXPzU7L3wiKSutFDOR_cdWnj3wQanw5DxdvIV9ua1UYo8t4z-a_fXV4o6gIj1Aw5z9wtW0byp8qXrQGN0gfCR4EifMDS5NnMnIwN4DE4ZsbyRE1LkQFT8OeWy0vTRdXdIZ3bA'} 
                        />
                    </div>
                </div>
            </nav>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between px-md py-sm bg-surface-container-lowest border-b border-outline-variant/30 sticky top-0 z-50">
                <span className="font-headline-md text-headline-md font-black text-primary">نظام بر</span>
                <div className="flex items-center gap-sm">
                    <img 
                        alt="الصورة الشخصية" 
                        className="w-8 h-8 rounded-full object-cover" 
                        src={user?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuATnH5pnfYUjAXIxtNGf1O7ZMKIv-hzLSSe81UuGGCdfYrrBaLJ7HlMQDn575UTlrv3LbwR61bRoCf9GjawgfyIxg20SXBGJBkh9Khw0W-snyBtmePVIeXPzU7L3wiKSutFDOR_cdWnj3wQanw5DxdvIV9ua1UYo8t4z-a_fXV4o6gIj1Aw5z9wtW0byp8qXrQGN0gfCR4EifMDS5NnMnIwN4DE4ZsbyRE1LkQFT8OeWy0vTRdXdIZ3bA'} 
                    />
                    <form onSubmit={handleLogout}>
                        <button type="submit" className="p-xs text-error hover:bg-error-container rounded-full">
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Sidebar & Main Wrapper */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="hidden md:flex flex-col z-40 bg-inverse-surface text-inverse-on-surface fixed right-0 top-0 h-screen w-64 border-l border-outline-variant/20 pt-20">
                    <div className="px-lg pb-xl border-b border-outline-variant/10 mb-md">
                        <h2 className="font-headline-md text-headline-md text-primary-fixed">نظام بر</h2>
                        <p className="font-label-sm text-label-sm text-tertiary-fixed-dim">لإدارة الحالات الاجتماعية</p>
                    </div>

                    {user?.role === 'admin' && (
                        <Link 
                            href={route('cases.create')} 
                            className="mx-md mb-lg bg-primary text-on-primary font-label-lg text-label-lg py-sm px-md rounded-full flex items-center justify-center gap-xs hover:bg-primary-container transition-all active:scale-95 duration-150 shadow-md text-center"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            إضافة حالة جديدة
                        </Link>
                    )}

                    <nav className="flex-1 flex flex-col gap-xs px-sm">
                        <Link 
                            className={`flex items-center gap-sm px-md py-sm rounded-lg transition-all duration-200 ${
                                currentRoute('dashboard*') 
                                ? 'bg-primary-container text-white border-r-4 border-primary-fixed font-bold' 
                                : 'text-tertiary-fixed hover:bg-white/5 opacity-80 hover:opacity-100'
                            }`} 
                            href={route('dashboard')}
                        >
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="font-label-lg text-label-lg">لوحة التحكم</span>
                        </Link>

                        <Link 
                            className={`flex items-center gap-sm px-md py-sm rounded-lg transition-all duration-200 ${
                                currentRoute('cases*') 
                                ? 'bg-primary-container text-white border-r-4 border-primary-fixed font-bold' 
                                : 'text-tertiary-fixed hover:bg-white/5 opacity-80 hover:opacity-100'
                            }`} 
                            href={route('cases.index')}
                        >
                            <span className="material-symbols-outlined">folder_shared</span>
                            <span className="font-label-lg text-label-lg">الحالات الاجتماعية</span>
                        </Link>

                        <Link 
                            className={`flex items-center gap-sm px-md py-sm rounded-lg transition-all duration-200 ${
                                currentRoute('assistances*') 
                                ? 'bg-primary-container text-white border-r-4 border-primary-fixed font-bold' 
                                : 'text-tertiary-fixed hover:bg-white/5 opacity-80 hover:opacity-100'
                            }`} 
                            href={route('assistances.index')}
                        >
                            <span className="material-symbols-outlined">volunteer_activism</span>
                            <span className="font-label-lg text-label-lg">المساعدات</span>
                        </Link>

                        <Link 
                            className={`flex items-center gap-sm px-md py-sm rounded-lg transition-all duration-200 ${
                                currentRoute('tasks*') 
                                ? 'bg-primary-container text-white border-r-4 border-primary-fixed font-bold' 
                                : 'text-tertiary-fixed hover:bg-white/5 opacity-80 hover:opacity-100'
                            }`} 
                            href={route('tasks.index')}
                        >
                            <span className="material-symbols-outlined">assignment</span>
                            <span className="font-label-lg text-label-lg">المهام</span>
                        </Link>

                        {user?.role === 'admin' && (
                            <Link 
                                className={`flex items-center gap-sm px-md py-sm rounded-lg transition-all duration-200 ${
                                    currentRoute('employees*') 
                                    ? 'bg-primary-container text-white border-r-4 border-primary-fixed font-bold' 
                                    : 'text-tertiary-fixed hover:bg-white/5 opacity-80 hover:opacity-100'
                                }`} 
                                href={route('employees.index')}
                            >
                                <span className="material-symbols-outlined">badge</span>
                                <span className="font-label-lg text-label-lg">الموظفين</span>
                            </Link>
                        )}
                    </nav>

                    <div className="p-md border-t border-outline-variant/10">
                        <form onSubmit={handleLogout}>
                            <button type="submit" className="w-full text-tertiary-fixed flex items-center gap-sm px-md py-sm opacity-80 hover:opacity-100 hover:bg-white/5 rounded-lg transition-all">
                                <span className="material-symbols-outlined">logout</span>
                                <span className="font-label-lg text-label-lg">تسجيل الخروج</span>
                            </button>
                        </form>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 mr-0 md:mr-64 p-md md:p-margin-desktop bg-background min-h-screen">
                    {/* Alerts/Feedback messages */}
                    {flash?.success && (
                        <div className="mb-lg p-md bg-emerald-50 border-r-4 border-primary text-emerald-800 rounded-lg flex items-center justify-between shadow-sm animate-fade-in">
                            <div className="flex items-center gap-sm">
                                <span className="material-symbols-outlined text-primary">check_circle</span>
                                <p className="text-body-md font-medium">{flash.success}</p>
                            </div>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-lg p-md bg-red-50 border-r-4 border-error text-red-800 rounded-lg flex items-center justify-between shadow-sm animate-fade-in">
                            <div className="flex items-center gap-sm">
                                <span className="material-symbols-outlined text-error">error</span>
                                <p className="text-body-md font-medium">{flash.error}</p>
                            </div>
                        </div>
                    )}

                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-lowest border-t border-outline-variant/30 flex items-center justify-around z-50">
                <Link href={route('dashboard')} className={`flex flex-col items-center gap-xs ${currentRoute('dashboard*') ? 'text-primary' : 'text-outline'}`}>
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-[10px] font-bold">الرئيسية</span>
                </Link>
                <Link href={route('cases.index')} className={`flex flex-col items-center gap-xs ${currentRoute('cases*') ? 'text-primary' : 'text-outline'}`}>
                    <span className="material-symbols-outlined">folder_shared</span>
                    <span className="text-[10px] font-bold">الحالات</span>
                </Link>
                <Link href={route('assistances.index')} className={`flex flex-col items-center gap-xs ${currentRoute('assistances*') ? 'text-primary' : 'text-outline'}`}>
                    <span className="material-symbols-outlined">volunteer_activism</span>
                    <span className="text-[10px] font-bold">المساعدات</span>
                </Link>
                <Link href={route('tasks.index')} className={`flex flex-col items-center gap-xs ${currentRoute('tasks*') ? 'text-primary' : 'text-outline'}`}>
                    <span className="material-symbols-outlined">assignment</span>
                    <span className="text-[10px] font-bold">المهام</span>
                </Link>
            </nav>
        </div>
    );
}
