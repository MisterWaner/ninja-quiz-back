import { FastifyInstance } from 'fastify';
import { AuthController } from '../modules/auth/auth.controller';
import { AuthService } from '../modules/auth/auth.service';
import { UserService } from '../modules/users/user.service';

const authService = new AuthService();
const userService = new UserService();
const authController = new AuthController(authService, userService);

export async function authRouter(fastify: FastifyInstance) {
    fastify.post<{
        Body: { username: string; password: string; confirmPassword: string };
    }>('/register', authController.register);

    fastify.post<{
        Body: { username: string; password: string };
    }>('/login', authController.login);

    fastify.post('/logout',  authController.logout);
}
