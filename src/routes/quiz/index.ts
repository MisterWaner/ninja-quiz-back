import { FastifyInstance } from 'fastify';
import { mathRouter } from './math.router';

export async function quizRouter(fastify: FastifyInstance) {
    fastify.register(mathRouter, { prefix: '/mathematiques' });
}