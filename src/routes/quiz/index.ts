import {FastifyInstance} from 'fastify';
import {mathRouter} from './math.router';
import {geoRouter} from './geo.router';
import {historyRouter} from "./history.router";

export async function quizRouter(fastify: FastifyInstance) {
    fastify.register(mathRouter, {prefix: '/mathematiques'});
    fastify.register(geoRouter, {prefix: '/geographie'});
    fastify.register(historyRouter, {prefix: '/histoire'})
}
