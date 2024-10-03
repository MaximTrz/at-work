import React from 'react';
import UserCard from '../../User';

import IUser from '../../../types/IUser';

import './style.scss';

interface UsersListProps {
  userList: IUser[];
  title: string;
}

const UsersList: React.FC<UsersListProps> = ({ userList, title }) => (
  <div className="users-list">
    <div className="users-list__header">
      <h2 className="users-list__title">{title}</h2>
    </div>
    <div className="users-list__list">
      {userList.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  </div>
);

export default UsersList;
