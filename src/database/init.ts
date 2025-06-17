import { Pool } from 'pg';
import { config } from 'dotenv';
import pool from './config';
import * as fs from 'fs/promises';

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
        await pool.query(sql);
        console.log('✅ Le schéma a été créé');
    } catch (error) {
        console.error('Erreur lors de la création du schéma', error);
    } finally {
        pool.end();
    }
}

export async function isDatabaseEmpty(): Promise<boolean> {
    const result = await pool.query<{ count: string }>(
        'SELECT COUNT (*) AS count FROM subjects'
    );

    const count = Number(result.rows[0].count);
    return count === 0;
}

export async function run() {
    await initDatabase();
    await initSchema();
}
