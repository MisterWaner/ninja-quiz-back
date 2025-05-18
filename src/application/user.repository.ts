import { User } from '../models/User';

export interface UserRepository {
    getUserById(id: string): Promise<User | null>;
    getUserByUsername(username: string): Promise<User | null>;
    getUsers(): Promise<User[]>;
    updateUserUsername(id: string, username: string): Promise<void>;
    updateUserPassword(id: string, password: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
