import React, { useState } from 'react';
import { addProduct } from '../api';
import { FaPlusCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const AddProduct = () => {
    const [form, setForm] = useState({ name: '', barcode: '', price: '', stock: '' });
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addProduct(form);
            setStatus({ type: 'success', msg: response.data.message || 'Product saved successfully!' });
            setForm({ name: '', barcode: '', price: '', stock: '' }); // Clear form on success
        } catch (error) {
            setStatus({ type: 'danger', msg: 'Failed to add product. Check backend connection.' });
        }
    };

    return (
        <div className="card p-4">
            <h5 className="mb-4 text-secondary">Add New Stock Item</h5>
            
            {status && (
                <div className={`alert alert-${status.type} d-flex align-items-center`} id="statusMsg">
                    {status.type === 'success' ? <FaCheckCircle className="me-2" /> : <FaExclamationTriangle className="me-2" />}
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">PRODUCT NAME</label>
                    <input type="text" className="form-control" id="nameInput" value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">BARCODE</label>
                    <input type="text" className="form-control" id="barcodeInput" value={form.barcode}
                        onChange={(e) => setForm({...form, barcode: e.target.value})} required />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <label className="form-label text-muted small fw-bold">UNIT PRICE (₱)</label>
                        <input type="number" step="0.01" className="form-control" id="priceInput" value={form.price}
                            onChange={(e) => setForm({...form, price: e.target.value})} required />
                    </div>
                    <div className="col-md-6 mb-4">
                        <label className="form-label text-muted small fw-bold">INITIAL QUANTITY</label>
                        <input type="number" className="form-control" id="stockInput" value={form.stock}
                            onChange={(e) => setForm({...form, stock: e.target.value})} required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" id="btnSave">
                    <FaPlusCircle className="me-2" /> Save Product to Database
                </button>
            </form>
        </div>
    );
};

export default AddProduct;