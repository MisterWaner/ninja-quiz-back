import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

export async function hashPassword(password: string): Promise<string> {
    const salt: number = Number(process.env.BCRYPT_SALT);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
