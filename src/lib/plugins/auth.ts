import fp from 'fastify-plugin';
import fastifyCookie from '@fastify/cookie';
import fastifyJWT from '@fastify/jwt';
import { FastifyRequest, FastifyReply } from 'fastify';

export default fp(async (fastify) => {
    fastify.register(fastifyCookie);

    fastify.register(fastifyJWT, {
        secret: process.env.JWT_SECRET!,
        cookie: {
            cookieName: 'token',
            signed: false,
        },
    });

    fastify.decorate(
        'authenticate',
        async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                await request.jwtVerify();
                reply.status(200).send({ message: 'Authentifié' });
            } catch (error) {
                reply.status(401).send({ message: 'Non authentifié' });
            }
        }
    );
});
