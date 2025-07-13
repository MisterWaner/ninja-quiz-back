import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { User } from '../../models/User';

export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
        this.meHandler = this.meHandler.bind(this);
    }

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

            await this.authService.registerUser(username, password);
            reply.status(200).send({ message: 'Compte créé avec succès' });
        } catch (error) {
            reply.status(500).send({ message: 'Erreur interne' });
            console.error(error);
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
                    sameSite: 'none',
                    secure: true,
                })
                .status(200)
                .send({ message: 'Authentifié avec succès' });
        } catch (error) {
            reply.status(500).send({ message: 'Erreur interne' });
        }
    };

    meHandler = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const token = request.cookies.token;

            if (!token) {
                reply
                    .status(401)
                    .send({ message: "Vous n'êtes pas authentifié" });
                return;
            }

            const decoded = await request.jwtVerify<{
                id: string;
                username: string;
            }>();

            reply.status(200).send({
                id: decoded.id,
                username: decoded.username,
            });
        } catch (error) {
            reply.status(401).send({ message: 'Token invalide ou expiré' });
        }
    };

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
