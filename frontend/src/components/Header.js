import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';
import './Header.css';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLogoutClick = () => {
    logout();
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-title">All in One</h1>
        </div>
        
        <nav className="header-nav">
          <ul className="header-nav-list">
            <li><a className="header-nav-link" href="/">Home</a></li>
            <li><a className="header-nav-link" href="/seo-backlink">SEO Backlink</a></li>
            <li><a className="header-nav-link" href="/about">About</a></li>
            <li><a className="header-nav-link" href="/contact">Contact</a></li>
          </ul>
        </nav>

        <div className="header-right">
          {isAuthenticated ? (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-email">{user?.email}</span>
              </div>
              <button className="logout-button" onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
          ) : (
            <button className="login-button" onClick={handleLoginClick}>
              Login
            </button>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>×</button>
            <Login onSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
