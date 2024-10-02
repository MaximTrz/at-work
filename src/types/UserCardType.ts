export default interface UserCardType {
  id: string;
  username: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
  avatar: string;
}
