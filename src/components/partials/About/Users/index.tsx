import React, { useEffect } from 'react';

import UserCard from '../../../User';

import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import { fetchUsers, selectStatus, selectUsers } from '../../../../store/slices/user.slice';
import { ERequestStatus } from '../../../../common/request';

import './style.scss';

const UserList = () => {
  const userList = useAppSelector(selectUsers);
  const usersStatus = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="user-list">
      {usersStatus === ERequestStatus.SUCCEEDED ? (
        userList.map((user) => (
          <UserCard
            key={user.id}
            user={{
              ...user,
              username: 'Test User',
              company: {
                name: 'Test Conpany',
              },
              address: {
                city: 'Test City',
              },
              avatar: 'https://http.cat/images/205.jpg',
            }}
          />
        ))
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default UserList;
