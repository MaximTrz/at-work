export default interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
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
