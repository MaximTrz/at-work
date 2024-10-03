export default interface IUser {
  id: string;
  username: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
  avatar: string;
  archive: boolean;
  visible: boolean;
}
