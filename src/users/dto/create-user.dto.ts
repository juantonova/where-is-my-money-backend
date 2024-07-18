import { User } from '../interfaces/user.interface';

export type CreateUserDto = Omit<User, 'id'>;
