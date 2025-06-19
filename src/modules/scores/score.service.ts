import { Score } from '../../models/Score';
import { ScoreRepository } from '../../application/score.repository';
import { Subject } from '../../models/Subject';
import { User } from '../../models/User';
import pool from '../../database/config';
import {
    formatDateToISODateString,
    formatDateToString,
    subjectExsits,
} from '../../lib/helpers/general-helpers';
import type { UserGlobalScore, UserDailyScore } from '../../types/entities';

export class ScoreService implements ScoreRepository {
    async addUserScore(score: Omit<Score, 'id'>): Promise<void> {
        const { userId, themeId, subjectId, value } = score;
        const date = new Date().toISOString();

        await pool.query(
            `INSERT INTO scores (user_id, theme_id, subject_id, value, date) VALUES ($1, $2, $3, $4, $5)`,
            [userId, themeId, subjectId, value, date]
        );
    }

    async getUsersGlobalScore(): Promise<UserGlobalScore[]> {
        const results = await pool.query(`
                SELECT 
                    users.id as userId, 
                    users.username, 
                    SUM(scores.value) as totalScore 
                FROM scores 
                INNER JOIN users ON scores.user_id = users.id 
                GROUP BY scores.user_id 
                ORDER BY totalScore DESC
            `);

        const scores = results.rows.map((row) => ({
            userId: row.userId,
            username: row.username,
            totalScore: row.totalScore,
        })) as UserGlobalScore[];

        if (!scores.length) throw new Error('No scores found');

        return scores;
    }

    async getUsersDailyScore(): Promise<UserDailyScore[]> {
        const results = await pool.query(`
            SELECT 
                users.id as userId, 
                users.username, 
                SUM(scores.value) as totalScore, 
                DATE(scores.date) as date
            FROM scores 
            INNER JOIN users ON scores.user_id = users.id
            GROUP BY scores.user_id , DATE(scores.date)
            ORDER BY totalScore DESC
            `);

        const scores = results.rows.map((row) => ({
            userId: row.userId,
            username: row.username,
            totalScore: row.totalScore,
            date: row.date,
        })) as UserDailyScore[];

        if (!scores.length) throw new Error('No scores found');

        console.log(scores);

        const today = formatDateToISODateString(new Date());

        const dailyScores = scores.filter((score) => {
            const date = formatDateToISODateString(new Date(score.date));
            return date === today;
        });

        if (!dailyScores.length) throw new Error('No scores found for today');

        return dailyScores;
    }

    async getUserGlobalScore(userId: User['id']): Promise<Score[]> {
        const results = await pool.query(
            'SELECT * FROM scores WHERE user_id = $1',
            [userId]
        );

        const scores = results.rows.map((row) => ({
            id: row.id,
            userId: row.user_id,
            themeId: row.theme_id,
            subjectId: row.subject_id,
            value: row.value,
            date: row.date,
        })) as Score[];

        if (!scores) throw new Error('No score found');
        console.log(scores);

        return scores;
    }

    async getUserDailyScore(userId: User['id']): Promise<Score[]> {
        const results = await pool.query(
            'SELECT * FROM scores WHERE user_id = $1',
            [userId]
        );

        const scores = results.rows.map((row) => ({
            id: row.id,
            userId: row.user_id,
            themeId: row.theme_id,
            subjectId: row.subject_id,
            value: row.value,
            date: row.date,
        })) as Score[];

        if (!scores) throw new Error('No score found');

        const today = formatDateToISODateString(new Date());

        console.log(typeof scores);

        const dailyScores = scores.filter((score) => {
            const date = formatDateToString(score.date);
            return date === today;
        });

        return dailyScores;
    }

    async getUserDailyScoresSortedByTheme(
        userId: User['id']
    ): Promise<Score[]> {
        const results = await pool.query(
            'SELECT * FROM scores WHERE user_id = $1 ORDER BY theme_id DESC',
            [userId]
        );

        const scores = results.rows.map((row) => ({
            id: row.id,
            userId: row.user_id,
            themeId: row.theme_id,
            subjectId: row.subject_id,
            value: row.value,
            date: row.date,
        })) as Score[];

        if (!scores) throw new Error('No scores found');

        const today = formatDateToISODateString(new Date());

        const dailyScores = scores.filter((score) => {
            const date = formatDateToString(score.date);
            return date === today;
        });

        return dailyScores;
    }

    async getUserDailyScoresBySubject(
        userId: User['id'],
        subjectId: Subject['id']
    ): Promise<Score[]> {
        const results = await pool.query(
            'SELECT * FROM scores WHERE user_id = $1 AND subject_id = $2',
            [userId, subjectId]
        );

        const scores = results.rows.map((row) => ({
            id: row.id,
            userId: row.user_id,
            themeId: row.theme_id,
            subjectId: row.subject_id,
            value: row.value,
            date: row.date,
        })) as Score[];

        if (!subjectId) throw new Error('Subject is required');

        const subjectIsValid = subjectExsits(subjectId);
        if (!subjectIsValid) throw new Error('Subject does not exist');

        if (!scores) throw new Error('No scores found');

        const today = formatDateToISODateString(new Date());

        const dailyScores = scores.filter((score) => {
            const date = formatDateToString(score.date);
            return date === today;
        });

        return dailyScores;
    }

    async getUserGlobalScoresSortedByTheme(
        userId: User['id']
    ): Promise<Score[]> {
        const results = await pool.query(
            `
            SELECT t.name as themeName, 
            SUM(s.value) as totalScore 
            FROM scores s 
            JOIN themes t ON s.theme_id = t.id 
            WHERE s.user_id = $1 
            GROUP BY s.theme_id
            ORDER BY t.name ASC
            `,
            [userId]
        );

        const scores = results.rows.map((row) => ({
            id: row.id,
            userId: row.user_id,
            themeId: row.theme_id,
            subjectId: row.subject_id,
            value: row.value,
            date: row.date,
        })) as Score[];

        if (!scores) throw new Error('No scores found');

        return scores;
    }

    async getUserGlobalScoresSortedBySubject(
        userId: User['id']
    ): Promise<Score[]> {
        const results = await pool.query(
            `
            SELECT subj.name as subjectName,
            SUM(s.value) as totalScore
            FROM scores s
            JOIN subjects subj ON s.subject_id = subj.id
            WHERE s.user_id = $1
            GROUP BY s.subject_id
            ORDER BY subj.name ASC
            `,
            [userId]
        );

        const scores = results.rows.map((row) => ({
            id: row.id,
            userId: row.user_id,
            themeId: row.theme_id,
            subjectId: row.subject_id,
            value: row.value,
            date: row.date,
        })) as Score[];

        if (!scores) throw new Error('No scores found');

        return scores;
    }
}
