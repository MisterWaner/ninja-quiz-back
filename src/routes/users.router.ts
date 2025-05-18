import { FastifyInstance } from 'fastify';
import { UserController } from '../modules/users/user.controller';
import { UserService } from '../modules/users/user.service';
import { User } from '../models/User';

const userService = new UserService();
const userController = new UserController(userService);

export async function usersRouter(fastify: FastifyInstance) {
    fastify.get<{ Reply: User[] }>('/', {}, userController.getUsers);
    fastify.get<{ Params: { id: string }; Reply: User }>(
        '/:id',
        {},
        userController.getUserById
    );
    fastify.put<{ Params: { id: string }; Body: { username: User['username'] } }>(
        '/:id',
        {},
        userController.updateUserUsername
    );
    fastify.put<{ Params: { id: string }; Body: { password: User['password'] } }>(
        '/:id',
        {},
        userController.updateUserPassword
    );
    fastify.delete<{ Params: { id: string } }>(
        '/:id',
        {},
        userController.deleteUser
    );
}