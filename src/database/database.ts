import Database from 'better-sqlite3';

export const db = new Database('quiz.db');

export function init() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            theme_id number NOT NULL,
            value INTEGER NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY(theme_id) REFERENCES themes(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
        
        CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            subjectPath TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS themes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            themePath TEXT NOT NULL,
            subject_id INTEGER NOT NULL,
            FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
    `);
}

export function isDatabaseEmpty(): boolean {
    const row = db.prepare('SELECT COUNT (*) AS count FROM subjects').get() as {
        count: number;
    };
    return row.count === 0;
}