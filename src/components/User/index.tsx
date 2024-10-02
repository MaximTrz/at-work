import React, { useState } from 'react';
import UserCardType from '../../types/UserCardType';

import './style.scss';

const UserCard: React.FC<{ user: UserCardType }> = ({ user }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };

  const hideMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div className="user-card" onMouseLeave={hideMenu}>
      <img className="user-card__avatar" src={user.avatar} alt={`${user.username}'s avatar`} />
      <div className="user-card__info">
        <div className="user-card__name">{user.username}</div>
        <div className="user-card__status">{user.company.name}</div>
        <div className="user-card__location">{user.address.city}</div>
      </div>
      <button className="user-card__menu" onClick={toggleMenu} aria-label="User options menu">
        <div className="user-card__menu-dot" />
        <div className="user-card__menu-dot" />
        <div className="user-card__menu-dot" />
      </button>
      <div className={`user-card__dropdown ${menuVisible ? 'visible' : ''}`}>
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      </div>
    </div>
  );
};

export default UserCard;
