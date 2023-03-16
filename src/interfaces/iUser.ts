export interface iUser {
  createdAt?: string;
  name: string;
  avatar: string;
  login: string;
  password: string;
  id: number;
  exit?: () => void;
  title?: string;
}
