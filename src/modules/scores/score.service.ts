import { Score } from '../../models/Score';
import { ScoreRepository } from '../../application/score.repository';
import { Subject } from '../../models/Subject';
import { User } from '../../models/User';
import pool from '../../database/config';
import { subjectExsits } from '../../lib/helpers/general-helpers';
import { mapScoreRow } from '../../lib/helpers/sql-helpers';
import type {
    UserGlobalScore,
    UserDailyScore,
    UserGlobalScoreSortedBySubject,
    UserGlobalScoreSortedByTheme,
} from '../../types/entities';

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
                GROUP BY scores.user_id, userId
                ORDER BY totalScore DESC
            `);

        const scores = results.rows.map((row) => ({
            userId: row.userid,
            username: row.username,
            totalScore: row.totalscore,
        })) as UserGlobalScore[];

        if (!scores.length) throw new Error('No scores found');

        return scores;
    }

    async getUsersDailyScore(): Promise<UserDailyScore[]> {
        const results = await pool.query(`
            SELECT 
                users.id as userId, 
                users.username, 
                SUM(scores.value) as totalScore
            FROM scores 
            INNER JOIN users ON scores.user_id = users.id
            WHERE DATE(scores.date) = CURRENT_DATE
            GROUP BY users.id, users.username
            ORDER BY totalScore DESC
            `);

        const dailyScores = results.rows.map((row) => ({
            userId: row.userid,
            username: row.username,
            totalScore: Number(row.totalscore),
            date: row.date,
        })) as UserDailyScore[];

        if (!dailyScores.length) throw new Error('No scores found for today');

        return dailyScores;
    }

    async getUserGlobalScore(userId: User['id']): Promise<Score[]> {
        const results = await pool.query(
            'SELECT * FROM scores WHERE user_id = $1',
            [userId]
        );

        const userGlobalScore = results.rows.map(mapScoreRow) as Score[];

        if (!userGlobalScore) throw new Error('No score found');
        console.log(userGlobalScore);

        return userGlobalScore;
    }

    async getUserDailyScore(userId: User['id']): Promise<Score[]> {
        const results = await pool.query(
            'SELECT * FROM scores WHERE user_id = $1 AND DATE(date) = CURRENT_DATE',
            [userId]
        );

        const dailyScores = results.rows.map(mapScoreRow) as Score[];

        if (!dailyScores) throw new Error('No score found');

        return dailyScores;
    }

    async getUserDailyScoresSortedByTheme(
        userId: User['id']
    ): Promise<Score[]> {
        const results = await pool.query(
            'SELECT * FROM scores WHERE user_id = $1 AND DATE(date) = CURRENT_DATE ORDER BY theme_id DESC',
            [userId]
        );

        const userDailyScoresSortedByTheme = results.rows.map(
            mapScoreRow
        ) as Score[];

        if (!userDailyScoresSortedByTheme) throw new Error('No scores found');

        return userDailyScoresSortedByTheme;
    }

    async getUserDailyScoresBySubject(
        userId: User['id'],
        subjectId: Subject['id']
    ): Promise<Score[]> {
        if (!subjectId) throw new Error('Subject is required');

        const subjectIsValid = subjectExsits(subjectId);
        if (!subjectIsValid) throw new Error('Subject does not exist');

        const results = await pool.query(
            'SELECT * FROM scores WHERE user_id = $1 AND subject_id = $2 AND DATE(date) = CURRENT_DATE',
            [userId, subjectId]
        );

        const userDailyScoresBySubject = results.rows.map(
            mapScoreRow
        ) as Score[];

        if (!userDailyScoresBySubject) throw new Error('No scores found');

        return userDailyScoresBySubject;
    }

    async getUserGlobalScoresSortedByTheme(
        userId: User['id']
    ): Promise<UserGlobalScoreSortedByTheme[]> {
        const results = await pool.query(
            `
            SELECT t.name as themeName, 
            SUM(s.value) as totalScore 
            FROM scores s 
            JOIN themes t ON s.theme_id = t.id 
            WHERE s.user_id = $1 
            GROUP BY s.theme_id, themeName
            ORDER BY t.name ASC
            `,
            [userId]
        );

        const scores = results.rows.map((row) => ({
            userId: row.userid,
            username: row.username,
            totalScore: row.totalscore,
            themeName: row.themename,
        })) as UserGlobalScoreSortedByTheme[];

        if (!scores) throw new Error('No scores found');

        return scores;
    }

    async getUserGlobalScoresSortedBySubject(
        userId: User['id']
    ): Promise<UserGlobalScoreSortedBySubject[]> {
        const results = await pool.query(
            `
            SELECT subj.name as subjectName,
            SUM(s.value) as totalScore
            FROM scores s
            JOIN subjects subj ON s.subject_id = subj.id
            WHERE s.user_id = $1
            GROUP BY s.subject_id, subjectName
            ORDER BY subj.name ASC
            `,
            [userId]
        );

        const scores = results.rows.map((row) => ({
            userId: row.userid,
            username: row.username,
            totalScore: row.totalscore,
            subjectName: row.subjectname,
        })) as UserGlobalScoreSortedBySubject[];

        if (!scores) throw new Error('No scores found');

        return scores;
    }
}
