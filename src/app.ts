import { config } from 'dotenv';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import auth from './lib/plugins/auth';

config();

const fastifyApp = fastify({
    logger: true,
});

fastifyApp.register(fastifyCors, {
    origin: 'https://ninja-quizz.netlify.app',
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
fastifyApp.register(auth);

// import routes
import { routes } from './routes';

fastifyApp.get('/', (req, res) => {
    res.send('API démarrée et opérationnelle');
});

fastifyApp.register(routes);

export default fastifyApp;
