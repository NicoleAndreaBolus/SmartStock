import React, { useState } from 'react';
import AddProduct from './components/AddProduct';
import ProcessSale from './components/ProcessSale';
import { FaBoxOpen, FaShoppingCart, FaChartBar, FaStore } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        
        {/* Sidebar Navigation */}
        <div className="col-md-2 sidebar d-none d-md-block">
          <div className="sidebar-brand">
            <FaStore className="me-2" /> SmartStock
          </div>
          <div 
            className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`} 
            onClick={() => setActiveTab('inventory')}
          >
            <FaBoxOpen /> Manage Inventory
          </div>
          <div 
            className={`nav-item ${activeTab === 'pos' ? 'active' : ''}`} 
            onClick={() => setActiveTab('pos')}
          >
            <FaShoppingCart /> Point of Sale
          </div>
          <div 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} 
            onClick={() => setActiveTab('reports')}
          >
            <FaChartBar /> Sales Reports
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-md-10 content-area">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-dark">
              {activeTab === 'inventory' && 'Inventory Management'}
              {activeTab === 'pos' && 'Process a Sale'}
              {activeTab === 'reports' && 'Business Analytics'}
            </h2>
            <div className="text-muted">Admin User | San Fernando Branch</div>
          </div>

          <div className="row">
            <div className="col-lg-8 col-xl-6">
              {activeTab === 'inventory' && <AddProduct />}
              {activeTab === 'pos' && <ProcessSale />}
              {activeTab === 'reports' && (
                <div className="card p-5 text-center text-muted">
                  <FaChartBar size={50} className="mb-3 mx-auto" />
                  <h4>Reports Dashboard</h4>
                  <p>Connect your GET /api/reports/sales/ endpoint here.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;