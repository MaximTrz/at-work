import React, { useEffect } from 'react';
import UsersList from '../UsersList';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { fetchUsers, selectStatus, selectUsers } from '../../../store/slices/user.slice';
import { ERequestStatus } from '../../../common/request';

import IUser from '../../../types/IUser';
import useUsers from './useUsers';

import './style.scss';

const Users: React.FC = () => {
  const userList = useAppSelector(selectUsers).slice(0, 6);
  const usersStatus = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const { activeUsers, archiveUsers } = useUsers();

  let activeUsersList: IUser[] = [];
  let archiveUsersList: IUser[] = [];

  if (usersStatus === ERequestStatus.SUCCEEDED) {
    activeUsersList = activeUsers(userList);
    archiveUsersList = archiveUsers(userList);
  }

  useEffect(() => {
    if (userList.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, userList]);

  return (
    <div className="users">
      {usersStatus === ERequestStatus.SUCCEEDED ? (
        <>
          <div className="users__active">
            <UsersList userList={activeUsersList} title="Активные" />
          </div>
          <div className="users__archive">
            <UsersList userList={archiveUsersList} title="Архив" />
          </div>
        </>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default Users;
