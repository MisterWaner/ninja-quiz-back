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

fastifyApp.get('/', (req, res) => {
    res.send('API démarrée et opérationnelle');
})

export default fastifyApp;