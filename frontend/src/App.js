import React, { useState } from 'react';
import AddProduct from './components/AddProduct';
import ProcessSale from './components/ProcessSale';
import InventoryList from './components/InventoryList';
import Login from './components/Login';
import {
  FaBoxOpen,
  FaShoppingCart,
  FaChartBar,
  FaStore,
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
  FaArrowRight
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [currentUser, setCurrentUser] = useState(null);

  if (!currentUser) {
    return <Login onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const tabs = [
    { key: 'inventory', label: 'Manage Inventory', icon: <FaBoxOpen /> },
    { key: 'pos', label: 'Point of Sale', icon: <FaShoppingCart /> },
    { key: 'reports', label: 'Sales Reports', icon: <FaChartBar /> }
  ];

  return (
    <div className="app-shell">
      <div className="row g-0 app-shell__row">
        <aside className="col-md-3 col-xl-2 sidebar-panel d-none d-md-flex">
          <div className="sidebar-brand">
            <FaStore className="me-2" /> SmartStock
          </div>

          <div className="sidebar-nav">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`sidebar-link ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <button type="button" className="sidebar-link sidebar-link--danger mt-auto" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </aside>

        <main className="col-md-9 col-xl-10 content-area">
          <header className="premium-header">
            <div>
              <h2 className="page-title">
                {activeTab === 'inventory' && 'Inventory Management'}
                {activeTab === 'pos' && 'Process a Sale'}
                {activeTab === 'reports' && 'Business Analytics'}
              </h2>
              <p className="page-subtitle">Track stock, process sales, and monitor activity in one place.</p>
            </div>

            <div className="profile-chip">
              <button type="button" className="notification-btn" aria-label="Notifications">
                <FaBell />
              </button>
              <FaUserCircle className="profile-avatar" />
              <div>
                <strong>{currentUser.username}</strong>
                <div className="profile-meta">User ID: {currentUser.user_id}</div>
              </div>
            </div>
          </header>

          <div className="mobile-nav d-md-none">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`mobile-nav__btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
            <button type="button" className="mobile-nav__btn mobile-nav__btn--danger" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>

          <div className="row g-4">
            {activeTab === 'inventory' && (
              <>
                <div className="col-xl-4">
                  <AddProduct />
                </div>
                <div className="col-xl-8">
                  <InventoryList />
                </div>
              </>
            )}

            {activeTab === 'pos' && (
              <div className="col-lg-8 col-xl-6">
                <ProcessSale />
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="col-lg-8 col-xl-6">
                <div className="premium-card empty-state text-center">
                  <FaChartBar size={48} className="mb-3 mx-auto" />
                  <h4>Reports Dashboard</h4>
                  <p className="mb-0">Detailed analytics will appear here once report endpoints are connected.</p>
                  <span className="empty-state__hint mt-3">
                    Connect your API reports <FaArrowRight className="ms-1" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
