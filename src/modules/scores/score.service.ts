import { Score } from '../../models/Score';
import { ScoreRepository } from '../../application/score.repository';
import { Subject } from '../../models/Subject';
import { Theme } from '../../models/Theme';
import { User } from '../../models/User';
import { db } from '../../database/database';
import {
    formatDateToISODateString,
    formatDateToString,
    subjectExsits,
    themeExsits,
} from '../../lib/helpers/general-helpers';

export class ScoreService implements ScoreRepository {
    async addUserScore(score: Omit<Score, 'id'>): Promise<void> {
        const { userId, themeId, subjectId, value } = score;
        const date = new Date().toISOString();

        db.prepare(
            `INSERT INTO scores (user_id, theme_id, subject_id, value, date) VALUES (?, ?, ?, ?, ?)`
        ).run(userId, themeId, subjectId, value, date);
    }

    async getUsersGlobalScore(): Promise<Score[]> {
        const scores = db.prepare('SELECT * FROM scores').all() as Score[];

        if (!scores) throw new Error('No scores found');

        return scores;
    }

    async getUsersDailyScore(): Promise<Score[]> {
        const scores = db.prepare('SELECT * FROM scores').all() as Score[];
        if (!scores) throw new Error('No scores found');

        const today = formatDateToISODateString(new Date());

        const dailyScores = scores.filter((score) => {
            const date = formatDateToString(score.date);
            return date === today;
        });

        return dailyScores;
    }

    async getUserGlobalScore(userId: User['id']): Promise<Score[]> {
        const scores = db
            .prepare('SELECT * FROM scores WHERE user_id = ?')
            .all(userId) as Score[];

        if (!scores) throw new Error('No score found');
        console.log(scores);

        return scores;
    }

    async getUserDailyScore(userId: User['id']): Promise<Score[]> {
        const scores = db
            .prepare('SELECT * FROM scores WHERE user_id = ?')
            .all(userId) as Score[];

        if (!scores) throw new Error('No score found');

        const today = formatDateToISODateString(new Date());

        console.log(typeof scores);

        const dailyScores = scores.filter((score) => {
            const date = formatDateToString(score.date);
            return date === today;
        });

        return dailyScores;
    }

    async getUserDailyScoresByTheme(
        userId: User['id'],
        themeId: Theme['id']
    ): Promise<Score[]> {
        const scores = db
            .prepare('SELECT * FROM scores WHERE user_id = ? AND theme_id = ?')
            .all(userId, themeId) as Score[];

        if (!themeId) throw new Error('Theme is required');

        const themeIsValid = themeExsits(themeId);
        if (!themeIsValid) throw new Error('Theme does not exist');
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
        const scores = db
            .prepare(
                'SELECT * FROM scores WHERE user_id = ? AND subject_id = ?'
            )
            .all(userId, subjectId) as Score[];
        
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

    async getUserGlobalScoresByTheme(
        userId: User['id'],
        themeId: Theme['id']
    ): Promise<Score[]> {
        const scores = db
            .prepare('SELECT * FROM scores WHERE user_id = ? AND theme_id = ?')
            .get(userId, themeId) as Score[];
        
        if (!themeId) throw new Error('Theme is required');
        
        const themeIsValid = themeExsits(themeId);
        if (!themeIsValid) throw new Error('Theme does not exist');

        if (!scores) throw new Error('No scores found');

        return scores;
    }

    async getUserGlobalScoresBySubject(
        userId: User['id'],
        subjectId: Subject['id']
    ): Promise<Score[]> {
        const scores = db
            .prepare(
                'SELECT * FROM scores WHERE user_id = ? AND subject_id = ?'
            )
            .get(userId, subjectId) as Score[];

        if (!subjectId) throw new Error('Subject is required');

        const subjectIsValid = subjectExsits(subjectId);
        if (!subjectIsValid) throw new Error('Subject does not exist');

        if (!scores) throw new Error('No scores found');

        return scores;
    }
}
