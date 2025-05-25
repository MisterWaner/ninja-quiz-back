import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { User } from '../../models/User';

export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    register = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { username, password, confirmPassword } =
                request.body as User;

            if (!username || !password || !confirmPassword) {
                reply
                    .status(400)
                    .send({ message: 'Les champs ne sont pas remplis' });
                return;
            }

            if (password !== confirmPassword) {
                reply
                    .status(400)
                    .send({
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

            await this.authService.registerUser(username, password);
            reply.status(200).send({ message: 'Compte créé avec succès' });
        } catch (error) {
            reply.status(500).send({ message: 'Erreur interne' });
        }
    };

    login = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { username, password } = request.body as User;
            const user = await this.authService.authenticateUser(
                username,
                password
            );

            if (!user) {
                reply.status(401).send({ message: 'Identifiants incorrects' });
                return;
            }

            const token = await reply.jwtSign(
                {
                    id: user.id,
                    username: user.username,
                },
                {
                    expiresIn: '24h',
                }
            );

            reply
                .setCookie('token', token, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: true,
                    maxAge: 60 * 60 * 24, // 24 hours
                })
                .status(200)
                .send({ message: 'Authentifié avec succès' });
        } catch (error) {
            reply.status(500).send({ message: 'Erreur interne' });
        }
    };

    // meHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    //     try {
    //         const token = request.cookies.token;
    //         if (!token) {
    //             reply
    //                 .status(401)
    //                 .send({ message: "Vous n'êtes pas authentifié" });
    //             return;
    //         }

    //         const user = await this.userService.getUserById(token);
    //         if (!user) {
    //             reply.status(401).send({ message: 'Identifiants incorrects' });
    //             return;
    //         }

    //         reply.status(200).send(user);
    //     } catch (error) {
    //         reply.status(500).send({ message: 'Erreur interne' });
    //     }
    // };

    logout = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const token = request.cookies.token;
            if (!token) {
                reply
                    .status(401)
                    .send({ message: "Vous n'êtes pas authentifié" });
                return;
            }
            
            reply
                .clearCookie('token')
                .status(200)
                .send({ message: 'Déconnecté avec succès' });
        } catch (error) {
            reply.status(500).send({ message: 'Erreur interne' });
        }
    };
}
