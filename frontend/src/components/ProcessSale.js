import React, { useState } from 'react';
import { processSale } from '../api';
import { FaCashRegister, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ProcessSale = () => {
    const [sale, setSale] = useState({ user_id: '', product_id: '', quantity: '' });
    const [status, setStatus] = useState(null);

    const handleSale = async (e) => {
        e.preventDefault();
        try {
            const res = await processSale(sale);
            if (res.data.status === 'error') {
                setStatus({ type: 'warning', msg: res.data.message || 'Stock Insufficient' });
            } else {
                setStatus({ type: 'success', msg: 'Transaction Completed Successfully!' });
                setSale({ user_id: '', product_id: '', quantity: '' });
            }
        } catch (err) {
            setStatus({ type: 'danger', msg: 'Error processing transaction.' });
        }
    };

    return (
        <div className="card p-4 border-top border-primary border-4">
            <h5 className="mb-4 text-secondary">Point of Sale (POS)</h5>

            {status && (
                <div className={`alert alert-${status.type} d-flex align-items-center`} id="saleFeedback">
                    {status.type === 'success' ? <FaCheckCircle className="me-2" /> : <FaExclamationTriangle className="me-2" />}
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSale}>
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">STAFF ID</label>
                    <input type="number" className="form-control" id="userId" value={sale.user_id}
                        onChange={(e) => setSale({...sale, user_id: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">PRODUCT ID</label>
                    <input type="number" className="form-control" id="prodId" value={sale.product_id}
                        onChange={(e) => setSale({...sale, product_id: e.target.value})} required />
                </div>
                <div className="mb-4">
                    <label className="form-label text-muted small fw-bold">QUANTITY TO DEDUCT</label>
                    <input type="number" className="form-control" id="qty" value={sale.quantity}
                        onChange={(e) => setSale({...sale, quantity: e.target.value})} required />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" id="btnSale">
                    <FaCashRegister className="me-2" /> Process Transaction
                </button>
            </form>
        </div>
    );
};

export default ProcessSale;