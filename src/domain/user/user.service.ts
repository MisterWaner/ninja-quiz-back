import { UserRepository } from '../../application/user.repository';
import pool from '../../database/config';
import {
    CreateUserInput,
    UserResponse,
} from './user.schema';
import { hashPassword } from '../../lib/helpers/auth-helpers';
import { generateStringId } from '../../lib/id-generators';

export class UserService implements UserRepository {
    async createUser({ username, password }: CreateUserInput): Promise<void> {
        const id = await generateStringId();
        const hashedPassword = await hashPassword(password);
        await pool.query(
            'INSERT INTO users (id, username, password) VALUES ($1, $2, $3)',
            [id, username, hashedPassword]
        );
    }

    async getUserById(id: string): Promise<UserResponse | null> {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [
            id,
        ]);
        const user = result.rows[0] as UserResponse;

        if (!user) throw new Error('User not found');

        return user ?? null;
    }

    async getUserByUsername(username: string): Promise<UserResponse | null> {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        const user = result.rows[0] as UserResponse;

        if (!user) throw new Error('User not found');

        return user ?? null;
    }

    async getUsers(): Promise<UserResponse[]> {
        const result = await pool.query('SELECT * FROM users');
        const users = result.rows.map((row) => ({
            id: row.id,
            username: row.username,
        })) as UserResponse[];

        if (!users) throw new Error('No users found');

        return users;
    }

    async updateUserUsername(id: string, username: string): Promise<void> {
        const user = await this.getUserById(id);
        if (!user) throw new Error('User not found');

        await pool.query('UPDATE users SET username = $1 WHERE id = $2', [
            username,
            id,
        ]);
    }

    async updateUserPassword(id: string, password: string): Promise<void> {
        const user = await this.getUserById(id);
        if (!user) throw new Error('User not found');

        const hashedPassword = await hashPassword(password);

        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [
            hashedPassword,
            id,
        ]);
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.getUserById(id);
        if (!user) throw new Error('User not found');

        await pool.query('DELETE FROM users WHERE id = $1', [id]);
    }
}
