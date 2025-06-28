import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from './user.service';
import { User } from '../../models/User';

export class UserController {
    constructor(private userService: UserService) {
        this.updateUserPassword = this.updateUserPassword.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.updateUserUsername = this.updateUserUsername.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    async getUsers(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const users = await this.userService.getUsers();
            if (!users) reply.status(404).send('No users found');

            if (users.length === 0)
                reply.status(404).send('Users not provided');

            reply.status(200).send(users);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getUserById(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;
            const user = await this.userService.getUserById(id);

            if (!user) {
                reply.status(404).send('No user found');
                return;
            }
            reply.status(200).send(user);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async updateUserUsername(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;

            const user = await this.userService.getUserById(id);

            if (!user) {
                reply.status(404).send('No user found');
                return;
            }

            const { username } = request.body as User;
            const users = await this.userService.getUsers();
            const userExists = users.find((user) => user.username === username);
            if (userExists) reply.status(409).send('Username already taken');

            await this.userService.updateUserUsername(id, username);
            reply.status(200).send('User updated');
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async updateUserPassword(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;
            console.log("requete recue pour updatepassword")
            const user = await this.userService.getUserById(id);

            if (!user) {
                reply.status(404).send('No user found');
                return;
            }

            const { password } = request.body as User;

            if (!password) {
                reply.status(400).send('Password is required');
                return;
            }

            await this.userService.updateUserPassword(id, password);
            reply.status(200).send('User updated');
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async deleteUser(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;
            const user = await this.userService.getUserById(id);
            if (!user) {
                reply.status(404).send('No user found');
                return;
            }

            await this.userService.deleteUser(id);
            reply.status(200).send('User deleted');
        } catch (error) {
            reply.status(500).send(error);
        }
    }
    
}
