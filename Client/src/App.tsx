import { useState } from 'react';
import api from './api/axiosClient';

function App() {
  const [status, setStatus] = useState<string>('Not logged in');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLoginTest = async () => {
    try {
      setStatus('Attempting login...');

      const response = await api.post('/auth/login', {
        email: 'test@example.com',
        password: 'password123'
      });


      const receivedToken = response.data.token;


      localStorage.setItem('token', receivedToken);
      setToken(receivedToken);
      setStatus('Login Successful! Token secured.');

    } catch (error: any) {
      setStatus(`Login Failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleClearToken = () => {
    localStorage.removeItem('token');
    setToken(null);
    setStatus('Token destroyed.');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>DevSync Security Bridge</h1>

      <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '8px', marginBottom: '1rem' }}>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : 'None'}</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={handleLoginTest}
          style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Test Login Connection
        </button>

        <button
          onClick={handleClearToken}
          style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Clear Token
        </button>
      </div>
    </div>
  );
}

export default App;