import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation(); // We use this to highlight the active menu item

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 antialiased">

            {/* 1. The Premium Sidebar */}
            <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 shadow-2xl z-20">

                {/* Brand Area with Gradient Text */}
                <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
                    <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                        DevSync
                    </span>
                </div>

                {/* Navigation Area */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4">Main Menu</p>

                    <Link
                        to="/dashboard"
                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname.includes('/dashboard') || location.pathname.includes('/workspace')
                                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                : 'hover:bg-slate-800/50 hover:text-slate-100 border border-transparent'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            Workspaces
                        </div>
                    </Link>
                </nav>

                {/* User Profile / Logout Area */}
                <div className="p-4 border-t border-slate-800/50 bg-slate-900/50">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-400 font-medium hover:bg-slate-800 hover:text-red-400 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* 2. The Main Content Wrapper */}
            <div className="flex-1 flex flex-col overflow-hidden relative">

                {/* Glassmorphism Top Header */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
                    {/* Breadcrumb Area (Placeholder for now) */}
                    <div className="text-sm font-medium text-slate-500">
                        Platform / <span className="text-slate-900">Active Directory</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-slate-700 leading-none">Developer Account</span>
                            <span className="text-xs text-emerald-500 font-medium">Online</span>
                        </div>
                        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 border-2 border-white ring-2 ring-slate-100">
                            D
                        </div>
                    </div>
                </header>

                {/* 3. The Dynamic Canvas */}
                <main className="flex-1 overflow-y-auto p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

        </div>
    );
}