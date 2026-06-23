import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectBoard from './pages/ProjectBoard';
import TaskBoard from './pages/TaskBoard';
import Home from './pages/Home';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* The Public Door */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* The Protected Room (We will lock this down later) */}
        <Route path="/" element={<Home />} />

        {/* Catch-all: If they type a random URL, send them to login */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workspace/:workspaceId" element={<ProjectBoard />} />
          <Route path="/project/:projectId" element={<TaskBoard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;