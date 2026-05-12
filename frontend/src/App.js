import React, { useState } from 'react';
import AddProduct from './components/AddProduct';
import ProcessSale from './components/ProcessSale';
import InventoryList from './components/InventoryList';
import Login from './components/Login';
import { FaBoxOpen, FaShoppingCart, FaChartBar, FaStore, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('inventory');
  
  // New Authentication State
  const [currentUser, setCurrentUser] = useState(null);

  // If no user is logged in, show the Login screen
  if (!currentUser) {
      return <Login onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  const handleLogout = () => {
      setCurrentUser(null);
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        
        {/* Sidebar Navigation */}
        <div className="col-md-2 sidebar d-none d-md-block">
          <div className="sidebar-brand">
            <FaStore className="me-2" /> SmartStock
          </div>
          <div className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
            <FaBoxOpen /> Manage Inventory
          </div>
          <div className={`nav-item ${activeTab === 'pos' ? 'active' : ''}`} onClick={() => setActiveTab('pos')}>
            <FaShoppingCart /> Point of Sale
          </div>
          <div className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            <FaChartBar /> Sales Reports
          </div>
          
          {/* Logout Button */}
          <div className="nav-item text-danger mt-5" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
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
            <div className="text-muted fw-bold">
               Welcome, {currentUser.username} | User ID: {currentUser.user_id}
            </div>
          </div>

          <div className="row">
            {activeTab === 'inventory' && (
              <>
                <div className="col-xl-4 mb-4"><AddProduct /></div>
                <div className="col-xl-8 mb-4"><InventoryList /></div>
              </>
            )}

            {activeTab === 'pos' && (
              <div className="col-lg-8 col-xl-6"><ProcessSale /></div>
            )}
            
            {activeTab === 'reports' && (
              <div className="col-lg-8 col-xl-6">
                <div className="card p-5 text-center text-muted">
                  <FaChartBar size={50} className="mb-3 mx-auto" />
                  <h4>Reports Dashboard</h4>
                  <p>Check the backend API to generate full sales analytics.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;