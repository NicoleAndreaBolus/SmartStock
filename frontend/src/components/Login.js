import React, { useState } from 'react';
import { loginUser } from '../api';
import { FaStore, FaLock, FaUser } from 'react-icons/fa';

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(credentials);
      if (res.data.status === 'success') {
        onLoginSuccess(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Server connection failed.');
    }
  };

  return (
    <div className="login-shell d-flex justify-content-center align-items-center">
      <div className="premium-card login-card p-4 p-md-5">
        <div className="text-center mb-4">
          <FaStore size={48} className="brand-icon mb-3" />
          <h3 className="fw-bold mb-1">SmartStock</h3>
          <p className="text-muted mb-0">Sign in to continue to your dashboard</p>
        </div>

        {error && <div className="alert alert-danger status-alert p-2 text-center">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group mb-3 premium-input-group">
            <span className="input-group-text"><FaUser /></span>
            <input
              type="text"
              className="form-control premium-input"
              placeholder="Username"
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </div>
          <div className="input-group mb-4 premium-input-group">
            <span className="input-group-text"><FaLock /></span>
            <input
              type="password"
              className="form-control premium-input"
              placeholder="Password"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn premium-btn w-100 fw-bold py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
