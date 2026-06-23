import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosClient';

interface Project {
    _id: string;
    name: string;
    description?: string;
}

export default function ProjectBoard() {
    const { workspaceId } = useParams();
    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 1. New State for the Creation Engine
    const [newProjectName, setNewProjectName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get(`/projects/${workspaceId}`);
                setProjects(response.data.data.projects);
                setLoading(false);
            } catch (err: any) {
                setError('Failed to load projects.');
                setLoading(false);
                if (err.response?.status === 403) {
                    setError('Forbidden: You do not have access to this workspace.');
                }
            }
        };

        if (workspaceId) {
            fetchProjects();
        }
    }, [workspaceId]);

    // 2. The Creation Mechanism
    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProjectName.trim()) return;

        try {
            setIsCreating(true);

            // Hit your backend POST route, attaching the workspaceId from the URL
            const response = await api.post('/projects', {
                name: newProjectName,
                workspaceId: workspaceId
            });

            // Grab the new project and instantly update the UI array
            const newProject = response.data.data.project;
            setProjects([...projects, newProject]);

            // Clear the input field
            setNewProjectName('');
            setIsCreating(false);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create project');
            setIsCreating(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>Loading project board...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <Link to="/dashboard" style={{ textDecoration: 'none', color: '#6b7280', fontSize: '1.5rem' }}>←</Link>
                <h2>Workspace Projects</h2>
            </div>

            {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}

            {/* 3. The Creation Form UI */}
            <form onSubmit={handleCreateProject} style={{ display: 'flex', gap: '1rem', marginTop: '2rem', background: '#e5e7eb', padding: '1rem', borderRadius: '8px' }}>
                <input
                    type="text"
                    placeholder="Enter new project name..."
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    required
                />
                <button
                    type="submit"
                    disabled={isCreating}
                    style={{ padding: '0.5rem 1.5rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: isCreating ? 'not-allowed' : 'pointer' }}
                >
                    {isCreating ? 'Creating...' : 'Create Project'}
                </button>
            </form>

            {/* The Project Grid */}
            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
                {projects.length === 0 ? (
                    <div style={{ padding: '2rem', background: '#f3f4f6', borderRadius: '8px', textAlign: 'center' }}>
                        <p>No projects found in this workspace.</p>
                    </div>
                ) : (
                    projects.map((proj) => (
                        <div key={proj._id} style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '8px', borderLeft: '4px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0' }}>{proj.name}</h3>
                                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>ID: {proj._id}</p>
                            </div>
                            {/* Replace your existing dead button with this */}
                            <button
                                onClick={() => navigate(`/project/${proj._id}`)}
                                style={{ padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Open Board
                            </button>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}