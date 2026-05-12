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
                // Pass the user data up to App.js
                onLoginSuccess(res.data.data);
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError("Server connection failed.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#1e2b3c' }}>
            <div className="card p-5 shadow-lg" style={{ width: '400px', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <FaStore size={50} color="#3b82f6" className="mb-3" />
                    <h3 className="fw-bold text-dark">SmartStock</h3>
                    <p className="text-muted">Sign in to your account</p>
                </div>

                {error && <div className="alert alert-danger p-2 text-center">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-white"><FaUser color="#aeb9c6" /></span>
                        <input type="text" className="form-control" placeholder="Username" 
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})} required />
                    </div>
                    <div className="input-group mb-4">
                        <span className="input-group-text bg-white"><FaLock color="#aeb9c6" /></span>
                        <input type="password" className="form-control" placeholder="Password" 
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;