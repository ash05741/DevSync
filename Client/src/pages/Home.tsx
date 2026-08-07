import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="font-sans text-slate-900 bg-slate-200 min-h-screen flex flex-col overflow-hidden">

            {/* 1. The Navbar */}
            <nav className="flex flex-col py-4 px-5 md:px-8 my-4 md:my-6 mx-[5%] lg:mx-12 bg-slate-200 rounded-[24px] shadow-[10px_10px_20px_rgba(15,23,42,0.1),inset_-5px_-5px_15px_rgba(15,23,42,0.05),inset_5px_5px_15px_rgba(255,255,255,0.9)] z-50">
                <div className="flex justify-between items-center w-full">
                    <div className="font-bold text-xl md:text-2xl text-teal-600 tracking-tight">
                        DevSync
                    </div>

                    <div className="hidden md:flex gap-4 items-center">
                        <Link to="/login" className="no-underline text-slate-600 py-2 px-5 font-semibold bg-slate-200 rounded-xl shadow-[4px_4px_8px_rgba(15,23,42,0.1),inset_-2px_-2px_6px_rgba(15,23,42,0.05),inset_2px_2px_6px_rgba(255,255,255,0.9)] transition-transform hover:scale-95">
                            Sign In
                        </Link>
                        <Link to="/register" className="no-underline bg-teal-600 text-white py-2 px-6 rounded-xl font-semibold shadow-[6px_6px_12px_rgba(13,148,136,0.3),inset_-3px_-3px_8px_rgba(0,0,0,0.2),inset_3px_3px_8px_rgba(255,255,255,0.3)] transition-transform hover:scale-95">
                            Get Started
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-3 rounded-xl bg-slate-200 shadow-[4px_4px_8px_rgba(15,23,42,0.1),inset_-2px_-2px_6px_rgba(15,23,42,0.05),inset_2px_2px_6px_rgba(255,255,255,0.9)] active:scale-95 transition-transform flex flex-col gap-1"
                    >
                        <span className={`block w-5 h-0.5 bg-slate-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`block w-5 h-0.5 bg-slate-600 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-5 h-0.5 bg-slate-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="flex flex-col gap-4 mt-6 md:hidden w-full animate-fade-in">
                        <Link to="/login" className="text-center no-underline text-slate-600 py-3 px-5 font-semibold bg-slate-200 rounded-xl shadow-[4px_4px_8px_rgba(15,23,42,0.1),inset_-2px_-2px_6px_rgba(15,23,42,0.05),inset_2px_2px_6px_rgba(255,255,255,0.9)] active:scale-95 transition-transform">
                            Sign In
                        </Link>
                        <Link to="/register" className="text-center no-underline bg-teal-600 text-white py-3 px-6 rounded-xl font-semibold shadow-[6px_6px_12px_rgba(13,148,136,0.3),inset_-3px_-3px_8px_rgba(0,0,0,0.2),inset_3px_3px_8px_rgba(255,255,255,0.3)] active:scale-95 transition-transform">
                            Get Started
                        </Link>
                    </div>
                )}
            </nav>

            {/* 2. Asymmetrical Split Layout Main Content */}
            <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 px-[5%] lg:px-12 py-12 lg:py-20 items-center">

                {/* Left Side: Massive Typography */}
                <div className="lg:col-span-5 flex flex-col items-start text-left z-10">
                    <div className="inline-block px-4 py-2 mb-6 rounded-full bg-slate-200 shadow-[4px_4px_8px_rgba(15,23,42,0.1),inset_-2px_-2px_6px_rgba(15,23,42,0.05),inset_2px_2px_6px_rgba(255,255,255,0.9)] text-indigo-600 font-bold text-sm tracking-wide">
                        v2.0 Now Live
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
                        Manage Workspaces.<br />
                        <span className="text-teal-600">Ship Faster.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-md mb-10 leading-relaxed font-medium">
                        The ultimate multi-tenant Kanban engine built for high-velocity developer teams. Stop tracking tickets, start shipping features.
                    </p>
                    <Link to="/register" className="no-underline bg-indigo-600 text-white py-4 md:py-5 px-8 md:px-10 text-lg rounded-[24px] font-bold shadow-[8px_8px_16px_rgba(79,70,229,0.3),inset_-4px_-4px_10px_rgba(0,0,0,0.2),inset_4px_4px_10px_rgba(255,255,255,0.3)] transition-transform hover:scale-95 active:scale-90 flex items-center gap-3">
                        Start Building for Free
                        <span className="text-2xl leading-none">→</span>
                    </Link>
                </div>

                {/* Right Side: Staggered Bento Grid with Hover Effects */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 relative lg:pl-10">

                    {/* Bento Card 1: Wide */}
                    <div className="group sm:col-span-2 p-8 md:p-10 bg-slate-200 rounded-[32px] shadow-[15px_15px_30px_rgba(15,23,42,0.1),inset_-8px_-8px_20px_rgba(15,23,42,0.05),inset_8px_8px_20px_rgba(255,255,255,0.9)] flex flex-col sm:flex-row gap-6 items-start sm:items-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[25px_25px_40px_rgba(15,23,42,0.12),inset_-8px_-8px_20px_rgba(15,23,42,0.05),inset_8px_8px_20px_rgba(255,255,255,0.9)]">
                        <div className="text-5xl p-4 bg-slate-200 rounded-2xl shadow-[4px_4px_8px_rgba(15,23,42,0.1),inset_-2px_-2px_6px_rgba(15,23,42,0.05),inset_2px_2px_6px_rgba(255,255,255,0.9)] transition-transform duration-300 group-hover:scale-110">🔐</div>
                        <div>
                            <h3 className="text-2xl mb-2 font-bold text-slate-800 transition-colors duration-300 group-hover:text-indigo-600">Secure Multi-Tenancy</h3>
                            <p className="text-slate-500 m-0 leading-relaxed text-sm md:text-base">Enterprise-grade JWT Bouncers ensure strict data isolation and security between organizational workspaces.</p>
                        </div>
                    </div>

                    {/* Bento Card 2: Left column */}
                    <div className="group p-8 md:p-10 bg-slate-200 rounded-[32px] shadow-[15px_15px_30px_rgba(15,23,42,0.1),inset_-8px_-8px_20px_rgba(15,23,42,0.05),inset_8px_8px_20px_rgba(255,255,255,0.9)] sm:mt-12 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[25px_25px_40px_rgba(15,23,42,0.12),inset_-8px_-8px_20px_rgba(15,23,42,0.05),inset_8px_8px_20px_rgba(255,255,255,0.9)]">
                        <div className="text-4xl mb-6 p-4 inline-block bg-slate-200 rounded-2xl shadow-[4px_4px_8px_rgba(15,23,42,0.1),inset_-2px_-2px_6px_rgba(15,23,42,0.05),inset_2px_2px_6px_rgba(255,255,255,0.9)] transition-transform duration-300 group-hover:scale-110">⚡</div>
                        <h3 className="text-xl mb-3 font-bold text-slate-800 transition-colors duration-300 group-hover:text-teal-600">Optimistic UI Updates</h3>
                        <p className="text-slate-500 m-0 leading-relaxed text-sm">Zero-latency DOM manipulation. Your Kanban board state mutates instantly while Axios syncs with the database in the background.</p>
                    </div>

                    {/* Bento Card 3: Right column */}
                    <div className="group p-8 md:p-10 bg-slate-200 rounded-[32px] shadow-[15px_15px_30px_rgba(15,23,42,0.1),inset_-8px_-8px_20px_rgba(15,23,42,0.05),inset_8px_8px_20px_rgba(255,255,255,0.9)] sm:-mt-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[25px_25px_40px_rgba(15,23,42,0.12),inset_-8px_-8px_20px_rgba(15,23,42,0.05),inset_8px_8px_20px_rgba(255,255,255,0.9)]">
                        <div className="text-4xl mb-6 p-4 inline-block bg-slate-200 rounded-2xl shadow-[4px_4px_8px_rgba(15,23,42,0.1),inset_-2px_-2px_6px_rgba(15,23,42,0.05),inset_2px_2px_6px_rgba(255,255,255,0.9)] transition-transform duration-300 group-hover:scale-110">🗄️</div>
                        <h3 className="text-xl mb-3 font-bold text-slate-800 transition-colors duration-300 group-hover:text-indigo-600">Relational Data Engine</h3>
                        <p className="text-slate-500 m-0 leading-relaxed text-sm">Strictly typed Mongoose schemas forming an unbreakable relational bridge between Workspaces, Projects, and Tasks.</p>
                    </div>

                </div>
            </main>
        </div>
    );
}