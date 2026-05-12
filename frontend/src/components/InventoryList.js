import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../api';
import { FaTrash, FaExclamationCircle, FaBoxOpen } from 'react-icons/fa';

const InventoryList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        alert('Failed to delete product.');
      }
    }
  };

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3 gap-3 flex-wrap">
        <h5 className="section-title mb-0">Current Inventory & Alerts</h5>
        <button className="btn btn-sm premium-btn premium-btn--ghost" onClick={fetchProducts}>
          Refresh List
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle premium-table">
          <thead>
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
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <div className="table-empty-state">
                    <FaBoxOpen className="me-2" />
                    <span>No products found. Add your first item to get started.</span>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="fw-semibold">{item.name}</td>
                  <td>{item.barcode}</td>
                  <td>₱{item.price}</td>
                  <td>
                    {item.stock < 10 ? (
                      <span className="status-badge status-badge--danger">
                        <FaExclamationCircle className="me-1" /> {item.stock} Low
                      </span>
                    ) : (
                      <span className="status-badge status-badge--success">{item.stock} In Stock</span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm premium-btn premium-btn--danger" onClick={() => handleDelete(item.id)}>
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
