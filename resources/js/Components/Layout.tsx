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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('cases.index'), { search });
        setMobileMenuOpen(false);
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
        <div className="bg-background text-on-background min-h-screen font-sans flex flex-col w-full overflow-x-clip" dir="rtl">
            {/* Top Navbar for Desktop */}
            <nav className="hidden md:flex flex-row justify-between items-center px-6 lg:px-12 w-full h-16 z-50 bg-surface-container-lowest shadow-sm sticky top-0 border-b border-outline-variant/20">
                <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-primary">نظام بر</span>
                    <span className="text-xs text-outline border border-outline/20 px-2.5 py-0.5 rounded-full bg-surface-container-low font-bold">
                        {user?.role === 'admin' ? 'مدير النظام' : 'باحث اجتماعي'}
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface-container-low rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-primary/20">
                        <span className="material-symbols-outlined text-outline text-xl">search</span>
                        <input 
                            className="bg-transparent border-none focus:ring-0 text-sm w-48 lg:w-64 mr-2 outline-none text-right" 
                            placeholder="بحث بالاسم أو الهوية..." 
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    
                    <div className="flex gap-2">
                        <Link href={route('tasks.index')} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors relative" title="المهام">
                            <span className="material-symbols-outlined text-xl">notifications</span>
                        </Link>
                        <Link href={route('settings.index')} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors" title="الإعدادات">
                            <span className="material-symbols-outlined text-xl">settings</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 pr-2 border-r border-outline-variant/30">
                        <div className="text-left hidden lg:block">
                            <p className="font-bold text-on-surface text-sm">{user?.name}</p>
                            <p className="text-outline text-xs">{user?.email}</p>
                        </div>
                        <img 
                            alt="الصورة الشخصية" 
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" 
                            src={user?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuATnH5pnfYUjAXIxtNGf1O7ZMKIv-hzLSSe81UuGGCdfYrrBaLJ7HlMQDn575UTlrv3LbwR61bRoCf9GjawgfyIxg20SXBGJBkh9Khw0W-snyBtmePVIeXPzU7L3wiKSutFDOR_cdWnj3wQanw5DxdvIV9ua1UYo8t4z-a_fXV4o6gIj1Aw5z9wtW0byp8qXrQGN0gfCR4EifMDS5NnMnIwN4DE4ZsbyRE1LkQFT8OeWy0vTRdXdIZ3bA'} 
                        />
                    </div>
                </div>
            </nav>

            {/* Mobile Top Header */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 bg-surface-container-lowest border-b border-outline-variant/30 sticky top-0 z-40 shadow-xs">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-1.5 -mr-1 text-on-surface hover:bg-surface-container rounded-lg transition-colors flex items-center justify-center"
                        aria-label="فتح القائمة"
                    >
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>
                    <span className="text-xl font-black text-primary">نظام بر</span>
                    <span className="text-[10px] text-outline border border-outline/20 px-1.5 py-0.5 rounded-full bg-surface-container-low font-bold">
                        {user?.role === 'admin' ? 'مدير' : 'باحث'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={route('settings.index')} className="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                    </Link>
                    <img 
                        alt="الصورة الشخصية" 
                        className="w-8 h-8 rounded-full object-cover border border-primary/20" 
                        src={user?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuATnH5pnfYUjAXIxtNGf1O7ZMKIv-hzLSSe81UuGGCdfYrrBaLJ7HlMQDn575UTlrv3LbwR61bRoCf9GjawgfyIxg20SXBGJBkh9Khw0W-snyBtmePVIeXPzU7L3wiKSutFDOR_cdWnj3wQanw5DxdvIV9ua1UYo8t4z-a_fXV4o6gIj1Aw5z9wtW0byp8qXrQGN0gfCR4EifMDS5NnMnIwN4DE4ZsbyRE1LkQFT8OeWy0vTRdXdIZ3bA'} 
                    />
                </div>
            </div>

            {/* Mobile Slide-out Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex" dir="rtl">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="relative w-4/5 max-w-xs bg-inverse-surface text-inverse-on-surface h-full flex flex-col shadow-2xl z-50 animate-slide-right">
                        {/* Drawer Header */}
                        <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img 
                                    alt="الصورة الشخصية" 
                                    className="w-10 h-10 rounded-full object-cover border-2 border-primary-fixed" 
                                    src={user?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuATnH5pnfYUjAXIxtNGf1O7ZMKIv-hzLSSe81UuGGCdfYrrBaLJ7HlMQDn575UTlrv3LbwR61bRoCf9GjawgfyIxg20SXBGJBkh9Khw0W-snyBtmePVIeXPzU7L3wiKSutFDOR_cdWnj3wQanw5DxdvIV9ua1UYo8t4z-a_fXV4o6gIj1Aw5z9wtW0byp8qXrQGN0gfCR4EifMDS5NnMnIwN4DE4ZsbyRE1LkQFT8OeWy0vTRdXdIZ3bA'} 
                                />
                                <div>
                                    <p className="font-bold text-sm text-white">{user?.name}</p>
                                    <span className="text-[11px] text-primary-fixed">{user?.role === 'admin' ? 'مدير النظام' : 'باحث اجتماعي'}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-1.5 text-tertiary-fixed hover:bg-white/10 rounded-lg"
                                aria-label="إغلاق القائمة"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        {/* Search on Mobile Drawer */}
                        <div className="p-4 border-b border-outline-variant/10">
                            <form onSubmit={handleSearchSubmit} className="flex items-center bg-white/10 rounded-lg px-3 py-2">
                                <span className="material-symbols-outlined text-tertiary-fixed text-lg">search</span>
                                <input 
                                    className="bg-transparent border-none focus:ring-0 text-sm text-white w-full mr-2 outline-none text-right placeholder:text-tertiary-fixed-dim" 
                                    placeholder="بحث سريع عن حالة..." 
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </form>
                        </div>

                        {/* Action: Create Case */}
                        {user?.role === 'admin' && (
                            <div className="p-4 pb-2">
                                <Link 
                                    href={route('cases.create')} 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full bg-primary text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container shadow-md transition-all text-sm"
                                >
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    إضافة حالة جديدة
                                </Link>
                            </div>
                        )}

                        {/* Drawer Navigation Links */}
                        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
                            <Link 
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                                    currentRoute('dashboard*') 
                                    ? 'bg-primary-container text-white font-bold' 
                                    : 'text-tertiary-fixed hover:bg-white/5'
                                }`} 
                                href={route('dashboard')}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="material-symbols-outlined text-xl">dashboard</span>
                                <span>لوحة التحكم</span>
                            </Link>

                            <Link 
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                                    currentRoute('cases*') 
                                    ? 'bg-primary-container text-white font-bold' 
                                    : 'text-tertiary-fixed hover:bg-white/5'
                                }`} 
                                href={route('cases.index')}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="material-symbols-outlined text-xl">folder_shared</span>
                                <span>الحالات الاجتماعية</span>
                            </Link>

                            <Link 
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                                    currentRoute('assistances*') 
                                    ? 'bg-primary-container text-white font-bold' 
                                    : 'text-tertiary-fixed hover:bg-white/5'
                                }`} 
                                href={route('assistances.index')}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                                <span>المساعدات</span>
                            </Link>

                            <Link 
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                                    currentRoute('tasks*') 
                                    ? 'bg-primary-container text-white font-bold' 
                                    : 'text-tertiary-fixed hover:bg-white/5'
                                }`} 
                                href={route('tasks.index')}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="material-symbols-outlined text-xl">assignment</span>
                                <span>المهام</span>
                            </Link>

                            {user?.role === 'admin' && (
                                <Link 
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                                        currentRoute('employees*') 
                                        ? 'bg-primary-container text-white font-bold' 
                                        : 'text-tertiary-fixed hover:bg-white/5'
                                    }`} 
                                    href={route('employees.index')}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="material-symbols-outlined text-xl">badge</span>
                                    <span>الموظفين</span>
                                </Link>
                            )}

                            <Link 
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                                    currentRoute('settings*') 
                                    ? 'bg-primary-container text-white font-bold' 
                                    : 'text-tertiary-fixed hover:bg-white/5'
                                }`} 
                                href={route('settings.index')}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="material-symbols-outlined text-xl">settings</span>
                                <span>إعدادات النظام</span>
                            </Link>
                        </nav>

                        {/* Drawer Footer */}
                        <div className="p-3 border-t border-outline-variant/10">
                            <form onSubmit={handleLogout}>
                                <button type="submit" className="w-full text-error flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-all text-sm font-medium">
                                    <span className="material-symbols-outlined text-xl">logout</span>
                                    <span>تسجيل الخروج</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar & Main Content Wrapper */}
            <div className="flex flex-1 min-w-0">
                {/* Desktop Sidebar */}
                <aside className="hidden md:flex flex-col z-30 bg-inverse-surface text-inverse-on-surface fixed right-0 top-0 h-screen w-64 border-l border-outline-variant/20 pt-20">
                    <div className="px-6 pb-6 border-b border-outline-variant/10 mb-4">
                        <h2 className="text-xl font-bold text-primary-fixed">نظام بر</h2>
                        <p className="text-xs text-tertiary-fixed-dim">لإدارة الحالات الاجتماعية</p>
                    </div>

                    {user?.role === 'admin' && (
                        <Link 
                            href={route('cases.create')} 
                            className="mx-4 mb-6 bg-primary text-on-primary text-sm font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95 duration-150 shadow-md text-center"
                        >
                            <span className="material-symbols-outlined text-lg">add</span>
                            إضافة حالة جديدة
                        </Link>
                    )}

                    <nav className="flex-1 flex flex-col gap-1 px-3">
                        <Link 
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                                currentRoute('dashboard*') 
                                ? 'bg-primary-container text-white border-r-4 border-primary-fixed font-bold' 
                                : 'text-tertiary-fixed hover:bg-white/5 opacity-85 hover:opacity-100'
                            }`} 
                            href={route('dashboard')}
                        >
                            <span className="material-symbols-outlined text-xl">dashboard</span>
                            <span>لوحة التحكم</span>
                        </Link>

                        <Link 
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                                currentRoute('cases*') 
                                ? 'bg-primary-container text-white border-r-4 border-primary-fixed font-bold' 
                                : 'text-tertiary-fixed hover:bg-white/5 opacity-85 hover:opacity-100'
                            }`} 
                            href={route('cases.index')}
                        >
                            <span className="material-symbols-outlined text-xl">folder_shared</span>
                            <span>الحالات الاجتماعية</span>
                        </Link>

                        <Link 
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                                currentRoute('assistances*') 
                                ? 'bg-primary-container text-white border-r-4 border-primary-fixed font-bold' 
                                : 'text-tertiary-fixed hover:bg-white/5 opacity-85 hover:opacity-100'
                            }`} 
                            href={route('assistances.index')}
                        >
                            <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                            <span>المساعدات</span>
                        </Link>

                        <Link 
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                                currentRoute('tasks*') 
                                ? 'bg-primary-container text-white border-r-4 border-primary-fixed font-bold' 
                                : 'text-tertiary-fixed hover:bg-white/5 opacity-85 hover:opacity-100'
                            }`} 
                            href={route('tasks.index')}
                        >
                            <span className="material-symbols-outlined text-xl">assignment</span>
                            <span>المهام</span>
                        </Link>

                        {user?.role === 'admin' && (
                            <Link 
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                                    currentRoute('employees*') 
                                    ? 'bg-primary-container text-white border-r-4 border-primary-fixed font-bold' 
                                    : 'text-tertiary-fixed hover:bg-white/5 opacity-85 hover:opacity-100'
                                }`} 
                                href={route('employees.index')}
                            >
                                <span className="material-symbols-outlined text-xl">badge</span>
                                <span>الموظفين</span>
                            </Link>
                        )}
                    </nav>

                    <div className="p-4 border-t border-outline-variant/10">
                        <form onSubmit={handleLogout}>
                            <button type="submit" className="w-full text-tertiary-fixed flex items-center gap-3 px-4 py-2.5 opacity-85 hover:opacity-100 hover:bg-white/5 rounded-lg transition-all text-sm font-medium">
                                <span className="material-symbols-outlined text-xl">logout</span>
                                <span>تسجيل الخروج</span>
                            </button>
                        </form>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 w-full overflow-x-hidden mr-0 md:mr-64 p-4 sm:p-6 md:p-8 lg:p-10 pb-24 md:pb-10 bg-background min-h-screen">
                    {/* Alerts/Feedback messages */}
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-emerald-50 border-r-4 border-primary text-emerald-800 rounded-xl flex items-center justify-between shadow-xs">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                <p className="text-sm font-medium">{flash.success}</p>
                            </div>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-6 p-4 bg-red-50 border-r-4 border-error text-red-800 rounded-xl flex items-center justify-between shadow-xs">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-error text-xl">error</span>
                                <p className="text-sm font-medium">{flash.error}</p>
                            </div>
                        </div>
                    )}

                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-outline-variant/30 flex items-center justify-around z-40 px-2 shadow-lg">
                <Link href={route('dashboard')} className={`flex flex-col items-center justify-center py-1 flex-1 ${currentRoute('dashboard*') ? 'text-primary font-bold' : 'text-outline hover:text-on-surface'}`}>
                    <span className="material-symbols-outlined text-22px">dashboard</span>
                    <span className="text-[11px] mt-0.5">الرئيسية</span>
                </Link>
                <Link href={route('cases.index')} className={`flex flex-col items-center justify-center py-1 flex-1 ${currentRoute('cases*') ? 'text-primary font-bold' : 'text-outline hover:text-on-surface'}`}>
                    <span className="material-symbols-outlined text-22px">folder_shared</span>
                    <span className="text-[11px] mt-0.5">الحالات</span>
                </Link>
                <Link href={route('assistances.index')} className={`flex flex-col items-center justify-center py-1 flex-1 ${currentRoute('assistances*') ? 'text-primary font-bold' : 'text-outline hover:text-on-surface'}`}>
                    <span className="material-symbols-outlined text-22px">volunteer_activism</span>
                    <span className="text-[11px] mt-0.5">المساعدات</span>
                </Link>
                <Link href={route('tasks.index')} className={`flex flex-col items-center justify-center py-1 flex-1 ${currentRoute('tasks*') ? 'text-primary font-bold' : 'text-outline hover:text-on-surface'}`}>
                    <span className="material-symbols-outlined text-22px">assignment</span>
                    <span className="text-[11px] mt-0.5">المهام</span>
                </Link>
                <button 
                    onClick={() => setMobileMenuOpen(true)}
                    className="flex flex-col items-center justify-center py-1 flex-1 text-outline hover:text-on-surface"
                >
                    <span className="material-symbols-outlined text-22px">menu</span>
                    <span className="text-[11px] mt-0.5">المزيد</span>
                </button>
            </nav>
        </div>
    );
}
