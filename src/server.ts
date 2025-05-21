import fastifyApp from './app';
import { config } from 'dotenv';
import { init, isDatabaseEmpty } from './database/database';
import { seedDatabase } from './database/seed';

config();

const PORT = Number(process.env.PORT) || 3001;

async function startServer() {
    try {
        await fastifyApp.listen({ port: PORT });
        console.log(`Server is running on port ${PORT}`);

        init();

        if (isDatabaseEmpty()) {
            console.log('🌱 Base de données vide, seeding...');
            await seedDatabase();
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();
