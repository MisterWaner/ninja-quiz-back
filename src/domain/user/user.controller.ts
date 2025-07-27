import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from './user.service';
import { CreateUserInput, LoginInput, UserResponse } from './user.schema';
import { comparePassword } from '../../lib/helpers/auth-helpers';

export class UserController {
    constructor(private userService: UserService) {
        this.registerUserHandler = this.registerUserHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.getMeHandler = this.getMeHandler.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.updateUserUsername = this.updateUserUsername.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    async registerUserHandler(
        request: FastifyRequest<{
            Body: {
                username: CreateUserInput['username'];
                password: CreateUserInput['password'];
                confirmPassword?: CreateUserInput['confirmPassword'];
            };
        }>,
        reply: FastifyReply
    ) {
        try {
            const { username, password, confirmPassword } = request.body;

            if (!username || !password || !confirmPassword) {
                reply
                    .status(400)
                    .send({ message: 'Les champs ne sont pas remplis' });
                return;
            }

            if (password !== confirmPassword) {
                reply.status(400).send({
                    message: 'Les mots de passe ne correspondent pas',
                });
                return;
            }

            const users = await this.userService.getUsers();
            const userExists = users.find((user) => user.username === username);

            if (userExists) {
                reply
                    .status(409)
                    .send({ message: "Ce nom d'utilisateur est déjà utilisé" });
                return;
            }

            await this.userService.createUser({ username, password });
            reply.status(201).send({ message: 'Compte créé avec succès' });
        } catch (error) {
            console.error('Error creating user:', error);
            reply.status(500).send({ message: 'Erreur interne du serveur' });
        }
    }

    async loginHandler(
        request: FastifyRequest<{
            Body: {
                username: LoginInput['username'];
                password: LoginInput['password'];
            };
        }>,
        reply: FastifyReply
    ) {
        try {
            const { username, password } = request.body;

            if (!username || !password) {
                reply
                    .status(400)
                    .send({ message: 'Les champs ne sont pas remplis' });
                return;
            }

            const user = await this.userService.getUserByUsername(username);
            if (!user) {
                reply.status(401).send({ message: 'Identifiants invalides' });
                return;
            }

            const isPasswordCorrect = await comparePassword(
                password,
                user.password as string
            );

            if (!isPasswordCorrect) {
                reply.status(401).send({ message: 'Identifiants invalides' });
                return;
            }

            const payload = {
                id: user.id,
                username: user.username,
            };

            const token = request.jwt.sign(payload, {
                expiresIn: '24h',
            });

            reply.setCookie('access_token', token, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 60 * 60 * 24, // 24 hours
            });

            return { accessToken: token };
        } catch (error) {
            console.error('Error logging in user:', error);
            reply.status(500).send({ message: 'Erreur interne du serveur' });
        }
    }

    async logoutHandler(request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = request.cookies.access_token;
            if (!token) {
                reply.status(401).send({ message: 'Non authentifié' });
                return;
            }

            reply
                .clearCookie('access_token', {
                    path: '/',
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                })
                .status(200)
                .send({ message: 'Déconnexion réussie' });
        } catch (error) {
            console.error('Error logging out user:', error);
            reply.status(500).send({ message: 'Erreur interne du serveur' });
        }
    }

    async getMeHandler(request: FastifyRequest, reply: FastifyReply) {
        try {
            console.log(request.user)
            const userId = request.user?.id;
            if (!userId) {
                reply.status(401).send({ message: 'Non authentifié' });
                return;
            }

            const user = await this.userService.getUserById(userId);
            if (!user) {
                reply.status(404).send({ message: 'Utilisateur non trouvé' });
                return;
            }

            console.log(user)
            reply.status(200).send(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            reply.status(500).send({ message: 'Erreur interne du serveur' });
        }
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
            console.error('Error fetching users:', error);
            reply.status(500).send({ message: 'Erreur interne du serveur' });
        }
    }

    async getUserById(
        request: FastifyRequest<{ Params: { id: UserResponse['id'] } }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const { id } = request.params;
            const user = await this.userService.getUserById(id);
            if (!user) {
                reply.status(404).send({ message: 'User not found' });
                return;
            }
            reply.status(200).send(user);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            reply.status(500).send({ message: 'Erreur interne du serveur' });
        }
    }

    async updateUserUsername(
        request: FastifyRequest<{ Params: { id: UserResponse['id'] } }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const { id } = request.params;

            const user = await this.userService.getUserById(id);

            if (!user) {
                reply.status(404).send({ message: 'User not found' });
                return;
            }

            const { username } = request.body as {
                username: UserResponse['username'];
            };

            const users = await this.userService.getUsers();
            const userExists = users.find((user) => user.username === username);
            if (userExists)
                reply.status(409).send({
                    message: 'Username already taken',
                });

            await this.userService.updateUserUsername(id, username);
            reply
                .status(200)
                .send({ message: 'Username updated successfully' });
        } catch (error) {
            console.error('Error updating username:', error);
            reply.status(500).send({ message: 'Erreur interne du serveur' });
        }
    }

    async updateUserPassword(
        request: FastifyRequest<{ Params: { id: UserResponse['id'] } }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const { id } = request.params;

            const user = await this.userService.getUserById(id);
            if (!user) {
                reply.status(404).send({ message: 'User not found' });
                return;
            }

            const { password } = request.body as {
                password: UserResponse['password'];
            };

            if (!password) {
                reply.status(400).send({ message: 'Password is required' });
                return;
            }

            await this.userService.updateUserPassword(id, password);
            reply
                .status(200)
                .send({ message: 'Password updated successfully' });
        } catch (error) {
            console.error('Error updating password:', error);
            reply.status(500).send({ message: 'Erreur interne du serveur' });
        }
    }

    async deleteUser(
        request: FastifyRequest<{ Params: { id: UserResponse['id'] } }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const { id } = request.params;

            const user = await this.userService.getUserById(id);
            if (!user) {
                reply.status(404).send({ message: 'User not found' });
                return;
            }

            await this.userService.deleteUser(id);
            reply.status(204).send('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            reply.status(500).send({ message: 'Erreur interne du serveur' });
        }
    }
}
