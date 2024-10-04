import React, { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { updateUser } from '../../store/slices/user.slice';

import IUser from '../../types/IUser';

import './style.scss';

const UserCard: React.FC<{ user: IUser }> = ({ user }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };

  const handleArchiveUser = () => {
    dispatch(updateUser({ ...user, archive: !user.archive }));
  };

  const handleHideUser = () => {
    dispatch(updateUser({ ...user, visible: !user.visible }));
  };

  const handleEditUser = () => {
    navigate(`/user/${user.id}`);
  };

  const hideMenu = () => {
    setMenuVisible(false);
  };

  const userName = user.username.substring(0, 20);

  const classes = classNames({
    'user-card': true,
    '--archive': user.archive,
  });

  return (
    <div className={classes} onMouseLeave={hideMenu}>
      <div className="user-card__avatar-wrapper">
        <img className="user-card__avatar" src={user.avatar} alt={`${user.username}'s avatar`} />
      </div>

      <div className="user-card__info">
        <div className="user-card__info-top">
          <div className="user-card__name">{userName}</div>
          <div className="user-card__status">{user.company.name}</div>
        </div>
        <div className="user-card__location">{user.address.city}</div>
      </div>
      <button className="user-card__menu" onClick={toggleMenu} aria-label="User options menu">
        <div className="user-card__menu-dot" />
        <div className="user-card__menu-dot" />
        <div className="user-card__menu-dot" />
      </button>
      <div className={`user-card__dropdown ${menuVisible ? 'visible' : ''}`}>
        <ul>
          <button className="user-card__dropdown-button" onClick={handleEditUser}>
            Редактировать
          </button>
          <li>
            <button className="user-card__dropdown-button" onClick={handleArchiveUser}>
              {user.archive ? 'Активировать' : 'Архивировать'}
            </button>
          </li>
          <button className="user-card__dropdown-button" onClick={handleHideUser}>
            Скрыть
          </button>
        </ul>
      </div>
    </div>
  );
};

export default UserCard;
