import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const fastifyApp = fastify({
    logger: true,
});

fastifyApp.register(fastifyCors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
});

// import routes
import { routes } from './routes';

fastifyApp.get('/', (req, res) => {
    res.send('API démarrée et opérationnelle');
})

fastifyApp.register(routes);

export default fastifyApp;