import React, { useState, useEffect } from 'react';
import { processSale, getProducts, getUsers } from '../api';
import { FaCashRegister, FaCheckCircle, FaExclamationTriangle, FaBoxOpen, FaUserTie } from 'react-icons/fa';

const ProcessSale = () => {
    const [sale, setSale] = useState({ user_id: '', product_id: '', quantity: '' });
    const [status, setStatus] = useState(null);
    
    // New state to hold dropdown data
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    // Fetch users and products when the component loads
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const userRes = await getUsers();
                setUsers(userRes.data.data);

                const prodRes = await getProducts();
                setProducts(prodRes.data.data);
            } catch (err) {
                console.error("Error fetching POS data", err);
                setStatus({ type: 'danger', msg: 'Failed to load system data. Check API.' });
            }
        };
        fetchDropdownData();
    }, []);

    const handleSale = async (e) => {
        e.preventDefault();
        try {
            const res = await processSale(sale);
            if (res.data.status === 'error') {
                setStatus({ type: 'warning', msg: res.data.message || 'Stock Insufficient' });
            } else {
                setStatus({ type: 'success', msg: 'Transaction Completed Successfully!' });
                // Reset form but keep the staff ID selected for convenience
                setSale({ ...sale, product_id: '', quantity: '' }); 
                
                // Refresh product list to reflect the newly deducted stock
                const prodRes = await getProducts();
                setProducts(prodRes.data.data);
            }
        } catch (err) {
            setStatus({ type: 'danger', msg: 'Error processing transaction.' });
        }
    };

    return (
        <div className="card p-4 shadow-sm" style={{ borderTop: '4px solid #1a4d2e' }}>
            <h5 style={{ fontFamily: 'Georgia, serif', color: '#1a4d2e' }} className="mb-4">
                Point of Sale (POS)
            </h5>

            {status && (
                <div className={`alert alert-${status.type} d-flex align-items-center`} id="saleFeedback">
                    {status.type === 'success' ? <FaCheckCircle className="me-2" /> : <FaExclamationTriangle className="me-2" />}
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSale}>
                {/* STAFF ID DROPDOWN */}
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">
                        <FaUserTie className="me-1"/> SELECT STAFF
                    </label>
                    <select 
                        className="form-select" 
                        value={sale.user_id}
                        onChange={(e) => setSale({...sale, user_id: e.target.value})} 
                        required
                    >
                        <option value="" disabled>-- Choose Cashier --</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username} (Role: {user.role})
                            </option>
                        ))}
                    </select>
                </div>

                {/* PRODUCT ID DROPDOWN */}
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">
                        <FaBoxOpen className="me-1"/> SELECT PRODUCT
                    </label>
                    <select 
                        className="form-select" 
                        value={sale.product_id}
                        onChange={(e) => setSale({...sale, product_id: e.target.value})} 
                        required
                    >
                        <option value="" disabled>-- Choose Item --</option>
                        {products.map((item) => (
                            <option key={item.id} value={item.id} disabled={item.stock === 0}>
                                {item.name} | ₱{item.price} (In Stock: {item.stock}) 
                                {item.stock === 0 ? " - OUT OF STOCK" : ""}
                            </option>
                        ))}
                    </select>
                </div>

                {/* QUANTITY INPUT */}
                <div className="mb-4">
                    <label className="form-label text-muted small fw-bold">QUANTITY TO DEDUCT</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        min="1"
                        value={sale.quantity}
                        onChange={(e) => setSale({...sale, quantity: e.target.value})} 
                        required 
                    />
                </div>

                <button type="submit" className="btn w-100 py-2 fw-bold text-white" style={{ backgroundColor: '#1a4d2e' }}>
                    <FaCashRegister className="me-2" /> Process Transaction
                </button>
            </form>
        </div>
    );
};

export default ProcessSale;