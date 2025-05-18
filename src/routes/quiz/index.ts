import { FastifyInstance } from 'fastify';
import { mathRouter } from './math.router';
import { geoRouter } from './geo.router';

export async function quizRouter(fastify: FastifyInstance) {
    fastify.register(mathRouter, { prefix: '/mathematiques' });
    fastify.register(geoRouter, { prefix: '/geographie' });
}