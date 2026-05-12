import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../api';
import { FaTrash, FaExclamationCircle } from 'react-icons/fa';

const InventoryList = () => {
    const [products, setProducts] = useState([]);

    // Fetch products when the component loads
    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                fetchProducts(); // Refresh the list
            } catch (error) {
                alert("Failed to delete product.");
            }
        }
    };

    return (
        <div className="card p-4 border-top border-info border-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-secondary mb-0">Current Inventory & Alerts</h5>
                <button className="btn btn-sm btn-outline-secondary" onClick={fetchProducts}>Refresh List</button>
            </div>
            
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Barcode</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr><td colSpan="6" className="text-center text-muted">No products found.</td></tr>
                        ) : (
                            products.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td className="fw-bold">{item.name}</td>
                                    <td>{item.barcode}</td>
                                    <td>₱{item.price}</td>
                                    <td>
                                        {item.stock < 10 ? (
                                            <span className="badge bg-danger p-2">
                                                <FaExclamationCircle className="me-1"/> {item.stock} (Low Stock!)
                                            </span>
                                        ) : (
                                            <span className="badge bg-success p-2">{item.stock}</span>
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
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
    );
};

export default InventoryList;