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

    // New State for Task Creation
    const [isCreating, setIsCreating] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH'
    });

    // 1. Fetch Pipeline
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

        if (projectId) {
            fetchTasks();
        }
    }, [projectId]);

    // Task Creation Function
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

            // Update UI instantly by spreading the old tasks and adding the new one
            setTasks([...tasks, response.data.data.task]);

            // Reset form state
            setNewTask({ title: '', description: '', priority: 'MEDIUM' });
            setShowForm(false);
            setIsCreating(false);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create task');
            setIsCreating(false);
        }
    };

    // 3. The Status Mutation Engine
    const handleStatusChange = async (taskId: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
        try {
            // Hit the backend PATCH route we built yesterday
            await api.patch(`/tasks/${taskId}`, { status: newStatus });

            // Instantly update the UI by mapping over the array and swapping the status of the matched task
            setTasks(tasks.map(task =>
                task._id === taskId ? { ...task, status: newStatus } : task
            ));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update task status');
        }
    };

    if (loading) return <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>Loading Kanban board...</div>;

    // 2. Column Filtering Logic
    const todoTasks = tasks.filter(t => t.status === 'TODO');
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
    const doneTasks = tasks.filter(t => t.status === 'DONE');

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '1.5rem', cursor: 'pointer' }}>←</button>
                    <h2>Project Board</h2>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    style={{ padding: '0.5rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    {showForm ? 'Cancel' : '+ New Task'}
                </button>
            </div>

            {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}

            {/* Task Creation Form UI */}
            {showForm && (
                <form onSubmit={handleCreateTask} style={{ background: '#e5e7eb', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Task Title..."
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                    <textarea
                        placeholder="Description (Optional)"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
                    />
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="LOW">Low Priority</option>
                            <option value="MEDIUM">Medium Priority</option>
                            <option value="HIGH">High Priority</option>
                        </select>
                        <button
                            type="submit"
                            disabled={isCreating}
                            style={{ padding: '0.5rem 1.5rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: isCreating ? 'not-allowed' : 'pointer' }}
                        >
                            {isCreating ? 'Creating...' : 'Create Ticket'}
                        </button>
                    </div>
                </form>
            )}

            {/* 3. The Kanban Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>

                {/* TO DO COLUMN */}
                <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', minHeight: '600px' }}>
                    <h3 style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>To Do ({todoTasks.length})</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        {todoTasks.map(task => (
                            <div key={task._id} style={{ background: 'white', padding: '1rem', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #6b7280' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0' }}>{task.title}</h4>
                                <span style={{ fontSize: '0.8rem', background: '#e5e7eb', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{task.priority}</span>
                                {/* Add this inside the To Do card, below the priority span */}
                                <button
                                    onClick={() => handleStatusChange(task._id, 'IN_PROGRESS')}
                                    style={{ display: 'block', marginTop: '0.75rem', width: '100%', padding: '0.4rem', background: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', color: '#374151' }}
                                >
                                    Start Work ➔
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* IN PROGRESS COLUMN */}
                <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', minHeight: '600px' }}>
                    <h3 style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>In Progress ({inProgressTasks.length})</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        {inProgressTasks.map(task => (
                            <div key={task._id} style={{ background: 'white', padding: '1rem', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0' }}>{task.title}</h4>
                                <span style={{ fontSize: '0.8rem', background: '#e5e7eb', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{task.priority}</span>
                                {/* Add this inside the In Progress card */}
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                                    <button
                                        onClick={() => handleStatusChange(task._id, 'TODO')}
                                        style={{ flex: 1, padding: '0.4rem', background: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', color: '#374151' }}
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(task._id, 'DONE')}
                                        style={{ flex: 1, padding: '0.4rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                                    >
                                        Complete ➔
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DONE COLUMN */}
                <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', minHeight: '600px' }}>
                    <h3 style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>Done ({doneTasks.length})</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        {doneTasks.map(task => (
                            <div key={task._id} style={{ background: 'white', padding: '1rem', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0' }}>{task.title}</h4>
                                <span style={{ fontSize: '0.8rem', background: '#e5e7eb', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{task.priority}</span>
                                {/* Add this inside the Done card */}
                                <button
                                    onClick={() => handleStatusChange(task._id, 'IN_PROGRESS')}
                                    style={{ display: 'block', marginTop: '0.75rem', width: '100%', padding: '0.4rem', background: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', color: '#374151' }}
                                >
                                    ↺ Reopen Task
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}