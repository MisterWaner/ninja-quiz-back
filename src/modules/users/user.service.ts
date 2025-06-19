import { User } from '../../models/User';
import { UserRepository } from '../../application/user.repository';
import pool from '../../database/config';
import { hashPassword } from '../../lib/helpers/auth-helpers';

export class UserService implements UserRepository {
    async getUserById(id: string): Promise<User | null> {
        const result = await pool.query<User>(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );

        const user = result.rows[0];

        if (!user) throw new Error('User not found');
        return user;
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const result = await pool.query<User>(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        const user = result.rows[0];

        if (!user) throw new Error('User not found');

        return user;
    }

    async getUsers(): Promise<User[]> {
        const result = await pool.query('SELECT * FROM users');
        const users = result.rows.map((row) => ({
            id: row.id,
            username: row.username,
            password: row.password,
        })) as User[];

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
        const user = this.getUserById(id);
        if (!user) throw new Error('User not found');

        const hashedPassword = await hashPassword(password);

        await pool.query(
            'UPDATE users SET password = $1 WHERE id = $2',
            [hashedPassword, id]
        );
    }

    async deleteUser(id: string): Promise<void> {
        const user = this.getUserById(id);
        if (!user) throw new Error('User not found');

        await pool.query('DELETE FROM users WHERE id = $1', [id]);
    }
}
