import React from 'react';
import logo from '../../assets/logo.svg';
import './style.scss';

const Header = () => (
  <header className="header">
    <div className="header__container">
      <div className="header__logo">
        <img src={logo} alt="logo" className="header__logo-icon" />
        <span className="header__logo-text">
          at-<strong>work</strong>
        </span>
      </div>
      <div className="header__controls">
        <div className="header__icons">
          <div className="header__notifications-icon" />
          <div className="header__favorite-icon" />
        </div>
        <div className="header__user-info">
          <img
            src="https://http.cat/images/200.jpg"
            alt="User Avatar"
            className="header__user-avatar"
          />
          <span className="header__user-name">Ivan1234</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
