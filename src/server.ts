import fastifyApp from './app';
import { config } from 'dotenv';
import { runDatabase, isDatabaseEmpty } from './database/init';
import { seedDatabase } from './database/seed';

config();

const PORT = Number(process.env.PORT) || 3001;

async function startServer() {
    try {
        await fastifyApp.listen({ port: PORT });
        console.log(`Server is running on port ${PORT}`);

        await runDatabase();
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();
