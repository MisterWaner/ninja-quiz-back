import { FastifyInstance } from 'fastify';
import { subjectsRouter } from './subjects.router';
import { themesRouter } from './themes.router';
import { usersRouter } from './users.router';

export async function routes(fastify: FastifyInstance) {
    fastify.register(subjectsRouter, { prefix: '/subjects' });
    fastify.register(themesRouter, { prefix: '/themes' });
    fastify.register(usersRouter, { prefix: '/users' });
}