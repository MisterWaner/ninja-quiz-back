import { FastifyInstance } from 'fastify';
import { subjectsRouter } from './subjects.router';
import { themesRouter } from './themes.router';
import { usersRouter } from './users.router';
import { quizRouter } from './quiz/index';
import { authRouter } from './auth.router';
import { scoresRouter } from './scores.router';

export async function routes(fastify: FastifyInstance) {
    fastify.register(subjectsRouter, { prefix: '/subjects' });
    fastify.register(themesRouter, { prefix: '/themes' });
    fastify.register(usersRouter, { prefix: '/users' });
    fastify.register(quizRouter, { prefix: '/quiz' });
    fastify.register(authRouter, { prefix: '/auth' });
    fastify.register(scoresRouter, { prefix: '/scores' });
}