import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosClient';

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export default function TaskBoard() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isCreating, setIsCreating] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH'
    });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get(`/tasks/${projectId}`);
                setTasks(response.data.data.tasks);
                setLoading(false);
            } catch (err: any) {
                setError('Failed to load tasks.');
                setLoading(false);
                if (err.response?.status === 403) {
                    setError('Forbidden: You do not have access to these tasks.');
                }
            }
        };
        if (projectId) fetchTasks();
    }, [projectId]);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;

        try {
            setIsCreating(true);
            const response = await api.post('/tasks', {
                title: newTask.title,
                description: newTask.description,
                priority: newTask.priority,
                projectId: projectId
            });

            setTasks([...tasks, response.data.data.task]);
            setNewTask({ title: '', description: '', priority: 'MEDIUM' });
            setShowForm(false);
            setIsCreating(false);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create task');
            setIsCreating(false);
        }
    };

    const handleStatusChange = async (taskId: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
        try {
            await api.patch(`/tasks/${taskId}`, { status: newStatus });
            setTasks(tasks.map(task =>
                task._id === taskId ? { ...task, status: newStatus } : task
            ));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update task status');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
    );

    const todoTasks = tasks.filter(t => t.status === 'TODO');
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
    const doneTasks = tasks.filter(t => t.status === 'DONE');

    // Helper to render color-coded priority pills
    const PriorityBadge = ({ priority }: { priority: string }) => {
        const styles = {
            HIGH: 'bg-rose-100 text-rose-700 border-rose-200',
            MEDIUM: 'bg-amber-100 text-amber-700 border-amber-200',
            LOW: 'bg-emerald-100 text-emerald-700 border-emerald-200'
        }[priority] || 'bg-slate-100 text-slate-700';

        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles}`}>
                {priority}
            </span>
        );
    };

    return (
        <div className="flex flex-col h-full font-sans antialiased">

            {/* 1. Header Area */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200/60">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Active Sprint</h2>
                        <p className="text-sm text-slate-500 font-medium">Kanban Board Overview</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-indigo-500 transition-colors focus:ring-2 focus:ring-indigo-500/20"
                >
                    {showForm ? 'Cancel Creation' : '+ Create Issue'}
                </button>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}

            {/* 2. Creation Form Modal (Inline) */}
            {showForm && (
                <form onSubmit={handleCreateTask} className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-lg shadow-slate-200/40 grid gap-4">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            required
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                        />
                        <select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                            className="rounded-lg border border-slate-300 px-4 py-2.5 text-slate-700 font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        >
                            <option value="LOW">Low Priority</option>
                            <option value="MEDIUM">Medium Priority</option>
                            <option value="HIGH">High Priority</option>
                        </select>
                    </div>
                    <textarea
                        placeholder="Add a more detailed description..."
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none min-h-[100px]"
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-emerald-500 disabled:opacity-50 transition-colors"
                        >
                            {isCreating ? 'Creating...' : 'Save Issue'}
                        </button>
                    </div>
                </form>
            )}

            {/* 3. The Kanban Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 items-start pb-8">

                {/* TO DO COLUMN */}
                <div className="bg-slate-100/50 rounded-2xl p-4 min-h-[600px] border border-slate-200/60 flex flex-col gap-3">
                    <div className="flex items-center justify-between mb-2 px-1">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-slate-400"></span> To Do
                        </h3>
                        <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">{todoTasks.length}</span>
                    </div>
                    {todoTasks.map(task => (
                        <div key={task._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-semibold text-slate-900 leading-snug pr-4">{task.title}</h4>
                            </div>
                            <PriorityBadge priority={task.priority} />
                            <div className="mt-4 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleStatusChange(task._id, 'IN_PROGRESS')}
                                    className="w-full text-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 py-2 rounded-lg transition-colors"
                                >
                                    Start Work ➔
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* IN PROGRESS COLUMN */}
                <div className="bg-indigo-50/30 rounded-2xl p-4 min-h-[600px] border border-indigo-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between mb-2 px-1">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> In Progress
                        </h3>
                        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md">{inProgressTasks.length}</span>
                    </div>
                    {inProgressTasks.map(task => (
                        <div key={task._id} className="bg-white p-5 rounded-xl border border-indigo-200 shadow-sm hover:shadow-md transition-all group cursor-pointer ring-1 ring-indigo-500/5">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-semibold text-slate-900 leading-snug pr-4">{task.title}</h4>
                            </div>
                            <PriorityBadge priority={task.priority} />
                            <div className="mt-4 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <button
                                    onClick={() => handleStatusChange(task._id, 'TODO')}
                                    className="flex-1 text-center text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 py-2 rounded-lg transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={() => handleStatusChange(task._id, 'DONE')}
                                    className="flex-1 text-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-2 rounded-lg transition-colors"
                                >
                                    Complete ✓
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DONE COLUMN */}
                <div className="bg-emerald-50/30 rounded-2xl p-4 min-h-[600px] border border-emerald-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between mb-2 px-1">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Done
                        </h3>
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md">{doneTasks.length}</span>
                    </div>
                    {doneTasks.map(task => (
                        <div key={task._id} className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm hover:shadow-md transition-all group cursor-pointer opacity-75 hover:opacity-100">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-semibold text-slate-500 line-through leading-snug pr-4">{task.title}</h4>
                            </div>
                            <PriorityBadge priority={task.priority} />
                            <div className="mt-4 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleStatusChange(task._id, 'IN_PROGRESS')}
                                    className="w-full text-center text-sm font-semibold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 py-2 rounded-lg transition-colors flex justify-center items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                    Reopen Issue
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}