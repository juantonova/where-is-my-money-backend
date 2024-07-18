export type User = {
  id: number;
  login: string;
  password: string;
  name: string | null;
};

export type UserResponse = { user: Omit<User, 'password'> };
