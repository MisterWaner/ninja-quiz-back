import { User } from '../models/User';

export interface AuthRepository {
    registerUser(username: string, password: string): Promise<void>;
    authenticateUser(username: string, password: string): Promise<User | null>;
}
