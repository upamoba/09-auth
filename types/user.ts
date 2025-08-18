export interface User {
  id: string;
  email: string;
  username: string | null;
  avatar?: string | null;
  createdAt?: string;
  updatedAt?: string;
  avatarUrl?: string | null;
}