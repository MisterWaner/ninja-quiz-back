import fastifyApp from './app';
import { config } from 'dotenv';

config();

const PORT = Number(process.env.PORT) || 3001;

async function startServer() {
    try {
        await fastifyApp.listen({ port: PORT });
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();
