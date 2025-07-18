import fastifyApp from './app';
import { config } from 'dotenv';
import { runDatabase } from './database/init';
import './lib/tasks/resetScores';

config();

const PORT = Number(process.env.PORT) || 8080;

async function startServer() {
    try {
        await fastifyApp.listen({ port: PORT, host: '::' });
        console.log(`Server is running on port ${PORT}`);

        await runDatabase();
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();
