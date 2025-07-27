import { FastifyInstance } from 'fastify';
import { UserController } from '../domain/user/user.controller';
import { UserService } from '../domain/user/user.service';
import {
    CreateUserInput,
    LoginInput,
    UserResponse,
} from '../domain/user/user.schema';

const userService = new UserService();
const userController = new UserController(userService);

export async function usersRouter(fastify: FastifyInstance) {
    fastify.post<{ Body: CreateUserInput }>(
        '/register',
        userController.registerUserHandler
    );
    fastify.post<{ Body: LoginInput }>('/login', userController.loginHandler);
    fastify.post(
        '/logout',
        {
            preHandler: [fastify.authenticate],
        },
        userController.logoutHandler
    );
    fastify.get<{ Reply: UserResponse[] }>(
        '/me',
        {
            preHandler: [fastify.authenticate],
        },
        userController.getMeHandler
    );
    fastify.get<{ Reply: UserResponse[] }>(
        '/',
        {
            preHandler: [fastify.authenticate],
        },
        userController.getUsers
    );
    fastify.get<{ Params: { id: string }; Reply: UserResponse }>(
        '/:id',
        {
            preHandler: [fastify.authenticate],
        },
        userController.getUserById
    );
    fastify.put<{
        Params: { id: string };
        Body: { username: CreateUserInput['username'] };
    }>(
        '/:id',
        {
            preHandler: [fastify.authenticate],
        },
        userController.updateUserUsername
    );
    fastify.put<{
        Params: { id: string };
        Body: { password: CreateUserInput['password'] };
    }>(
        '/:id/pwd',
        {
            preHandler: [fastify.authenticate],
        },
        userController.updateUserPassword
    );
    fastify.delete<{ Params: { id: string } }>(
        '/:id',
        {
            preHandler: [fastify.authenticate],
        },
        userController.deleteUser
    );
}
