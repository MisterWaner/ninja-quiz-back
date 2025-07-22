import { config } from 'dotenv';
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt, { FastifyJWT } from '@fastify/jwt';
import { UserPayload } from './types/global';

config();

const fastifyApp = fastify({
    logger: true,
});

fastifyApp.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
});

fastifyApp.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
        const token = request.cookies.access_token;

        if (!token) {
            return reply.status(401).send({ message: 'Non authentifié' });
        }

        const decoded = request.jwt.verify(token) as UserPayload;
        request.user = decoded;
    }
);

fastifyApp.addHook(
    'preHandler',
    (request: FastifyRequest, reply: FastifyReply, done) => {
        request.jwt = fastifyApp.jwt;
        return done();
    }
);

fastifyApp.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET!,
    hook: 'preHandler',
});

fastifyApp.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Origin',
    ],
    credentials: true,
    preflight: true,
});

fastifyApp.addHook('onRequest', (request, reply, done) => {
    console.log(`${request.method} ${request.url}`);
    done();
});

// import routes
import { routes } from './routes';


fastifyApp.get('/', (req, res) => {
    res.send('API démarrée et opérationnelle');
});

fastifyApp.register(routes);

export default fastifyApp;
