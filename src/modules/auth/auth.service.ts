import { User } from '../../models/User';
import { AuthRepository } from '../../application/auth.repository';
import pool from '../../database/config';
import { hashPassword, comparePassword } from '../../lib/helpers/auth-helpers';
import { generateStringId } from '../../lib/id-generators';

export class AuthService implements AuthRepository {
    async registerUser(username: string, password: string): Promise<void> {
        const id = await generateStringId();
        const hashedPassword = await hashPassword(password);

        await pool.query(
            `INSERT INTO users (id, username, password) VALUES ($1, $2, $3)`,
            [id, username, hashedPassword]
        );
    }

    async authenticateUser(
        username: string,
        password: string
    ): Promise<User | null> {
        const result = await pool.query(
            `SELECT * FROM users WHERE username = $1`,
            [username]
        );

        const user = result.rows[0];

        if (!user) return null;

        const isPasswordCorrect = await comparePassword(
            password,
            user.password
        );

        if (!isPasswordCorrect) return null;

        return user;
    }
}
