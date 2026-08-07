import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosClient';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div className="min-h-screen bg-slate-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans antialiased overflow-hidden">

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
                <span className="text-4xl font-black text-teal-600 tracking-tight drop-shadow-sm">
                    DevSync
                </span>
                <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-800">
                    Sign in to your workspace
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 relative">

                {/* Claymorphism Card Container */}
                <div className="bg-slate-200 py-10 px-6 sm:px-10 rounded-[32px] shadow-[15px_15px_30px_rgba(15,23,42,0.1),inset_-8px_-8px_20px_rgba(15,23,42,0.05),inset_8px_8px_20px_rgba(255,255,255,0.9)]">

                    {error && (
                        /* Debossed Error Message */
                        <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-sm font-semibold text-center shadow-[inset_3px_3px_6px_rgba(220,38,38,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.9)]">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 ml-2 mb-2">Email address</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    /* Debossed Input Field (Carved into the clay) */
                                    className="block w-full appearance-none rounded-2xl bg-slate-200 border-none px-4 py-3.5 text-slate-800 placeholder-slate-400 shadow-[inset_5px_5px_10px_rgba(15,23,42,0.1),inset_-5px_-5px_10px_rgba(255,255,255,0.9)] focus:outline-none focus:ring-2 focus:ring-teal-500/40 sm:text-sm transition-all"
                                    placeholder="developer@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 ml-2 mb-2">Password</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    /* Debossed Input Field */
                                    className="block w-full appearance-none rounded-2xl bg-slate-200 border-none px-4 py-3.5 text-slate-800 placeholder-slate-400 shadow-[inset_5px_5px_10px_rgba(15,23,42,0.1),inset_-5px_-5px_10px_rgba(255,255,255,0.9)] focus:outline-none focus:ring-2 focus:ring-teal-500/40 sm:text-sm transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                /* Embossed Button with tactile click animation */
                                className="flex w-full justify-center rounded-2xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-[6px_6px_12px_rgba(79,70,229,0.3),inset_-3px_-3px_8px_rgba(0,0,0,0.2),inset_3px_3px_8px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-95 transition-transform focus:outline-none"
                            >
                                Sign in securely
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-teal-600 hover:text-teal-500 transition-colors">
                                Create a free workspace
                            </Link>
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
}