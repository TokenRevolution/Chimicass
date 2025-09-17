import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">🧪</div>
          <div className="logo-text">
            <h1>Chimica App</h1>
            <p>IIS P.Boselli</p>
          </div>
        </div>
        <div className="header-info">
          <div className="info-item">
            <span className="info-label">Classe:</span>
            <span className="info-value">1° Socio Sanitario</span>
          </div>
          <div className="info-item">
            <span className="info-label">Anno:</span>
            <span className="info-value">2025-2026</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
