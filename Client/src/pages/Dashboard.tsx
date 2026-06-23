import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosClient';

interface Workspace {
    _id: string;
    name: string;
    description?: string;
}

export default function Dashboard() {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 1. New State for the Creation Engine
    const [newWorkspaceName, setNewWorkspaceName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await api.get('/workspaces');
                setWorkspaces(response.data.data.workspaces);
                setLoading(false);
            } catch (err: any) {
                setError('Failed to load workspaces.');
                setLoading(false);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };

        fetchWorkspaces();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // 2. The Creation Mechanism
    const handleCreateWorkspace = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWorkspaceName.trim()) return;

        try {
            setIsCreating(true);

            // Hit your backend POST route
            const response = await api.post('/workspaces', {
                name: newWorkspaceName
            });

            // Grab the newly created workspace from the response payload
            const newWorkspace = response.data.data.workspace;

            // Instantly update the UI by spreading the old array and adding the new item
            setWorkspaces([...workspaces, newWorkspace]);

            // Clear the input field
            setNewWorkspaceName('');
            setIsCreating(false);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create workspace');
            setIsCreating(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>Loading your workspaces...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <h2>My Workspaces</h2>
                <button
                    onClick={handleLogout}
                    style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </div>

            {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}

            {/* 3. The Creation Form UI */}
            <form onSubmit={handleCreateWorkspace} style={{ display: 'flex', gap: '1rem', marginTop: '2rem', background: '#e5e7eb', padding: '1rem', borderRadius: '8px' }}>
                <input
                    type="text"
                    placeholder="Enter new workspace name..."
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    required
                />
                <button
                    type="submit"
                    disabled={isCreating}
                    style={{ padding: '0.5rem 1.5rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: isCreating ? 'not-allowed' : 'pointer' }}
                >
                    {isCreating ? 'Creating...' : 'Create Workspace'}
                </button>
            </form>

            {/* The Workspace Grid */}
            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
                {workspaces.length === 0 ? (
                    <div style={{ padding: '2rem', background: '#f3f4f6', borderRadius: '8px', textAlign: 'center' }}>
                        <p>You don't have any workspaces yet.</p>
                    </div>
                ) : (
                    workspaces.map((ws) => (
                        <div key={ws._id} style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '8px', borderLeft: '4px solid #3b82f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0' }}>{ws.name}</h3>
                                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>ID: {ws._id}</p>
                            </div>
                            {/* We will wire this button up to the Project Board next */}
                            <button
                                onClick={() => navigate(`/workspace/${ws._id}`)}
                                style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Enter
                            </button>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}