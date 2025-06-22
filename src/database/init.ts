import { Pool } from 'pg';
import { config } from 'dotenv';
import pool from './config';
import * as fs from 'fs/promises';
import { seedDatabase } from './seed';

config();

const adminPool = new Pool({
    user: process.env.POSTGRES_USER,
    host: 'localhost',
    database: 'postgres',
    password: process.env.POSTGRES_PASS,
    port: Number(process.env.POSTGRES_PORT),
});

async function initDatabase() {
    try {
        const checkDatabase = await adminPool.query(
            `
            SELECT 1 FROM pg_database WHERE datname = $1`,
            [process.env.POSTGRES_DB]
        );

        if (checkDatabase.rowCount === 0) {
            await adminPool.query(`CREATE DATABASE ${process.env.POSTGRES_DB}`);
            console.log('✅ La base de données a été créée');
        } else {
            console.log('⚠️ La base de données existe déjà');
        }
    } catch (error) {
        console.error(
            'Erreur lors de la création de la base de données',
            error
        );
    } finally {
        adminPool.end();
    }
}

async function initSchema() {
    try {
        const sql = await fs.readFile('./src/database/quiz.sql', 'utf8');
        const queries = sql.split(';').map((query) => query.trim()).filter((query) => query.length > 0);

        for (const query of queries) {
            await pool.query(query);
        }
        console.log('✅ Le schéma a été créé');
    } catch (error) {
        console.error('Erreur lors de la création du schéma', error);
    }
}

export async function isDatabaseEmpty(): Promise<boolean> {
    const result = await pool.query<{ count: string }>(
        'SELECT COUNT (*) AS count FROM subjects'
    );

    const count = Number(result.rows[0].count);
    return count === 0;
}

export async function runDatabase() {
    await initDatabase();
    await initSchema();
    const empty = await isDatabaseEmpty();
    if (empty) {
        console.log('🌱 La base de données est vide, seeding...');
        await seedDatabase();
    }
    console.log('✅ La base de données est prête');
}
