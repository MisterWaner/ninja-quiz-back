import {
    CreateUserInput,
    UserResponse,
} from '../domain/user/user.schema';


export interface UserRepository {
    createUser({ username, password }: CreateUserInput): Promise<void>;
    getUserById(id: string): Promise<UserResponse | null>;
    getUserByUsername(username: string): Promise<UserResponse | null>;
    getUsers(): Promise<UserResponse[]>;
    updateUserUsername(id: string, username: string): Promise<void>;
    updateUserPassword(id: string, password: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
