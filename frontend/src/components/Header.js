import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>All in One</h1>
      <nav>
        <ul className="header-nav-list">
          <li><a className="header-nav-link" href="/">Home</a></li>
          <li><a className="header-nav-link" href="/about">About</a></li>
          <li><a className="header-nav-link" href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
