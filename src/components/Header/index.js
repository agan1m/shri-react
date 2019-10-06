import React from 'react';
import './index.scss';

const Header = () => (
  <header className="Header">
    <div className="Logo Header-Logo"></div>
    <div className="Header-Content-Item Header-Content Dropdown">
      <span className="Dropdown-Header">Repository Arc</span>
      <div className="Dropdown-Content"></div>
    </div>
  </header>
);

export default Header;
