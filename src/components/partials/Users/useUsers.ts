import IUser from '../../../types/IUser';

const useUsers = () => {
  const activeUsers = (users: IUser[]): IUser[] =>
    users.filter((user) => !user.archive && user.visible);

  const archiveUsers = (users: IUser[]): IUser[] =>
    users.filter((user) => user.archive && user.visible);

  return {
    activeUsers,
    archiveUsers,
  };
};

export default useUsers;
