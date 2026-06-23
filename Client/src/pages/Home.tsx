import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', color: '#111827', background: '#f9fafb', minHeight: '100vh' }}>

            {/* 1. The Navbar */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 5%', alignItems: 'center', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#3b82f6', letterSpacing: '-0.5px' }}>
                    DevSync
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link to="/login" style={{ textDecoration: 'none', color: '#4b5563', padding: '0.5rem 1rem', fontWeight: '500' }}>
                        Sign In
                    </Link>
                    <Link to="/register" style={{ textDecoration: 'none', background: '#10b981', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '6px', fontWeight: '500' }}>
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* 2. The Hero Funnel */}
            <header style={{ textAlign: 'center', padding: '6rem 1rem 4rem 1rem' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0 0 1.5rem 0', lineHeight: '1.1', letterSpacing: '-1px' }}>
                    Manage Workspaces.<br /> <span style={{ color: '#3b82f6' }}>Ship Faster.</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: '1.6' }}>
                    The ultimate multi-tenant Kanban engine built for high-velocity developer teams.
                    Stop tracking tickets, start shipping features.
                </p>
                <Link to="/register" style={{ textDecoration: 'none', background: '#3b82f6', color: 'white', padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '8px', fontWeight: 'bold', display: 'inline-block', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)' }}>
                    Start Building for Free
                </Link>
            </header>

            {/* 3. The Engineering Feature Grid */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '4rem 5%', background: 'white', borderTop: '1px solid #e5e7eb' }}>

                <div style={{ padding: '2rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔐</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '700' }}>Secure Multi-Tenancy</h3>
                    <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.5' }}>Enterprise-grade JWT Bouncers ensure strict data isolation and security between organizational workspaces.</p>
                </div>

                <div style={{ padding: '2rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '700' }}>Optimistic UI Updates</h3>
                    <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.5' }}>Zero-latency DOM manipulation. Your Kanban board state mutates instantly while Axios syncs with the database in the background.</p>
                </div>

                <div style={{ padding: '2rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🗄️</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '700' }}>Relational Data Engine</h3>
                    <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.5' }}>Strictly typed Mongoose schemas forming an unbreakable relational bridge between Workspaces, Projects, and Tasks.</p>
                </div>

            </section>

        </div>
    );
}