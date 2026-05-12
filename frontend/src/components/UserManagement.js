import React, { useState, useEffect } from 'react';
import { getUsers, addUser, deleteUser } from '../api';
import { FaTrash, FaUserPlus, FaUserShield } from 'react-icons/fa';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', role: 'Staff' });

    const fetchUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const res = await addUser(newUser);
            if (res.data.status === 'success') {
                setNewUser({ username: '', role: 'Staff' });
                fetchUsers();
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            alert("Error adding user.");
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Remove this user from the system?")) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (error) {
                alert("Failed to delete user.");
            }
        }
    };

    return (
        <div className="row">
            {/* Add User Form */}
            <div className="col-lg-4 mb-4">
                <div className="card p-4 shadow-sm" style={{ borderTop: '4px solid #1a4d2e' }}>
                    <h5 style={{ fontFamily: 'Georgia, serif', color: '#1a4d2e' }} className="mb-4">
                        <FaUserPlus className="me-2"/> Provision Access
                    </h5>
                    <form onSubmit={handleAddUser}>
                        <div className="mb-3">
                            <label className="form-label text-muted small fw-bold">USERNAME</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={newUser.username}
                                onChange={(e) => setNewUser({...newUser, username: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-muted small fw-bold">ROLE</label>
                            <select 
                                className="form-select"
                                value={newUser.role}
                                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                            >
                                <option value="Staff">Staff</option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>
                        <button type="submit" className="btn w-100 fw-bold text-white" style={{ backgroundColor: '#1a4d2e' }}>
                            Create User
                        </button>
                    </form>
                </div>
            </div>

            {/* User List Table */}
            <div className="col-lg-8 mb-4">
                <div className="card p-4 shadow-sm">
                    <h5 style={{ fontFamily: 'Georgia, serif', color: '#2c3e50' }} className="mb-4">
                        <FaUserShield className="me-2"/> System Directory
                    </h5>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center text-muted">No users found.</td></tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="text-muted">#{user.id}</td>
                                            <td className="fw-bold">{user.username}</td>
                                            <td>
                                                <span className={`badge ${user.role === 'Admin' ? 'bg-dark' : 'bg-secondary'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(user.id)}>
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;