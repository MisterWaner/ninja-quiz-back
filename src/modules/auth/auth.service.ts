import { User } from '../../models/User';
import { AuthRepository } from '../../application/auth.repository';
import { db } from '../../database/database';
import { hashPassword, comparePassword } from '../../lib/helpers/auth-helpers';
import { generateStringId } from '../../lib/id-generators';

export class AuthService implements AuthRepository {
    async registerUser(username: string, password: string): Promise<void> {
        const id = generateStringId();
        const hashedPassword = await hashPassword(password);

        db.prepare(
            'INSERT INTO users (id, username, password) VALUES (?, ?, ?)'
        ).run(id, username, hashedPassword);
    }

    async authenticateUser(
        username: string,
        password: string
    ): Promise<User | null> {
        const user = db
            .prepare('SELECT * FROM users WHERE username = ?')
            .get(username) as User;

        if (!user) return null;

        const isPasswordCorrect = await comparePassword(
            password,
            user.password
        );

        if (!isPasswordCorrect) return null;

        return user;
    }
}
