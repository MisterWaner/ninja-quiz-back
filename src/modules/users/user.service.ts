import { User } from '../../models/User';
import { UserRepository } from '../../application/user.repository';
import { db } from '../../database/database';
import { hashPassword } from '../../lib/helpers/auth-helpers';

export class UserService implements UserRepository {
    async getUserById(id: string): Promise<User | null> {
        const user = db
            .prepare('SELECT * FROM users WHERE id = ?')
            .get(id) as User;
        return user;
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = db
            .prepare('SELECT * FROM users WHERE username = ?')
            .get(username) as User;

        if (!user) throw new Error('User not found');

        return user;
    }

    async getUsers(): Promise<User[]> {
        const users = db.prepare('SELECT * FROM users').all() as User[];
        return users;
    }

    async updateUserUsername(id: string, username: string): Promise<void> {
        const user = await this.getUserById(id);
        if (!user) throw new Error('User not found');

        db.prepare('UPDATE users SET username = ? WHERE id = ?').run(
            username,
            id
        );
    }

    async updateUserPassword(id: string, password: string): Promise<void> {
        const user = this.getUserById(id);
        if (!user) throw new Error('User not found');

        const hashedPassword = await hashPassword(password);

        db.prepare('UPDATE users SET password = ? WHERE id = ?').run(
            hashedPassword,
            id
        );
    }

    async deleteUser(id: string): Promise<void> {
        const user = this.getUserById(id);
        if (!user) throw new Error('User not found');

        db.prepare('DELETE FROM users WHERE id = ?').run(id);
    }
}
